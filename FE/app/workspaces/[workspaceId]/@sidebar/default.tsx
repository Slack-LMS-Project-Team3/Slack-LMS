"use client";

import { useParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useSectionStore } from "@/store/sidebarStore";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import { useTabStore } from "@/store/tabStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ProfileMenu } from "@/components/sidebar/ProfileMenu";
import { DialogModal } from "@/components/modal/DialogModal";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Megaphone, Landmark, Users, Mail, School, ChevronRightIcon, ChevronDownIcon, Plus } from "lucide-react";
import { logout } from "@/apis/logout";
import { createTab, getTabList, Tab, checkTabName } from "@/apis/tabApi";
import { getWorkspaceName, workspace } from "@/apis/workspaceApi";
import { getProfile, Profile } from "@/apis/profileApi";

type SidebarProps = { width: number };

export default function AppSidebar({ width }: SidebarProps) {
  // URL에서 workspaceId, tabId 추출
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const tabId = params.tabId as string;

  // 워크스페이스 이름 상태 관리
  const [workspaceInfo, setWorkspaceInfo] = useState<workspace | null>(null);

  // 참여중인 탭 리스트 상태 관리
  const [tabList, setTabList] = useState<Tab[]>([]);

  // 프로필 상태 관리
  const [profile, setProfile] = useState<Profile | null>(null);

  // 탭 생성 모달 상태 관리 (열림/닫힘, 섹션 ID)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 탭 생성 모달 상태 관리 (열림/닫힘, 섹션 ID)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  // 섹션 열림/닫힘 상태 관리 (하나의 상태에 섹션을 개별적으로 관리)
  const { openSections, toggleSection } = useSectionStore();

  // 탭 생성 시 탭명 상태 관리
  const [tabName, setTabName] = useState("");

  // 탭 목록 새로고침 필요 상태 관리
  const { needsRefresh, resetRefresh } = useTabStore();

  // 탭 생성 모달 종료 핸들러 (작성 중인 탭 이름 초기화)
  const handleModalOpenChange = (isOpen: boolean, sectionId: string | null = null) => {
    setIsModalOpen(isOpen);
    setSelectedSectionId(isOpen ? sectionId : null);
    if (!isOpen) {
      setTabName("");
    }
  };  

  // 진입 시 워크스페이스, 탭, 프로필 정보 획득
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const userId = jwtDecode<{ user_id: string }>(token).user_id;

          // 모든 데이터 요청 병렬로 시작
          const promises = [getWorkspaceName(workspaceId), getTabList(workspaceId), getProfile(workspaceId, userId)];

          const [workspace, tabs, profileData] = await Promise.all(promises);

          setWorkspaceInfo(workspace as workspace);
          setTabList(tabs as Tab[]);
          setProfile(profileData as Profile);
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchData();

    if (needsRefresh) {
      resetRefresh(); // 상태 초기화
    }
  }, [workspaceId, needsRefresh]);

  // 탭 추가 시 재 렌더링 후 해당 탭으로 이동
  async function handleAddTab(sectionId: string, tabName: string) {
    try {
      const availableTabName = await checkTabName(workspaceId, sectionId, tabName);
      if (!availableTabName) {
        alert("이미 존재하는 탭명입니다.");
        return;
      }
      const newTab = await createTab(workspaceId, sectionId, tabName);
      setTabList([...tabList, newTab]);
      setIsModalOpen(false);
      setTabName("");
      router.push(`/workspaces/${workspaceId}/tabs/${newTab.tab_id}`);
    } catch (error) {
      console.error(error);
      alert("탭 생성에 실패했습니다.");
    }
  }

  // 섹션 id별 섹션명과 아이콘
  const sectionType = [
    { id: "1", label: "Announcements", icon: Megaphone },
    { id: "2", label: "Courses", icon: Landmark },
    { id: "3", label: "Channels", icon: Users },
    { id: "4", label: "Direct Messages", icon: Mail },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="flex flex-col h-full w-full p-1 bg-gray-800 text-gray-400">
        {/* 사이드바 헤더 (mvp에서는 단순 정보 표시) */}
        <SidebarHeader>
          <div className="h-13 p-2">
            <div className="flex flex-row items-center w-full gap-2">
              {/* 아이콘 */}
              <div className="bg-blue-600 rounded-lg p-2 flex items-center justify-center">
                <School size={20} className="text-white" />
              </div>
              {/* 워크스페이스 정보 */}
              <div className="flex flex-col overflow-hidden" style={{ width }}>
                <span className="text-md font-bold text-gray-200 truncate">{workspaceInfo?.workspace_name}</span>
                <span className="text-xs text-gray-400 truncate">Welcome to {workspaceInfo?.workspace_name}</span>
              </div>
            </div>
          </div>
        </SidebarHeader>
        {/* 사이드바 컨텐츠 */}
        <SidebarContent className="flex flex-1 flex-col overflow-y-auto scrollbar-thin">
          {sectionType.map((section) => (
            <SidebarGroup key={section.id} className="flex flex-col flex-none">
              <SidebarGroupLabel className="flex flex-row items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex size-4 p-3 text-gray-200"
                  onClick={() => toggleSection(section.id)}
                >
                  {openSections[section.id] ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </Button>
                {React.createElement(section.icon, { size: 22, className: "text-gray-200" })}
                <span className="text-m font-bold text-gray-200 truncate">{section.label}</span>
              </SidebarGroupLabel>
              {openSections[section.id] && (
                <SidebarGroupContent>
                  <SidebarMenu className="flex flex-col pl-5 gap-0">
                    {tabList
                      .filter((tab) => tab.section_id === Number(section.id))
                      .map((tab) => (
                        <SidebarMenuItem key={tab.tab_id}>
                          <SidebarMenuButton
                            isActive={tab.tab_id.toString() === tabId}
                            className="flex items-center px-2 py-1 space-x-2 rounded-sm flex-1 min-w-0"
                            onClick={() => router.push(`/workspaces/${workspaceInfo?.workspace_id}/tabs/${tab.tab_id}`)}
                          >
                            <span className="truncate">{tab.tab_name}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    {/* 탭 추가 모달 팝업 내용 */}
                    <DialogModal
                      title="Create a Tab"
                      defaultOpen={false}
                      open={isModalOpen}
                      onOpenChange={(isOpen) => handleModalOpenChange(isOpen, section.id.toString())}
                      trigger={
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={false}
                            className="flex items-center px-2 py-1 space-x-2 flex-1 min-w-0"
                          >
                            <span className="flex flex-row gap-2 items-center truncate">
                              <Plus size={18} className="bg-gray-700 rounded-sm" />
                              Add Tab
                            </span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      }
                    >
                      {/* DialogModal 내용: 프로필 편집 폼 */}
                      <div className="flex flex-col gap-2">
                        <h1>Name</h1>
                        <Input
                          type="text"
                          placeholder="Please enter the name of the tab."
                          value={tabName}
                          onChange={(e) => setTabName(e.target.value)}
                        />
                        <div className="flex flex-1 flex-row mt-6 gap-3">
                          <Button
                            variant="secondary"
                            onClick={() => handleModalOpenChange(false)}
                            className="flex flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => selectedSectionId && handleAddTab(selectedSectionId, tabName)}
                            disabled={tabName.trim() === ""}
                            className="flex flex-1"
                          >
                            Create
                          </Button>
                        </div>
                      </div>
                    </DialogModal>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>
        {/* 사이드바 푸터 */}
        <SidebarFooter>
          {/* 프로필 메뉴 호출 */}
          <Popover>
            <PopoverTrigger asChild>
              <SidebarMenuButton className="h-13 p-2">
                <div className="flex flex-row items-center w-full gap-2">
                  {/* 프로필 이미지 */}
                  <img
                    src={profile?.image || "/user_default.png"}
                    alt="profile_image"
                    className="w-[34px] aspect-square bg-gray-400 rounded-lg overflow-hidden"
                  />
                  {/* 사용자 정보 */}
                  <div className="flex flex-col overflow-hidden" style={{ width }}>
                    <span className="text-md font-bold text-gray-200 truncate">{profile?.nickname}</span>
                    <span className="text-xs text-gray-400 truncate">{profile?.email}</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={12} className="flex overflow-hidden bg-gray-700 rounded-md w-48">
              <ProfileMenu logout={logout} router={router} />
            </PopoverContent>
          </Popover>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
