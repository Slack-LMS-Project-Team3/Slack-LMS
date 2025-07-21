import { HoverCardContent } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/store/profileStore";
import { useCreateDM } from "@/hooks/createDM";

interface MiniProfileProps {
  senderId: string;
  imgSrc: string;
  nickname: string;
}

export function MiniProfile({ senderId, imgSrc, nickname }: MiniProfileProps) {
  // DM방 생성
  const createDM = useCreateDM();

  // 프로필
  const openProfile = useProfileStore((s) => s.openWithId);

  return (
    <div>
      <HoverCardContent
        side="top"
        className="flex items-center HoverCardContent"
      >
        <div>
          <img
            src={imgSrc}
            className="w-[60px] h-[60px] rounded-lg bg-gray-400 mr-3 object-cover"
          />
        </div>
        <div>
          <div className="ml-0.5 text-m-bold">{nickname}</div>
          <div className="mt-1.5">
            {/* DM 버튼 */}
            <Button
              className="p1-button-primary p1-button-primary-selected cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => createDM(senderId)}
            >
              <div className="text-s-bold">DM</div>
            </Button>

            {/* 프로필 버튼 */}
            <Button
              onClick={() => openProfile(senderId)}
              className="p1-button-primary p1-button-primary-selected ml-1 cursor-pointer"
              variant="outline"
              size="sm"
            >
              <div className="text-s-bold">프로필</div>
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </div>
  );
}
