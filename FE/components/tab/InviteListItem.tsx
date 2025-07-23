"use client";

import {
  SidebarProvider,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Plus, CircleCheck, UserRoundPlus, UsersRound } from "lucide-react";
import clsx from "clsx";
import { Member } from "@/apis/tabApi";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/store/profileStore";
import { useCreateDM } from "@/hooks/createDM";

export interface InviteListItemProps {
  user:
    | Member
    | {
        user_id?: string;
        nickname?: string;
        image?: string;
        role_name?: string;
      };
  mode?:
    | "tabMember"
    | "addableMember"
    | "tabGroup"
    | "addableGroup"
    | "addMember"
    | "addGroup";
  onClick?: () => void;
  isSelected?: boolean;
}

export function InviteListItem({
  user,
  mode = "tabMember",
  onClick,
  isSelected,
}: InviteListItemProps) {
  // DM방 생성
  const createDM = useCreateDM();

  // 프로필
  const openProfile = useProfileStore((s) => s.openWithId);

  // user_id가 없는 경우 빈 문자열로 처리
  const userId = user.user_id || "";

  return (
    <SidebarProvider>
      <SidebarMenuItem key={userId} className="w-full">
        <SidebarMenuButton
          className={clsx(
            "py-8 px-4 hover:bg-gray-200 flex justify-between items-center rounded-none",
            {
              "cursor-pointer": !!onClick,
            },
          )}
          onClick={onClick}
        >
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex items-center gap-2">
              {(mode === "addMember" || mode === "addGroup") && (
                <UserRoundPlus
                  size={30}
                  className="w-[30px] aspect-square bg-gray-400 text-white p-0 rounded-md"
                />
              )}
              {mode === "addableMember" && (
                <img
                  src={user.image || "/user_default.png"}
                  alt={user.nickname || ""}
                  className="w-[30px] aspect-square bg-gray-400 rounded-md object-cover cursor-pointer"
                />
              )}
              {mode === "tabMember" && (
                <img
                  onClick={() => userId && openProfile(userId)}
                  src={user.image || "/user_default.png"}
                  alt={user.nickname || ""}
                  className="w-[30px] aspect-square bg-gray-400 rounded-md object-cover cursor-pointer"
                />
              )}
              {(mode === "tabGroup" || mode === "addableGroup") && (
                <UsersRound
                  size={28}
                  className="w-[28px] aspect-square rounded-md object-cover text-gray-700"
                />
              )}
              <span className="text-lg font-bold text-gray-800 truncate">
                {user.nickname ||
                  (mode === "addMember" ? "Add Members" : "Add Groups")}
              </span>
              {user.role_name && (
                <span className="text-sm font-bold text-gray-400 truncate">
                  {user.role_name}
                </span>
              )}
            </div>

            {/* possibleMember/Group: Add 버튼 + Added 상태 추가 표시 */}
            {(mode === "addableMember" || mode === "addableGroup") &&
              !isSelected && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Plus className="size-4 aspect-square" />
                  <span className="font-bold">ADD</span>
                </div>
              )}
            {(mode === "addableMember" || mode === "addableGroup") &&
              isSelected && (
                <div className="flex items-center gap-1 text-gray-400">
                  <CircleCheck className="size-4 aspect-square text-green-500" />
                  <span className="font-bold text-green-500">ADDED</span>
                </div>
              )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarProvider>
  );
}
