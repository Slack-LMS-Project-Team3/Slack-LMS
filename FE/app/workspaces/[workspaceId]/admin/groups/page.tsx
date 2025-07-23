"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GroupTable } from "@/components/administration/GroupTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateGroupDialog } from "@/components/administration/GroupActions/CreateGroupDialog";
import { useGroupStore } from "@/store/groupStore";
import { createGroupColumns } from "./columns";

export default function GroupTablePage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const [groupCount, setGroupCount] = useState<number>(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // 전역 상태에서 그룹 데이터 가져오기
  const { triggerRefresh, refreshTrigger } = useGroupStore();

  const handleGroupsLoaded = (count: number) => {
    setGroupCount(count);
  };

  return (
    <div className="flex flex-1 w-full h-full flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-md">{groupCount}개의 그룹</p>
        <div className="flex gap-2">
          <CreateGroupDialog
            isOpen={isCreateDialogOpen}
            setIsOpen={setIsCreateDialogOpen}
            onCreateSuccess={() => triggerRefresh(workspaceId)}
            trigger={
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />새 그룹 만들기
              </Button>
            }
          />
        </div>
      </div>
      <div className="flex flex-1 mx-1 overflow-y-auto scrollbar-thin">
        <GroupTable
          onGroupsLoaded={handleGroupsLoaded}
          key={refreshTrigger?.[workspaceId] || 0}
          columns={createGroupColumns(() => triggerRefresh(workspaceId))}
        />
      </div>
    </div>
  );
}
