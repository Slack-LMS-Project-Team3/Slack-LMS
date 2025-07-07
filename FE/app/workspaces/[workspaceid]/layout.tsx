"use client";

import React from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import { useChannelStore } from "@/store/channelStore";
import { useProfileStore } from "@/store/profileStore";
import { useRouter } from "next/navigation";

export default function WorkspaceLayout({
  children,
  channel,
  sidebar,
  profile,
}: {
  children: React.ReactNode;
  channel: React.ReactNode;
  sidebar: React.ReactElement<{ width: number }>;
  profile: React.ReactElement<{ width: number }>;
}) {
  /////////////////////// 추가 ///////////////////////////
  const router = useRouter();
  /////////////////////// 추가 ///////////////////////////

  const [sidebarWidth, setSidebarWidth] = useState(20);
  const [currentSidebarWidth, setCurrentSidebarWidth] = useState(20);
  const [profileWidth, setProfileWidth] = useState(15);

  // 채널 너비 추적을 위한 state 구독
  const { channelWidth, setChannelWidth } = useChannelStore();

  // 프로필 표시를 위한 state 구독
  const { isOpen } = useProfileStore();

  // 채널 너비 갱신 (사이드바 너비는 유지)
  /////////////////////// 추가 ///////////////////////////
  useEffect(() => {
    // 로컬 스토리지에서 액세스 토큰 꺼내서 확인하고,
    const accessToken = localStorage.getItem("access_token");

    // 없으면 로그인 페이지로 ㄱㄱ해야지.
    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);
  /////////////////////// 추가 ///////////////////////////

  useEffect(() => {
    if (isOpen) {
      setChannelWidth(100 - currentSidebarWidth - profileWidth);
    } else {
      setChannelWidth(100 - currentSidebarWidth);
    }
  }, [isOpen, currentSidebarWidth, profileWidth, setChannelWidth]);

  // 사이드바 너비가 변경 시 defaultSize 업데이트
  useEffect(() => {
    setCurrentSidebarWidth(sidebarWidth);
  }, [sidebarWidth]);

  // 패널 크기 변경 시 상태 업데이트
  const handleLayout = (sizes: number[]) => {
    setSidebarWidth(sizes[0]);
    setChannelWidth(sizes[1]);
    if (isOpen) {
      setProfileWidth(sizes[2]);
    }
  };

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex flex-1 flex-row min-h-0 w-full">
        <ResizablePanelGroup
          key="workspace-layout-group"
          direction="horizontal"
          className="flex-1 min-h-0"
          onLayout={handleLayout}
        >
          <ResizablePanel defaultSize={currentSidebarWidth} minSize={10} maxSize={30}>
            {/* 사이드바 영역: 너비값을 함께 전달 */}
            {React.cloneElement(sidebar, { width: sidebarWidth })}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={channelWidth} minSize={30} maxSize={90}>
            <div className="flex-1 min-w-0 h-full flex flex-col overflow-x-auto break-all">
              {/* 채널 영역*/}
              {channel}
            </div>
          </ResizablePanel>
          {/* 프로필이 열렸을 때만 렌더링 */}
          {isOpen && (
            <>
              <ResizableHandle />
              <ResizablePanel
                defaultSize={profileWidth}
                minSize={15}
                maxSize={30}
                style={{ boxShadow: "-8px 0 16px rgba(0, 0, 0, 0.1)" }}
              >
                {/* 프로필 영역 */}
                {/* 사이드바 영역: 너비값을 함께 전달 */}
                {React.isValidElement(profile) ? React.cloneElement(profile, { width: profileWidth }) : profile}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
