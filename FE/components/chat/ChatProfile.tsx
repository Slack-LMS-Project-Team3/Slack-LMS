import { MiniProfile } from "./MiniProfile";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ChatProfileProps {
  imgSrc: string;
  nickname: string;
  time: string;
  content: string;
  showProfile: boolean;
}

export function ChatProfile({ imgSrc, nickname, time, content, showProfile }: ChatProfileProps) {
  const text = content.replace(/\n+$/, ""); // 마지막 줄의 개행 문자 제거

  return (
    <div className="flex px-[8px] py-[4.5px] hover:bg-[#F4F4F4] group">
      {/* showProfile이면, 프로필 사진 + 이름 + 채팅 보여줌. 아니면 채팅만 */}
      {showProfile ? (
        <div className="relative">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="w-[36px] mr-[8px] cursor-pointer">
                <img src={imgSrc} className="w-[36px] h-[36px] mt-1 rounded-md object-cover" alt="profile" />
              </button>
            </HoverCardTrigger>
            <MiniProfile imgSrc={imgSrc} nickname={nickname} />
          </HoverCard>
        </div>
      ) : (
        <div className="flex flex-shrink-0 items-center justify-end text-xxs chat-time-stamp w-[36px] mr-[8px]">
          <div className="hidden group-hover:block">{time.split(" ")[1]}</div>
        </div>
      )}

      <div className="w-full m-[-12px 8px -16px -16px] p-[8px 8px 8px 16px]">
        {showProfile && (
          <div className="flex items-baseline space-x-1">
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-m-bold cursor-pointer hover:underline">{nickname}</span>
              </HoverCardTrigger>
              <MiniProfile imgSrc={imgSrc} nickname={nickname} />
            </HoverCard>

            <span className="text-xs chat-time-stamp">{time}</span>
          </div>
        )}
        <p className="whitespace-pre-wrap break-words break-anywhere text-m">{text}</p>
      </div>
    </div>
  );
}
