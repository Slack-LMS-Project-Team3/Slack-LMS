"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Role, updateRole } from "@/apis/roleApi"
import { toast } from "sonner"
import { CircleCheck, Ban } from "lucide-react"
import { DialogModal } from "@/components/modal/DialogModal"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { OnRoleUpdated } from "./ActionMenu"

export interface EditRoleDialogProps {
  role: Role;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onEditSuccess?: OnRoleUpdated;
}

export function EditRoleDialog({ role, isOpen, setIsOpen, onEditSuccess }: EditRoleDialogProps) {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  
  // 사용 가능한 권한 목록
  const availablePermissions = [
    { 
      id: "admin", 
      name: (
        <>
          <span className="font-bold">Admin:</span> 회원, 그룹, 역할을 관리할 수 있습니다
        </>
      ) 
    },
    { 
      id: "announce", 
      name: (
        <>
          <span className="font-bold">Announcements:</span> 탭을 생성할 수 있습니다
        </>
      ) 
    },
    {
      id: "course",
      name: (
        <>
          <span className="font-bold">Courses:</span> 탭을 생성하고, 학습 자료를 게시할 수 있습니다
        </>
      )
    },
    { 
      id: "channel", 
      name: (
        <>
          <span className="font-bold">Channels:</span> 탭을 생성할 수 있습니다
        </>
      ) 
    },
    { 
      id: "dm", 
      name: (
        <>
          <span className="font-bold">Direct Message:</span> 메시지를 보낼 수 있습니다
        </>
      ) 
    },
  ];

  // 역할 수정 폼 데이터 상태 관리
  const [form, setForm] = useState<{
    roleName: string;
    permissions: string[];
  }>({ roleName: "", permissions: ["dm"] });

  // 역할 정보로 폼 초기화
  useEffect(() => {
    if (isOpen && role) {
      setForm({
        roleName: role.role_name,
        permissions: [...(role.permissions || []), "dm"] // dm은 항상 포함
      });
    }
  }, [isOpen, role]);

  // 모달 열기/닫기 핸들러
  const handleModalOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    // 모달이 닫힐 때 폼 초기화
    if (!open) {
      setForm({ roleName: "", permissions: ["dm"] });
    }
  };

  // 권한 체크박스 변경 핸들러
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    // dm는 항상 선택된 상태로 유지
    if (permissionId === "dm") return;

    if (checked) {
      // 권한 추가
      setForm({
        ...form,
        permissions: [...form.permissions, permissionId],
      });
    } else {
      // 권한 제거
      setForm({
        ...form,
        permissions: form.permissions.filter((id) => id !== permissionId),
      });
    }
  };

  // 역할 수정 함수
  const handleUpdateRole = async () => {
    try {
      // dm를 제외한 권한 배열 생성
      const permissionsToSend = form.permissions.filter((p) => p !== "dm");
      const result = await updateRole(workspaceId, String(role.role_id), permissionsToSend);
      if (result) {
        toast.success("역할이 수정되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });
        handleModalOpenChange(false);

        // 수정 후 목록 새로고침
        if (onEditSuccess) {
          onEditSuccess();
        }
      } else {
        toast.error("역할 수정에 실패했습니다", {
          icon: <Ban className="size-5" />,
        });
      }
    } catch (error) {      
      toast.error("역할 수정에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    }
  };

  return (
    <DialogModal
      title="역할 수정"
      open={isOpen}
      onOpenChange={handleModalOpenChange}
      trigger={<div />} // 필수 prop이지만 사용하지 않으므로 빈 div 사용
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h1>역할 이름*</h1>
          <Input
            id="role-name"
            placeholder="역할 이름을 입력하세요"
            value={form.roleName}
            onChange={(e) =>
              setForm({ ...form, roleName: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-3">
          <h1>권한*</h1>
          <div className="grid grid-col gap-5 pl-2">
            {availablePermissions.map((permission) => (
              <div
                key={permission.id}
                className="flex flex-row items-center space-x-2"
              >
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={form.permissions.includes(permission.id)}
                  onCheckedChange={(checked) =>
                    handlePermissionChange(
                      permission.id,
                      checked === true,
                    )
                  }
                  disabled={permission.id === "dm"} // dm은 비활성화
                />
                <Label htmlFor={`permission-${permission.id}`}>
                  {permission.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-row mt-6 gap-3">
          <Button
            variant="outline"
            onClick={() => handleModalOpenChange(false)}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleUpdateRole}
            disabled={
              form.roleName.trim() === "" || form.permissions.length === 0
            }
            className="flex-1"
          >
            저장
          </Button>
        </div>
      </div>
    </DialogModal>
  );
}
