import { useState, useEffect, ReactNode } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Trash2 } from "lucide-react";
import { useMyUserStore } from "@/store/myUserStore";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";
import { Editor } from "@tiptap/react";
import { useSaveMessagesStore } from "@/store/saveMessagesStore";

// props 타입 정의
interface SaveMessagesProps {
  workspaceId: string;
  children: React.ReactNode;
  editor?: Editor;
}

export default function SaveMessages({
  workspaceId,
  children,
  editor,
}: SaveMessagesProps) {
  // 유저 id 불러오기
  const userId = useMyUserStore((state) => state.userId);

  // zustand 상태 및 액션
  const items = useSaveMessagesStore((s) => s.items);
  const loading = useSaveMessagesStore((s) => s.loading);
  const error = useSaveMessagesStore((s) => s.error);
  const fetchMessages = useSaveMessagesStore((s) => s.fetch);
  const removeMessage = useSaveMessagesStore((s) => s.remove);

  const [hoverOpen, setHoverOpen] = useState(false);

  // 컴포넌트 마운트 시 메시지 불러오기
  useEffect(() => {
    if (workspaceId && userId) {
      fetchMessages(workspaceId, userId);
    }
  }, [workspaceId, userId, fetchMessages]);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    try {
      await removeMessage(workspaceId, id, userId);
      toast.success("저장 메시지가 삭제되었습니다", { icon: <CircleCheck /> });
    } catch {
      toast.error("저장 메시지 삭제에 실패했습니다.", { icon: <Ban /> });
    }
  };

  return (
    <HoverCard open={hoverOpen} onOpenChange={(open) => setHoverOpen(open)}>
      {/* 재호버 방지 */}
      <button onClick={() => setHoverOpen((o) => !o)}>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      </button>
      <HoverCardContent
        side="top"
        align="end"
        className="w-100 bg-white text-black border m-0 p-0 mb-0.5 mr-1"
      >
        <div>
          <div className="flex flex-row items-center justify-between pl-5 pr-3 py-3">
            <div className="text-m-bold">저장 메시지</div>
          </div>

          <div className="border-t-1 border-gray-200 flex flex-col max-h-80 overflow-y-auto scrollbar-thin">
            {loading && (
              <div className="py-3 text-sm text-center">메시지 불러오는 중</div>
            )}

            {error && (
              <div className="py-3 text-sm text-center text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="px-5 py-3 text-sm text-gray-500">
                저장할 메시지를 추가해주세요
              </div>
            )}

            {!loading &&
              !error &&
              items.map((message, idx) => (
                <div
                  key={message.save_message_id}
                  onClick={() => {
                    editor?.commands.setContent(message.content);
                    setHoverOpen(false);
                  }}
                  className={`
                  ${idx !== 0 ? "border-t-1" : ""}
                  border-gray-200 flex flex-row justify-between hover:bg-gray-100 cursor-pointer`}
                >
                  <div className="flex-1 message-content text-sm px-5 py-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    />
                  </div>
                  {/* 메시지 삭제 버튼 */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트가 더 위로 안 올라가게 차단
                      handleDelete(message.save_message_id);
                    }}
                    className="pr-3 pb-3 flex items-end justify-end"
                  >
                    <Trash2 className="w-5 h-5 mt-2 cursor-pointer text-gray-400 hover:text-red-300 hover:fill-red-100" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
