"use client"

import { useParams } from "next/navigation"
import { deleteRole } from "@/apis/roleApi"
import { toast } from "sonner"
import { CircleCheck, Ban } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { OnRoleUpdated } from "./ActionMenu"

export interface DeleteRoleDialogProps {
  roleId: string;
  roleName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDeleteSuccess?: OnRoleUpdated;
}

export function DeleteRoleDialog({ roleId, roleName, isOpen, setIsOpen, onDeleteSuccess }: DeleteRoleDialogProps) {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  
  const handleDelete = async () => {
    try {
      const result = await deleteRole(workspaceId, roleId);
      
      if (result) {
        toast.success("역할이 삭제되었습니다", {
          icon: <CircleCheck className="size-5" />,
        })};      
      
      if (onDeleteSuccess) {
        onDeleteSuccess();
      };
    } catch (error) {      
      toast.error("역할 삭제에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>역할 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            &apos;{roleName}&apos; 역할을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

