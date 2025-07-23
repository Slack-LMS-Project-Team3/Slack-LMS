"use client";

import { DialogModal } from "../modal/DialogModal";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Role } from "@/apis/roleApi";
import { updateUserRole } from "@/apis/userApi";
import { useRoleStore } from "@/store/roleStore";

interface EditRoleProps {
  userId: string;
  currentRoleId: string;
  triggerComponent: React.ReactNode;
  onRoleUpdated?: () => void;
}

export default function EditRole({
  userId,
  currentRoleId,
  triggerComponent,
  onRoleUpdated,
}: EditRoleProps) {
  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  // 모달 열림 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 역할과 그룹 정보를 전역 상태에서 가져오기
  const { roles, fetchRoles } = useRoleStore();

  // 역할 선택 상태 관리 (초기값은 현재 역할)  
  const [selectedRoleId, setSelectedRoleId] = useState<string>(
    currentRoleId ? String(currentRoleId) : "",
  );

  // 선택된 역할 이름 찾기
  const selectedRole = roles[workspaceId].find(
    (role: Role) => String(role.role_id) === selectedRoleId,
  );

  // 모달이 열릴 때 역할 목록 불러오기
  const handleModalOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);

    if (isOpen) {
      fetchRoles(workspaceId);      

      // currentRoleId가 유효한 값인지 확인하고 문자열로 변환
      const safeRoleId = currentRoleId ? String(currentRoleId) : "";
      setSelectedRoleId(safeRoleId);
    }
  };

  // 역할 변경 저장 핸들러
  const handleSaveRole = async () => {
    if (!selectedRoleId) {
      toast.error("역할을 선택해주세요", {
        icon: <Ban className="size-5" />,
      });
      return;
    }

    try {
      const result = await updateUserRole(workspaceId, userId, selectedRoleId);

      if (result) {
        toast.success("역할이 변경되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });

        handleModalOpenChange(false);

        // 콜백 함수 호출 (부모 컴포넌트에서 사용자 목록 새로고침 등)
        if (onRoleUpdated) {
          onRoleUpdated();
        }
      } else {
        toast.error("역할 변경에 실패했습니다", {
          icon: <Ban className="size-5" />,
        });
      }
    } catch (error) {
      toast.error("역할 변경에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    }
  };

  return (
    <DialogModal
      title="역할 변경"
      open={isModalOpen}
      onOpenChange={handleModalOpenChange}
      trigger={triggerComponent}
    >
      <div className="flex flex-col gap-6 py-4 pb-0">
        <div className="flex flex-col gap-3">
          <RadioGroup
              value={selectedRoleId}
              onValueChange={setSelectedRoleId}
              className="grid grid-cols-2 gap-2"
            >
              {roles[workspaceId].map((role: Role) => (
                <div
                  key={role.role_id}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={String(role.role_id)}
                    id={`role-${role.role_id}`}
                  />
                  <Label htmlFor={`role-${role.role_id}`} className="flex-1">
                    {role.role_name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )
        </div>

        <div className="flex justify-between gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => handleModalOpenChange(false)}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleSaveRole}
            disabled={!selectedRoleId || selectedRoleId === currentRoleId}
            className="flex-1"
          >
            설정
          </Button>
        </div>
      </div>
    </DialogModal>
  );
}
