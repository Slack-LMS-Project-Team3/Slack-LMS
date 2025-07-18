import React, { useEffect, useRef, useState } from "react";
import { useMessageStore } from "@/store/messageStore";
import { WebSocketClient } from "../ws/webSocketClient";
import { ShowDate } from "./ShowDate";
import { ChatProfile } from "./ChatProfile";
import { getMessages } from "@/apis/messageApi";
import { Skeleton } from "@/components/ui/skeleton";
import { SSEListener } from "../sse/SSEListener";

function SkeletonChat() {
  return (
    <div className="flex px-[8px] py-[4.5px]">
      <Skeleton className="w-[40px] h-[40px] mt-1 mr-[8px] rounded-lg" />
      <div className="mt-1 space-y-2">
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-10 w-[300px]" />
      </div>
    </div>
  );
}

// 채팅방 내 채팅
export function ChatPage({
  workspaceId,
  tabId,
  className = "",
}: {
  workspaceId: string;
  tabId: string;
  className?: string;
}) {
  const { messages, prependMessages, setMessages } = useMessageStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);
  const prevMessageLengthRef = useRef(0);

  const [isLoading, setIsLoading] = useState(true); // 스켈레톤 로딩을 위한 로딩 상태 관리

  // 최초 메시지 불러오기 + 로딩 해제
  useEffect(() => {
    (async () => {
      console.log("first loading")
      await getMessages(workspaceId, tabId, undefined)
        .then((res) => {
          console.log("Before setMessages", res.messages)
          
          if (res.messages.length) {
            const new_messages = res.messages.map((msg: any) => ({
              senderId: msg.sender_id,
              msgId: msg.msg_id,
              nickname: msg.nickname,
              content: msg.content,
              image: msg.image,
              createdAt: msg.created_at,
              isUpdated: msg.is_updated,
              fileUrl: msg.file_url,
            }));
            setMessages(new_messages);
          }
          console.log("After setMessages", useMessageStore.getState().messages)
        })
        .finally(() => {
          setIsLoading(false);
        });
      })();
  }, [workspaceId, tabId, setMessages]);

  // 새로운 메세지가 추가되었을 때,
  useEffect(() => {
    if (isLoading) return; // 로딩 중이면 스킵

    console.log("메세지 추가됐음.");
    const el = containerRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });

    // 길이 업데이트
    prevMessageLengthRef.current = messages.length;
  }, [messages[messages.length - 1], isLoading]);

  // 스크롤을 올려서 과거 메세지들을 불러와
  // messages에 변화가 생겨 새로 렌더링 해줘야 하는 경우.
  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    console.log("handleScroll")
    if (el.scrollTop < 30 && !isFetching.current) {
      isFetching.current = true;

      const oldestId = messages[0]?.msgId;
      const previousHeight = el.scrollHeight;

      console.log("oldestID:", oldestId);
      console.log("old:", messages);
      // console.log("previousHeight:", previousHeight);
      const res = await getMessages(workspaceId, tabId, oldestId); // 과거 메시지 요청

      // console.log(res["messages"]);

      const new_messages = res.messages.map((msg: any) => ({
        senderId: msg.sender_id,
        msgId: msg.msg_id,
        nickname: msg.nickname,
        content: msg.content,
        image: msg.image,
        createdAt: msg.created_at,
        isUpdated: msg.is_updated,
        fileUrl: msg.file_url,
      }));

      if (new_messages != null) {
        prependMessages(new_messages);
        // 스크롤 위치를 현재 위치만큼 유지
        requestAnimationFrame(() => {
          setTimeout(() => {
            requestAnimationFrame(() => {
              const newHeight = el.scrollHeight;
              const heightDiff = newHeight - previousHeight;
              el.scrollTop = heightDiff;
            });
          }, 0);
        });
        isFetching.current = false;
      }
    }
  };

  // 로딩 중이면, 스켈레톤 이미지 보여줌
  if (isLoading) {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="sticky top-1.5 mx-auto w-[120px] h-[28px] my-2 bg-[#f5f5f5] flex items-center justify-center rounded-full" />
        <div className="text-m min-h-0 pl-5 w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonChat key={i} />
          ))}
        </div>
      </div>
    );
  }

  const dayStart = (iso: string) => {
    const d = new Date(iso);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  return (
    <div
      ref={containerRef}
      className={`flex-1 min-h-0 overflow-y-auto scrollbar-thin ${className}`}
      onScroll={(event) => {
        handleScroll(event);
      }}
    >
      <SSEListener />
      <WebSocketClient workspaceId={workspaceId} tabId={tabId} />
      <div className="text-m pl-5 w-full">
        {messages.map((msg, idx) => {
          const prev = messages[idx - 1];
          const todayKey = msg.createdAt ? dayStart(msg.createdAt) : null;
          const prevKey = prev?.createdAt ? dayStart(prev.createdAt) : null;
          const showDateHeader =
            todayKey !== null && (prevKey === null || todayKey !== prevKey);

          let showProfile = true;

          if (
            prev &&
            prev.nickname === msg.nickname &&
            prev.createdAt &&
            msg.createdAt
          ) {
            const prevTime = new Date(prev.createdAt).getTime();
            const currTime = new Date(msg.createdAt).getTime();
            const diff = currTime - prevTime;

            if (diff <= 5 * 60 * 1000) {
              showProfile = false;
            }
          }

          return (
            <React.Fragment key={msg.msgId}>
              {/* 날짜 헤더 : sticky 추가 */}
              {showDateHeader && todayKey && <ShowDate timestamp={todayKey} />}

              {/* 각각의 채팅 */}
              <ChatProfile
                senderId={msg.senderId ? msg.senderId : ""}
                msgId={msg.msgId ? msg.msgId : 0}
                imgSrc={msg.image ? msg.image : "/user_default.png"}
                nickname={msg.nickname}
                time={
                  msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : " "
                }
                content={msg.content}
                showProfile={showProfile}
                fileUrl={msg.fileUrl}
                isUpdated={msg.isUpdated}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
