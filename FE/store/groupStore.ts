import { create } from "zustand";
import { Group } from "@/apis/groupApi";
import { getGroups } from "@/apis/groupApi";

interface GroupState {
  groups: Record<string, Group[]>; // key: workspaceId, value: groups
  refreshTrigger: Record<string, number>;

  fetchGroups: (workspaceId: string, forceRefresh?: boolean) => Promise<Group[]>;
  triggerRefresh: (workspaceId: string) => void;
}

export const useGroupStore = create<GroupState>((set, get) => ({
  groups: {},
  refreshTrigger: {},

  fetchGroups: async (workspaceId: string, forceRefresh: boolean = false) => {
    try {
      // 이미 데이터가 있는지 확인 (강제 새로고침이 아닌 경우에만)
      const currentGroups = get().groups[workspaceId];
      if (!forceRefresh && currentGroups && currentGroups.length > 0) {
        return currentGroups; // 강제 새로고침이 아니고 이미 데이터가 있으면 그대로 반환
      }
      
      const groups = await getGroups(workspaceId);
      console.log("API 응답 데이터:", groups);
      
      // user_names 필드가 없는 경우 빈 배열로 초기화
      const processedGroups = groups.map(group => ({
        ...group,
        user_names: group.user_names || []
      }));
      
      console.log("처리된 그룹 데이터:", processedGroups);
      
      // 상태 업데이트
      set((state) => ({
        groups: {
          ...state.groups,
          [workspaceId]: processedGroups,
        },
      }));
      
      return processedGroups;
    } catch (error) {
      console.error("그룹을 불러오는데 실패했습니다:", error);
      return [];
    }
  },

  triggerRefresh: (workspaceId: string) => {
    set((state) => ({
      refreshTrigger: {
        ...state.refreshTrigger,
        [workspaceId]: (state.refreshTrigger[workspaceId] || 0) + 1
      }
    }));
    
    // 해당 워크스페이스의 데이터 강제로 다시 불러오기
    get().fetchGroups(workspaceId, true);
  }
}));
