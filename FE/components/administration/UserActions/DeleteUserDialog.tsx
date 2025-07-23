"use client"

import { useParams } from "next/navigation"
import { deleteUser } from "@/apis/userApi"
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
import { OnUserUpdated } from "./ActionMenu"

export interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDeleteSuccess?: OnUserUpdated;
}

export function DeleteUserDialog({ userId, userName, isOpen, setIsOpen, onDeleteSuccess }: DeleteUserDialogProps) {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  
  const handleDelete = async () => {
    try {
      const result = await deleteUser(workspaceId, userId);
      
      if (result) {
        toast.success("사용자가 삭제되었습니다", {
          icon: <CircleCheck className="size-5" />,
        });
        
        // 삭제 후 목록 새로고침
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
      } else {
        toast.error("사용자 삭제에 실패했습니다", {
          icon: <Ban className="size-5" />,
        });
      }
    } catch (error) {      
      toast.error("사용자 삭제에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    } finally {
      setIsOpen(false);
    }
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>회원 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            {userName}를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
