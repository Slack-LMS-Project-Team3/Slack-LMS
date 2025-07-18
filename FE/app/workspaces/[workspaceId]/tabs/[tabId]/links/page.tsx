"use client";

import LinkTable from "@/components/link/linkTable";
import AddLinkButton from "@/components/link/addLinkButton";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const tabId = params.tabId as string;
  const [reload, setReload] = useState(0);

  return (
    <div className="px-30 pt-8 bg-gray-100 h-full flex flex-col">
      <div className="flex flex-row items-center justify-between mb-5 pl-4">
        <div className="text-xl">링크</div>
        <AddLinkButton
          workspaceId={workspaceId}
          tabId={tabId}
          onCreated={() => setReload((r) => r + 1)}
        />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
        <LinkTable workspaceId={workspaceId} tabId={tabId} reload={reload} />
      </div>
    </div>
  );
}
