"use client";

import { useState } from "react";
import { RoleTable } from "@/components/administration/RoleTable";
import { Button } from "@/components/ui/button";
import { Plus, CircleCheck, Ban } from "lucide-react";
import { useParams } from "next/navigation";
import { DialogModal } from "@/components/modal/DialogModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { createRole } from "@/apis/roleApi";
import { createRoleColumns } from "./columns";
import { useRoleStore } from "@/store/roleStore";

export default function RoleTablePage() {
  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  // 역할 수 상태 관리 및 테이블 상단에 표시
  const [roleCount, setRoleCount] = useState<number>(0);
  const handleRolesLoaded = (count: number) => {
    setRoleCount(count);
  };

  // 전역 상태의 새로고침 트리거 가져오기
  const { refreshTrigger, triggerRefresh } = useRoleStore();

  // 사용 가능한 권한 목록
  const availablePermissions = [
    {
      id: "admin",
      name: (
        <>
          <span className="font-bold">Admin:</span> 회원, 그룹, 역할을 관리할 수
          있습니다
        </>
      ),
    },
    {
      id: "announce",
      name: (
        <>
          <span className="font-bold">Announcements:</span> 탭을 생성할 수
          있습니다
        </>
      ),
    },
    {
      id: "course",
      name: (
        <>
          <span className="font-bold">Courses:</span> 탭을 생성하고, 학습 자료를
          게시할 수 있습니다
        </>
      ),
    },
    {
      id: "channel",
      name: (
        <>
          <span className="font-bold">Channels:</span> 탭을 생성할 수 있습니다
        </>
      ),
    },
    {
      id: "dm",
      name: (
        <>
          <span className="font-bold">Direct Message:</span> 메시지를 보낼 수
          있습니다
        </>
      ),
    },
  ];

  // 역할 생성 폼 데이터 상태 관리 (direct_message는 기본 선택)
  const [form, setForm] = useState<{ roleName: string; permissions: string[] }>(
    { roleName: "", permissions: ["dm"] },
  );

  // 역할 생성 모달 표시 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기/닫기 핸들러
  const handleModalOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);

    // 모달이 닫힐 때 폼 초기화
    if (!isOpen) {
      setForm({ roleName: "", permissions: [""] });
    }
  };

  // 권한 체크박스 변경 핸들러 (dm은 항상 선택된 상태로 유지)
  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (permissionId === "dm") return;

    if (checked) {
      setForm({ ...form, permissions: [...form.permissions, permissionId] });
    } else {
      setForm({
        ...form,
        permissions: form.permissions.filter((id) => id !== permissionId),
      });
    }
  };

  // 에러 토스트 표시 함수
  const showErrorToast = () => {
    toast.error("역할 생성에 실패했습니다", {
      icon: <Ban className="size-5" />,
    });
  };

  // 역할 생성 함수
  const handleCreateRole = async () => {
    try {
      // dm를 제외한 권한 배열 생성
      const permissionsToSend = form.permissions.filter((p) => p !== "dm");
      const result = await createRole(
        workspaceId,
        form.roleName,
        permissionsToSend,
      );

      if (result) {
        toast.success("역할이 생성되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });
        handleModalOpenChange(false);
        triggerRefresh(workspaceId);
      } else {
        showErrorToast();
      }
    } catch (error) {
      showErrorToast();
    }
  };

  return (
    <div className="flex flex-1 w-full h-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-md">{roleCount}개의 역할</p>
        <div className="flex gap-2">
          {/* 역할 생성 모달 */}
          <DialogModal
            title="역할 생성"
            open={isModalOpen}
            onOpenChange={handleModalOpenChange}
            trigger={
              <Button variant="outline">
                <Plus className="h-4 w-4" />새 역할 만들기
              </Button>
            }
          >
            {/* DialogModal 내용: 역할 생성 폼 */}
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
                        disabled={permission.id === "dm"} // dm은 항상 포함되므로 비활성화
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
                  onClick={handleCreateRole}
                  disabled={
                    form.roleName.trim() === "" || form.permissions.length === 0
                  }
                  className="flex-1"
                >
                  생성
                </Button>
              </div>
            </div>
          </DialogModal>
        </div>
      </div>
      <div className="flex flex-1 mx-1 overflow-y-auto scrollbar-thin">
        <RoleTable
          onRolesLoaded={handleRolesLoaded}
          key={refreshTrigger?.[workspaceId] || 0} // 전역 상태의 새로고침 트리거가 변경되면 컴포넌트 재렌더링
          columns={createRoleColumns(() => triggerRefresh(workspaceId))}
        />
      </div>
    </div>
  );
}
