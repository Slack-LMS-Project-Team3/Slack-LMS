import { create } from "zustand";
import { Profile } from "@/apis/profileApi";
import { getUsers } from "@/apis/userApi";

interface UserState {
  users: Record<string, Profile[]>; // key: workspaceId, value: users
  refreshTrigger: Record<string, number>;
  
  fetchUsers: (workspaceId: string, forceRefresh?: boolean) => Promise<Profile[]>;
  triggerRefresh: (workspaceId: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: {},
  refreshTrigger: {},
  
  fetchUsers: async (workspaceId: string, forceRefresh: boolean = false) => {
    try {
      // 이미 데이터가 있는지 확인 (강제 새로고침이 아닌 경우에만)
      const currentUsers = get().users[workspaceId];
      if (!forceRefresh && currentUsers && currentUsers.length > 0) {
        return currentUsers; // 강제 새로고침이 아니고 이미 데이터가 있으면 그대로 반환
      }
      
      // 데이터가 없으면 API 호출
      const usersData = await getUsers(workspaceId);           
      set((state) => ({
        users: {
          ...state.users,
          [workspaceId]: usersData,
        },
      }));      
      return usersData;

    } catch (error) {                
      console.error('사용자 데이터 가져오기 오류:', error);
      return [];
    }
  },
  
  triggerRefresh: (workspaceId: string) => {
    set((state) => ({
      refreshTrigger: {
        ...state.refreshTrigger,
        [workspaceId]: (state.refreshTrigger[workspaceId] || 0) + 1,
      },
    }));
    
    // 해당 워크스페이스의 데이터 강제로 다시 불러오기
    get().fetchUsers(workspaceId, true);
  },
}));
