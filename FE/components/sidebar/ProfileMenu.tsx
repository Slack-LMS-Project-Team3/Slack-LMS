"use client";

import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserRoundCog, LogOut, Settings } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useProfileStore } from "@/store/profileStore";
import { useMyUserStore } from "@/store/myUserStore";
import { useParams } from "next/navigation";

interface ProfileMenuProps {
  logout: () => void;
  router: AppRouterInstance;
}

export function ProfileMenu({ logout, router }: ProfileMenuProps) {
  // URL에서 workspaceId 추출
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const openProfile = useProfileStore((s) => s.openWithId);
  const myUserId = useMyUserStore((s) => s.userId);

  return (
    <div className="flex flex-1 flex-col">
      <PopoverClose>
        <Button
          variant="ghost"
          className="flex flex-1 items-center justify-start px-4 py-4 rounded-none text-gray-200 text-lg"
          onClick={() => openProfile(myUserId!)}
        >
          <UserRoundCog />
          프로필
        </Button>
      </PopoverClose>
      <hr className="border-gray-500" />
      <PopoverClose>
        <Button
          variant="ghost"
          className="flex flex-1 items-center justify-start px-4 py-4 rounded-none text-gray-200 text-lg"
          onClick={() => {
            router.push(`/workspaces/${workspaceId}/admin/users`);
          }}
        >
          <Settings />
          관리 메뉴
        </Button>
      </PopoverClose>
      <hr className="border-gray-500" />
      <PopoverClose>
        <Button
          onClick={() => {
            logout();
            window.alert("로그아웃 되었습니다.");
            router.push("/");
          }}
          variant="ghost"
          className="flex flex-1 items-center justify-start px-4 py-4 rounded-none text-gray-200 text-lg"
        >
          <LogOut />
          로그아웃
        </Button>
      </PopoverClose>
    </div>
  );
}
