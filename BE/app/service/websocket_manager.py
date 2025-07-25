import json
import uuid
import asyncio
from fastapi import WebSocket
from typing import Dict, List, Optional
from app.util.database.redis import RedisManager


class ConnectionManager:
    def __init__(self):
        self.activate_connections: Dict[int, Dict[int, List[WebSocket]]] = {}
        self.server_id = uuid.uuid4().hex[:8]  # 서버 고유 ID
        self.socket_type: str = None
        self._redis_client: Optional[str] = None
        self._pubsub_client: Optional[str] = None
        self._pubsub_task: Optional[asyncio.Task] = None
        self._is_listening = False
        self._pending_broadcasts = {}  # 브로드캐스트 배치 처리용
        self._batch_task: Optional[asyncio.Task] = None
    
    async def _get_redis_client(self):
        """Redis 클라이언트 lazy 초기화"""
        if self._redis_client is None:
            self._redis_client = await RedisManager.get_redis()
        return self._redis_client
    
    async def _get_pubsub_client(self):
        """Pub/Sub 클라이언트 lazy 초기화"""
        if self._pubsub_client is None:
            self._pubsub_client = await RedisManager.get_pubsub_redis()
        return self._pubsub_client
    
    async def connect(self, socket_type: str, workspace_id: int, tab_id: int, websocket: WebSocket):
        await websocket.accept()
        self.socket_type = socket_type
        print("******************")
        print(socket_type)

        if socket_type not in self.activate_connections:
            self.activate_connections[socket_type] = {}
        if workspace_id not in self.activate_connections[socket_type]:
            self.activate_connections[socket_type][workspace_id] = {}
        if tab_id not in self.activate_connections[socket_type][workspace_id]:
            self.activate_connections[socket_type][workspace_id][tab_id] = []
        
        self.activate_connections[socket_type][workspace_id][tab_id].append(websocket)

        # Redis 초기화 (한 번만)
        await self._ensure_redis_initialized()

        if not self._is_listening:
            await self._start_redis_listener()
    
    async def disconnect(self, workspace_id: int, tab_id: int, websocket: WebSocket):
        try:
            tab_connections = self.activate_connections.get(self.socket_type, {}).get(workspace_id, {}).get(tab_id)
            if tab_connections and websocket in tab_connections:
                tab_connections.remove(websocket)

                # 탭 내 소켓이 모두 비어있으면 탭 삭제
                if not tab_connections:
                    del self.activate_connections[self.socket_type][workspace_id][tab_id]

                # 워크스페이스 내 탭이 모두 없어졌으면 워크스페이스 삭제
                if not self.activate_connections[self.socket_type][workspace_id]:
                    del self.activate_connections[self.socket_type][workspace_id]
                
                # 타입 내 워크스페이스가 모두 없어졌으면 타입 삭제
                if not self.activate_connections[self.socket_type]:
                    del self.activate_connections[self.socket_type]
            
        except Exception as e:
            print(f"소켓 연결 해제 에러가 발생했습니다 :: {e}")
            pass
    
    async def broadcast_local(self, workspace_id: int, tab_id: int, message: str):
        """로컬 서버의 연결된 클라이언트들에게만 브로드캐스트"""
        connections = self.activate_connections.get(self.socket_type, {}).get(workspace_id, {}).get(tab_id, [])
        for connection in connections[:]:
            try:
                await connection.send_text(message)
            except Exception:
                connections.remove(connection)
    
    async def broadcast(self, workspace_id: int, tab_id: int, message: str):
        """최적화된 브로드캐스트: 로컬 즉시 전송 + Redis 배치 처리"""
        # 로컬 연결된 클라이언트들에게 즉시 전송
        await self.broadcast_local(workspace_id, tab_id, message)
        
        # Redis 브로드캐스트를 배치로 처리
        await self._queue_redis_broadcast(workspace_id, tab_id, message)
    
    async def _ensure_redis_initialized(self):
        """Redis 클라이언트 미리 초기화"""
        if self._redis_client is None:
            self._redis_client = await RedisManager.get_redis()
        if self._pubsub_client is None:
            self._pubsub_client = await RedisManager.get_pubsub_redis()
    
    async def _queue_redis_broadcast(self, workspace_id: int, tab_id: int, message: str):
        """Redis 브로드캐스트를 큐에 추가하고 배치 처리"""
        channel = f"type:{self.socket_type}:workspace:{workspace_id}:tab:{tab_id}"
        
        if channel not in self._pending_broadcasts:
            self._pending_broadcasts[channel] = []
        
        self._pending_broadcasts[channel].append({
            "message": message,
            "sender_server": self.server_id,
            "timestamp": asyncio.get_event_loop().time()
        })
        
        # 배치 처리 태스크가 없으면 시작
        if self._batch_task is None or self._batch_task.done():
            self._batch_task = asyncio.create_task(self._process_batch_broadcasts())
    
    async def _process_batch_broadcasts(self):
        """배치로 모인 브로드캐스트들을 처리"""
        await asyncio.sleep(0.01)  # 10ms 대기로 배치 수집
        
        if not self._pending_broadcasts:
            return
            
        try:
            redis_client = await self._get_redis_client()
            pipe = redis_client.pipeline()
            
            # 배치로 모든 메시지 publish
            for channel, messages in self._pending_broadcasts.items():
                for msg_data in messages:
                    pipe.publish(channel, json.dumps(msg_data))
            
            await pipe.execute()
            self._pending_broadcasts.clear()
            
        except Exception as e:
            print(f"배치 Redis publish 에러: {e}")
            self._pending_broadcasts.clear()
    
    async def _start_redis_listener(self):
        """Redis Pub/Sub 리스너 시작 (타입별 구독으로 최적화)"""
        if self._is_listening:
            return
            
        try:
            self._is_listening = True
            self._pubsub_task = asyncio.create_task(self._redis_listener())
        except Exception as e:
            print(f"Redis 리스너 시작 에러: {e}")
            self._is_listening = False
    
    async def _redis_listener(self):
        """Redis 메시지 수신 및 처리 (타입별 구독)"""
        try:
            pubsub_client = await self._get_pubsub_client()
            pubsub = pubsub_client.pubsub()

            # 해당 타입의 채널만 구독 (더 효율적)
            pattern = f"type:{self.socket_type}:workspace:*:tab:*"
            await pubsub.psubscribe(pattern)

            async for message in pubsub.listen():
                if message["type"] == "pmessage":
                    await self._handle_redis_message(message)

        except Exception as e:
            print(f"Redis 리스너 에러: {e}")
        finally:
            self._is_listening = False
    
    async def _handle_redis_message(self, redis_message):
        """Redis에서 받은 메시지 처리"""
        try:
            channel = redis_message["channel"]
            data = json.loads(redis_message["data"])
            # print(data)
            
            # 자신이 보낸 메시지는 무시
            if data.get("sender_server") == self.server_id:
                return
            
            # 채널에서 workspace_id, tab_id 추출
            parts = channel.split(":")
            if len(parts) >= 6:
                workspace_id = int(parts[3])
                tab_id = int(parts[5])
                message = data.get("message", "")
                # 로컬 연결된 클라이언트들에게 브로드캐스트
                await self.broadcast_local(workspace_id, tab_id, message)
                
        except Exception as e:
            print(f"Redis 메시지 처리 에러: {e}")
    
    async def cleanup(self):
        """리소스 정리"""
        if self._batch_task:
            self._batch_task.cancel()
            try:
                await self._batch_task
            except asyncio.CancelledError:
                pass
        
        if self._pubsub_task:
            self._pubsub_task.cancel()
            try:
                await self._pubsub_task
            except asyncio.CancelledError:
                pass
        
        await RedisManager.close_connections()
