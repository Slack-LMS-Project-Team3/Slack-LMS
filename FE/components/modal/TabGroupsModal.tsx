"use client";

import { SidebarProvider, SidebarMenu } from "@/components/ui/sidebar";
import { Group } from "@/apis/tabApi";
import { InviteListItem } from "@/components/tab/InviteListItem";

interface TabGroupsModalProps {
  tabGroups: Group[];
  onAddClick?: () => void;
}

export function TabGroupsModal({ tabGroups, onAddClick }: TabGroupsModalProps) {
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-thin gap-0">
      <SidebarProvider>
        <SidebarMenu>
          {onAddClick && (
            <InviteListItem
              key="add-group-button"
              user={{ nickname: "Add Groups" }}
              mode="addGroup"
              onClick={onAddClick}
            />
          )}
          {tabGroups.length === 0 && (
            <div className="py-10 text-center">No groups added yet</div>
          )}
          {tabGroups.map((group) => (
            <InviteListItem
              key={group.group_id}
              user={{
                user_id: String(group.group_id),
                nickname: group.group_name,
                role_name: `${group.group_members_count || 0} members`,
              }}
              mode="tabGroup"
            />
          ))}
        </SidebarMenu>
      </SidebarProvider>
    </div>
  );
}
