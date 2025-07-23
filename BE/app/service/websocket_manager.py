from fastapi import WebSocket
from typing import Dict, List

class ConnectionManager:
    def __init__(self):
        self.activate_connections: Dict[int, Dict[int, List[WebSocket]]] = {}
    
    async def connect(self, workspace_id: int, tab_id: int, websocket: WebSocket):
        await websocket.accept()
        
        if workspace_id not in self.activate_connections:
            self.activate_connections[workspace_id] = {}
        if tab_id not in self.activate_connections[workspace_id]:
            self.activate_connections[workspace_id][tab_id] = []
        
        self.activate_connections[workspace_id][tab_id].append(websocket)
    
    def disconnect(self, workspace_id: int, tab_id: int, websocket: WebSocket):
        try:
            tab_connections = self.activate_connections.get(workspace_id, {}).get(tab_id)
            if tab_connections and websocket in tab_connections:
                tab_connections.remove(websocket)

                # 탭 내 소켓이 모두 비어있으면 탭 삭제
                if not tab_connections:
                    del self.activate_connections[workspace_id][tab_id]

                # 워크스페이스 내 탭이 모두 없어졌으면 워크스페이스 삭제
                if not self.activate_connections[workspace_id]:
                    del self.activate_connections[workspace_id]
            
        except Exception as e:
            print(f"소켓 연결 해제 에러가 발생했습니다 :: {e}")
            pass

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, workspace_id: int, tab_id: int, message: str):
        connections = self.activate_connections.get(workspace_id, {}).get(tab_id, [])
        for connection in connections[:]:
            try:
                await connection.send_text(message)
            except Exception:
                connections.remove(connection)