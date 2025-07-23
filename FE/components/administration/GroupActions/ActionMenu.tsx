"use client"

import { useState } from "react"
import { Group } from "@/apis/groupApi"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, KeyRound, Trash2, SquarePen, UsersRound } from "lucide-react"
import { EditRoleDialog } from "./EditRoleDialog"

export type OnGroupUpdated = () => void;

interface ActionMenuProps {
  group: Group;
  onRefresh?: OnGroupUpdated;
}

export function ActionMenu({ group, onRefresh }: ActionMenuProps) {
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);

  return (
    <div>
      {/* 역할 수정 다이얼로그 */}
      <EditRoleDialog
        group={group}
        isOpen={isEditRoleDialogOpen}
        setIsOpen={setIsEditRoleDialogOpen}
        onEditSuccess={onRefresh}
      />

      {/* 액션 메뉴 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">            
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom" alignOffset={4} sideOffset={4}>
          <DropdownMenuItem>
            <SquarePen className="mr-2 h-4 w-4" />
            <span>이름 수정</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UsersRound className="mr-2 h-4 w-4" />
            <span>회원 추가/삭제</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsEditRoleDialogOpen(true)}>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>역할 수정</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>그룹 삭제</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
