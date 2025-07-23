"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  SquareUserRound,
  Mail,
  KeyRound,
  Trash2,
} from "lucide-react";
import EditRole from "@/components/modal/EditRole";
import { DeleteUserDialog } from "@/components/administration/UserActions/DeleteUserDialog";

export type OnUserUpdated = () => void;

interface ActionMenuProps {
  userId: string;
  userName: string;
  roleId: string;
  onUserUpdated?: OnUserUpdated;
}

export function ActionMenu({
  userId,
  userName,
  roleId,
  onUserUpdated,
}: ActionMenuProps) {
  // 삭제 대화상자 상태
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // roleId가 유효한지 확인 (디버깅용)
  console.log("ActionMenu에서 받은 roleId:", roleId, typeof roleId);

  // roleId가 null, undefined 또는 빈 문자열인 경우 기본값 설정
  const safeRoleId = roleId ? String(roleId) : "";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          alignOffset={4}
          sideOffset={4}
        >
          <DropdownMenuItem>
            <SquareUserRound className="h-4 w-4 mr-2" />
            프로필 보기
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="h-4 w-4 mr-2" />
            메시지 보내기
          </DropdownMenuItem>

          <EditRole
            userId={userId}
            currentRoleId={safeRoleId}
            triggerComponent={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <KeyRound className="h-4 w-4 mr-2" />
                역할 변경
              </DropdownMenuItem>
            }
            onRoleUpdated={onUserUpdated}
          />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            회원 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 삭제 확인 대화상자 */}
      <DeleteUserDialog
        userId={userId}
        userName={userName}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDeleteSuccess={onUserUpdated}
      />
    </>
  );
}
