"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createUserColumns } from "./columns";
import { UserTable } from "@/components/administration/UserTable";
import { Button } from "@/components/ui/button";
import { ExUpload } from "@/components/excel_import/exImportButton";
import { Plus } from "lucide-react";
import { DialogModal } from "@/components/modal/DialogModal";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addUser } from "@/apis/userApi";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";
import { useRoleStore } from "@/store/roleStore";
import { useGroupStore } from "@/store/groupStore";
import { useUserStore } from "@/store/userStore";
import { Role } from "@/apis/roleApi";
import { Group } from "@/apis/groupApi";

export default function UserTablePage() {
  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  // 회원 수 상태 관리 및 테이블 상단에 표시
  const [userCount, setUserCount] = useState<number>(0);
  const handleUsersLoaded = (count: number) => {
    setUserCount(count);
  };

  // UserTable에 전달할 함수와 트리거 구독
  const { triggerRefresh, refreshTrigger } = useUserStore();

  // 역할 정보를 전역 상태에서 가져오기 (필요한 상태만 구독)
  const roles = useRoleStore((state) => state.roles);
  const fetchRoles = useRoleStore((state) => state.fetchRoles);
  // 현재 워크스페이스의 역할 데이터
  const workspaceRoles = roles[workspaceId] || [];

  // 그룹 정보를 전역 상태에서 가져오기 (필요한 상태만 구독)
  const groups = useGroupStore((state) => state.groups);
  const fetchGroups = useGroupStore((state) => state.fetchGroups);
  // 현재 워크스페이스의 그룹 데이터
  const workspaceGroups = groups[workspaceId] || [];

  // 회원 초대 폼 데이터 상태 관리 (초기값: 역할은 guest(1)로 설정)
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role_id: string;
    group_id: string[] | null;
  }>({ name: "", email: "", role_id: "2", group_id: [] });

  // 회원 초대 모달 표시 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpenChange = (isOpen: boolean) => {
    setIsModalOpen(isOpen);

    // 모달이 열릴 때 역할과 그룹 목록 불러오기
    if (isOpen) {
      fetchRoles(workspaceId);
      fetchGroups(workspaceId);
    }

    // 모달이 닫힐 때 폼 초기화
    if (!isOpen) {
      setForm({ name: "", email: "", role_id: "2", group_id: [] });
    }
  };

  // 에러 토스트 표시 함수
  const showErrorToast = () => {
    toast.error("회원 등록에 실패했습니다", {
      icon: <Ban className="size-5" />,
    });
  };

  // 회원 초대 함수
  const handleInviteUser = async () => {
    try {
      // role_id와 group_id만 숫자 타입으로 변환하여 페이로드에 담음
      const payload = {
        nickname: form.name,
        email: form.email,
        role_id: parseInt(form.role_id).toString(),
        group_id:
          form.group_id && form.group_id.length > 0
            ? form.group_id.map((id) => parseInt(id).toString())
            : [],
      };

      const result = await addUser(workspaceId, payload);

      if (result) {
        handleModalOpenChange(false);
        triggerRefresh(workspaceId);
        toast.success("회원이 등록되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });
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
        <p className="text-md">{userCount}명의 회원</p>
        <div className="flex gap-2">
          <DialogModal
            title="Invite User"
            defaultOpen={false}
            open={isModalOpen}
            onOpenChange={(isOpen) => handleModalOpenChange(isOpen)}
            trigger={
              <Button variant="outline">
                <Plus className="mr-0 h-4 w-4" />
                Invite User
              </Button>
            }
          >
            {/* DialogModal 내용: 회원 초대 폼 */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h1>이름*</h1>
                <Input
                  type="text"
                  placeholder="이름을 입력해주세요."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1>이메일*</h1>
                <Input
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1>역할*</h1>
                <RadioGroup
                  value={String(form.role_id)}
                  onValueChange={(value) =>
                    setForm({ ...form, role_id: value })
                  }
                >
                  {workspaceRoles.length === 0 ? (
                    <div>역할을 불러오는 중입니다...</div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {workspaceRoles.map((role: Role) => (
                        <div
                          key={role.role_id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={String(role.role_id)}
                            id={`role-${role.role_id}`}
                          />
                          <Label htmlFor={`role-${role.role_id}`}>
                            {role.role_name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-3">
                <h1>그룹</h1>
                <Select
                  value={
                    form.group_id && form.group_id.length > 0
                      ? form.group_id[0]
                      : undefined
                  }
                  onValueChange={(value) => {
                    if (value === "none") {
                      setForm({ ...form, group_id: [] });
                    } else {
                      setForm({ ...form, group_id: [value] });
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="그룹을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaceGroups.length === 0 ? (
                      <SelectItem value="loading" disabled>
                        그룹을 불러오는 중입니다...
                      </SelectItem>
                    ) : (
                      <>
                        <SelectItem value="none">선택 안함</SelectItem>
                        {workspaceGroups.map((group: Group) => (
                          <SelectItem
                            key={group.group_id}
                            value={String(group.group_id)}
                          >
                            {group.group_name}
                          </SelectItem>
                        ))}
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-1 flex-row mt-6 gap-3">
                <Button
                  variant="secondary"
                  onClick={() => handleModalOpenChange(false)}
                  className="flex flex-1"
                >
                  취소
                </Button>
                <Button
                  variant="default"
                  onClick={handleInviteUser}
                  disabled={
                    form.name.trim() === "" ||
                    form.email.trim() === "" ||
                    !form.role_id ||
                    form.role_id === ""
                  }
                  className="flex flex-1"
                >
                  초대
                </Button>
              </div>
            </div>
          </DialogModal>
          <ExUpload />
        </div>
      </div>
      <div className="flex flex-1 mx-1 overflow-y-auto scrollbar-thin">
        <UserTable
          onUsersLoaded={handleUsersLoaded}
          key={refreshTrigger?.[workspaceId] || 0} // 전역 상태의 새로고침 트리거 사용
          columns={createUserColumns(() => triggerRefresh(workspaceId))}
        />
      </div>
    </div>
  );
}
