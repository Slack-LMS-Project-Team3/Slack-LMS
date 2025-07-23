import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkDialog } from "../chat-text-area/LinkDialog";
import { createLink } from "@/apis/linkApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";

interface AddLinkButtonProps {
  workspaceId: string;
  tabId: string;
  onCreated?: () => void;
}

export default function AddLinkButton({
  workspaceId,
  tabId,
  onCreated,
}: AddLinkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSave = async (text: string, url: string) => {
    try {
      await createLink(workspaceId, tabId, text, url);
      setIsOpen(false);

      toast.success("링크가 추가되었습니다", {
        icon: <CircleCheck className="size-5" />,
      });

      if (onCreated) {
        // 바로 보여주기
        onCreated();
      } else {
        router.refresh();
      }
    } catch (err) {
      toast.error("링크 추가에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
      console.error("링크 생성 실패", err);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="h-8 w-8 cursor-pointer"
      >
        <Plus className="!h-5.5 !w-5.5" />
      </Button>
      <LinkDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        initialText="" // 필요에 따라 편집용 초기값 할당
        initialUrl=""
        onSave={handleSave}
      />
    </>
  );
}
