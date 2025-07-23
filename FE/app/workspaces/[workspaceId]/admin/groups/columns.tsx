"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Group } from "@/apis/groupApi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActionMenu } from "@/components/administration/GroupActions/ActionMenu";

export const createGroupColumns = (
  onRefreshNeeded?: () => void,
): ColumnDef<Group>[] => [
  {
    id: "actions",
    header: () => <div className="text-left pl-2">Actions</div>,
    size: 1,
    cell: ({ row }) => {
      const group = row.original;

      return (
        <div className="flex justify-start pl-2 w-full overflow-hidden">
          <ActionMenu
            group={group}
            onRefresh={onRefreshNeeded || (() => {})} // 페이지에서 전달받은 새로고침 함수 사용
          />
        </div>
      );
    },
  },
  {
    accessorKey: "group_name",
    header: "Group",
    size: 1.5,
    cell: ({ row }) => {
      const group_name = row.getValue("group_name") as string;
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row truncate text-start w-full">
              {group_name}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={5}
            className="max-w-[300px] whitespace-normal break-words"
          >
            <p>{group_name}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "role_name",
    header: "Role",
    size: 1.5,
    cell: ({ row }) => {
      const role = row.getValue("role_name") as string;

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row truncate text-start w-full">
              {role}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={5}
            className="max-w-[300px] whitespace-normal break-words"
          >
            <p>{role}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "user_names",
    id: "members_count",
    header: "Members Count",
    size: 1.5,
    cell: ({ row }) => {
      // user_names 필드에 직접 접근
      const user_names = (row.original.user_names as string[]) || [];
      const membersCount = user_names ? user_names.length : 0;

      return (
        <div className="flex flex-row truncate pl-10 w-full">
          {membersCount}
        </div>
      );
    },
  },
  {
    accessorKey: "user_names",
    id: "members_list",
    header: "Members",
    size: 4.5,
    cell: ({ row }) => {
      // 디버깅용 로그 추가
      console.log("Row data:", row.original);

      // user_names 필드에 직접 접근
      const user_names = (row.original.user_names as string[]) || [];

      // 데이터가 없으면 빈 배열 사용
      if (!user_names || user_names.length === 0) {
        return <div className="text-gray-400">회원 없음</div>;
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row truncate justify-start w-full">
              {user_names.join(", ")}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={5}
            className="max-w-[300px] whitespace-normal break-words"
          >
            <div className="flex flex-wrap gap-1">
              <span>{user_names.join(", ")}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];
