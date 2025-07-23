import { create } from "zustand";
import { getTabInfo, Tab } from "@/apis/tabApi";

// 사이드바의 탭 목록 새로고침 상태 관리
interface TabState {
  needsRefresh: boolean;
  refreshTabs: () => void;
  resetRefresh: () => void;
}

// 탭 헤더의 타이틀, 탭 인원, TipTap의 PlaceHolder에 표시할 정보 관리
interface TabInfoState {
  tabInfoCache: Record<string, Tab>;
  loadingTabs: Record<string, boolean>; // 레이스 컨디션 방지용 장치 (일종의 lock)
  fetchTabInfo: (
    workspaceId: string,
    tabId: string,
    options?: { force?: boolean }
  ) => Promise<void>;
}

export const useTabStore = create<TabState>((set) => ({
  needsRefresh: false,
  refreshTabs: () => set({ needsRefresh: true }),
  resetRefresh: () => set({ needsRefresh: false }),
}));

export const useTabInfoStore = create<TabInfoState>((set, get) => ({
  tabInfoCache: {},
  loadingTabs: {},
  fetchTabInfo: async (workspaceId, tabId, options) => {
    const { tabInfoCache, loadingTabs } = get();
    const forceFetch = options?.force || false;

    // 캐시에 있거나, 이미 로딩 중이면 실행하지 않음 (강제 새로고침이 아닐 경우)
    if (!forceFetch && (tabInfoCache[tabId] || loadingTabs[tabId])) {
      return;
    }

    // 로딩 시작
    set((state) => ({ loadingTabs: { ...state.loadingTabs, [tabId]: true }}));

    try {
      const info = await getTabInfo(workspaceId, tabId);
      // TabInfo 데이터 저장
      set((state) => ({
        tabInfoCache: { ...state.tabInfoCache, [tabId]: info },
      }));
    } catch (error) {
      console.error("탭 정보 조회 실패:", error);
    } finally {
      // 로딩 종료
      set((state) => ({ loadingTabs: { ...state.loadingTabs, [tabId]: false } }));
    }
  },
}));
