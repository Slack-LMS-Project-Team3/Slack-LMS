"use client";

import { Member, postMemberList } from "@/apis/tabApi";
import { useState } from "react";
import {
  SidebarProvider,
  SidebarMenu,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { InviteListItem } from "@/components/tab/InviteListItem";
import { toast } from "sonner";
import { CircleCheck, Ban } from "lucide-react";

export interface PossibleMembersModalProps {
  workspaceId: string;
  tabId: string;
  possibleMembers: Member[];
  onBack: () => void;
  onInviteComplete: () => void;
}

export function PossibleMembersModal({
  workspaceId,
  tabId,
  possibleMembers,
  onBack,
  onInviteComplete,
}: PossibleMembersModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const toggleMemberSelect = (member: Member) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m.user_id === member.user_id)
        ? prev.filter((m) => m.user_id !== member.user_id)
        : [...prev, member],
    );
  };

  const inviteMembers = async () => {
    if (selectedMembers.length === 0) return;

    try {
      await postMemberList(
        workspaceId,
        tabId,
        selectedMembers.map((member) => member.user_id),
      );
      toast.success(`${selectedMembers.length}명이 초대되었습니다`, {
        icon: <CircleCheck className="size-5" />,
      });
      onInviteComplete();
    } catch (error) {
      toast.error("초대에 실패했습니다", {
        icon: <Ban className="size-5" />,
      });
    }
  };

  return (
    <SidebarProvider className="flex flex-col h-full">
      <SidebarMenu className="flex-1 overflow-y-auto scrollbar-thin">
        {possibleMembers.length === 0 && (
          <h1 className="py-10 text-center">No possible members</h1>
        )}
        {possibleMembers.map((member) => (
          <InviteListItem
            key={member.user_id}
            user={member}
            mode="addableMember"
            onClick={() => toggleMemberSelect(member)}
            isSelected={selectedMembers.some(
              (m) => m.user_id === member.user_id,
            )}
          />
        ))}
      </SidebarMenu>
      <SidebarFooter className="p-4">
        <Button
          className="w-full"
          onClick={inviteMembers}
          disabled={selectedMembers.length === 0}
        >
          Invite ({selectedMembers.length})
        </Button>
      </SidebarFooter>
    </SidebarProvider>
  );
}
