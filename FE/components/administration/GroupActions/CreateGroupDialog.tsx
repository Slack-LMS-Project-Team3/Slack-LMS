"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { DialogModal } from "@/components/modal/DialogModal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CircleCheck, Ban } from "lucide-react"
import { createGroup } from "@/apis/groupApi"
import { useGroupStore } from "@/store/groupStore"

interface CreateGroupDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCreateSuccess?: () => void;
  trigger: React.ReactNode;
}

export function CreateGroupDialog({ isOpen, setIsOpen, onCreateSuccess, trigger }: CreateGroupDialogProps) {
  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  // 그룹 이름 상태 관리
  const [groupName, setGroupName] = useState("");

  // 제출 상태 관리
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 전역 상태에서 그룹 데이터 가져오기
  const { fetchGroups } = useGroupStore();

  // 모달 열림/닫힘 핸들러
  const handleModalOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {      
      setGroupName("");
      setIsSubmitting(false);
    }
  };

  // 그룹 생성 핸들러
  const handleCreateGroup = async () => {   

    setIsSubmitting(true);

    try { 
      const result = await createGroup(workspaceId, groupName);      
      
      if (result){
        toast.success("그룹이 생성되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });      
        handleModalOpenChange(false);

        // 전역 상태 갱신
        fetchGroups(workspaceId);
      
        // 콜백 함수 호출 (부모 컴포넌트에서 그룹 목록 새로고침 등)
        if (onCreateSuccess) {
          onCreateSuccess();
        }
      } else{
        toast.error("그룹 생성에 실패했습니다", {
          icon: <Ban className="size-5" />,
        });
      }                  
    } catch (error) {
      console.error("그룹 생성 중 오류 발생:", error);
      toast.error("그룹 생성에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogModal
      title="새 그룹 생성"
      open={isOpen}
      onOpenChange={handleModalOpenChange}
      trigger={trigger}
    >
      <div className="flex flex-col gap-6 py-4 pb-0">
        <div className="flex flex-col gap-3">
          <div className="grid gap-2">
            <h1>그룹 이름*</h1>
            <Input
              id="group-name"
              placeholder="그룹 이름을 입력하세요"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => handleModalOpenChange(false)}
            className="flex-1"
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || isSubmitting}
            className="flex-1"
          >
            생성
          </Button>
        </div>
      </div>
    </DialogModal>
  );
}
