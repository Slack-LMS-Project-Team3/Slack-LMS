"use client";

import { useEffect, useRef } from "react";
import { useMessageStore } from "@/store/messageStore";
import { jwtDecode } from "jwt-decode";

const NEXT_PUBLIC_WS = process.env.NEXT_PUBLIC_WS;

interface JWTPayload {
  user_id: string;
}

interface WebSocketLikeClientProps {
  workspaceId: string;
  tabId: string;
}

export function WebSocketLikeClient({
  workspaceId,
  tabId,
}: WebSocketLikeClientProps) {
  const socketRef = useRef<WebSocket | null>(null);
  const { sendEmojiFlag, target, emojiAction, setSendEmojiFlag, setEmojiCount } = useMessageStore();

  // 1. WebSocket 연결 및 수신 전용 useEffect
  useEffect(() => {
    const wsUrl = `${NEXT_PUBLIC_WS}/api/ws/like/${workspaceId}/${tabId}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    console.log("Like WebSocket: Attempting to connect...");

    socket.onopen = () => {
      console.log("Like WebSocket: Connection successful.");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // 서버로부터 'like' 타입의 메시지를 받으면 like count 상태를 업데이트합니다.
        if (data.type === "emoji" && data.emojiType !== undefined && data.messageId !== undefined && data.count !== undefined) {
          console.log("Like WebSocket: Received like update", data);
          //////////////////////////////////////////////////// 
          // broadcast 결과를 받아와서 처리하는 로직 추가해야됨
          setEmojiCount(data.messageId, data.emojiType, data.count);
          ////////////////////////////////////////////////////
        }
      } catch (e) {
        console.warn("Like WebSocket: Invalid message format received:", event.data);
      }
    };

    socket.onerror = (error) => {
      console.error("Like WebSocket: An error occurred:", error);
    };

    socket.onclose = () => {
      console.log("Like WebSocket: Connection closed.");
    };

    // 컴포넌트가 언마운트될 때 웹소켓 연결을 정리합니다.
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [workspaceId, tabId]); // 이 effect는 ID가 바뀔 때만 실행됩니다.

  // 2. '좋아요' 데이터 전송 감지 전용 useEffect
  useEffect(() => {
    if (
      sendEmojiFlag &&
      socketRef.current?.readyState === WebSocket.OPEN &&
      target
    ) {
      const token = localStorage.getItem("access_token")

      if (!token) {
        console.log("토큰없당"); // 추후 수정
        return;
      }

      const { user_id } = jwtDecode<JWTPayload>(token);
      
      const keys = Object.keys(target).filter((key) => key !== "msgId");
      const emojiType = keys[0];

      const payload = {
        type: "emoji",
        messageId: target["msgId"],
        userId: user_id,
        action: emojiAction ? 'like':'unlike',
        emojiType: emojiType as keyof typeof target,
        count: target[emojiType]
      };
      
      console.log("Like WebSocket: Sending data with action...", payload);
      socketRef.current.send(JSON.stringify(payload));
      
      setSendEmojiFlag(false);
    }
  }, [sendEmojiFlag, setSendEmojiFlag]); // 이 effect는 '좋아요' 클릭으로 상태가 바뀔 때 실행됩니다.

  return null;
}
