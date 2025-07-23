"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  PanelOnCollapse,
  ImperativePanelHandle,
} from "@/components/ui/resizable";
import { useProfileStore } from "@/store/profileStore";
import { useRouter } from "next/navigation";

export default function WorkspaceIdLayout({
  children,
  sidebar,
  profile,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  profile: React.ReactNode;
}) {
  const router = useRouter();
  const profilePanelRef = useRef<ImperativePanelHandle>(null);

  // 패널 크기 상태 관리
  const [sidebarSize, setSidebarSize] = useState(20);
  const [profileSize, setProfileSize] = useState(20);

  // 프로필 표시를 위한 state 구독
  const { isOpen, setClose } = useProfileStore();

  // children 크기 동적 계산: 100 - sidebar - (profile이 열려있으면 profile, 아니면 0)
  const childrenSize = 100 - sidebarSize - (isOpen ? profileSize : 0);

  // 진입 시 Access 토큰 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);

  // 프로필 패널 제어
  useEffect(() => {
    const panel = profilePanelRef.current;
    if (panel) {
      if (isOpen) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  }, [isOpen]);

  const onCollapse: PanelOnCollapse = () => {
    setClose();
  };

  return (
    <div className="flex w-full min-h-0">
      <div className="flex flex-row min-h-0 w-lvw">
        <ResizablePanelGroup key="workspace-layout-group" direction="horizontal">
          <ResizablePanel 
            defaultSize={sidebarSize} 
            minSize={15} 
            maxSize={30}
            onResize={(size) => setSidebarSize(size)}
          >
            <aside className="h-full w-full">{sidebar}</aside>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel 
            defaultSize={childrenSize} 
            minSize={30}
          >
            <main className="h-full w-full">{children}</main>
          </ResizablePanel>
          {isOpen && (
            <>
              <ResizableHandle />
              <ResizablePanel
                ref={profilePanelRef}
                collapsible
                onCollapse={onCollapse}
                defaultSize={profileSize}
                collapsedSize={0}
                minSize={15}
                maxSize={30}
                onResize={(size) => setProfileSize(size)}
                className="shadow-lg"
              >
                <aside className="h-full w-full">{profile}</aside>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
