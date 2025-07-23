import { create } from "zustand";
import { getUserPermissions } from "@/apis/roleApi";
import { useMyUserStore } from "./myUserStore";

interface MyPermissionsState {
    // 워크스페이스별 권한 관리 (key: workspaceId, value: permissions)
    workspacePermissions: Record<string, string[]>;
    
    // 특정 워크스페이스의 권한 설정
    setWorkspacePermissions: (workspaceId: string, permissions: string[]) => void;
    
    // 권한 확인
    hasPermission: (workspaceId: string, permission: string) => boolean;
    
    // 권한 정보 가져오기
    fetchPermissions: (workspaceId: string) => Promise<void>;    
}

export const useMyPermissionsStore = create<MyPermissionsState>((set, get) => ({
    workspacePermissions: {},
    
    setWorkspacePermissions: (workspaceId, permissions) => set((state) => ({
        workspacePermissions: {
            ...state.workspacePermissions,
            [workspaceId]: permissions
        }
    })),
    
    hasPermission: (workspaceId, permission) => {
        const { workspacePermissions } = get();
        const permissions = workspacePermissions[workspaceId] || [];        
        return permissions.includes(permission);
    },
    
    fetchPermissions: async (workspaceId) => {
        try {
            // 이미 권한 정보가 있는지 확인
            const { workspacePermissions } = get();
            if (workspacePermissions[workspaceId] !== undefined) {                
                return;
            }
            
            // myUserStore에서 userId 가져오기
            const userId = useMyUserStore.getState().userId;            
            if (!userId) return;
            
            // 권한 정보 API 호출
            const permissions = await getUserPermissions(workspaceId, userId);
            
            // 권한 정보 저장
            get().setWorkspacePermissions(workspaceId, permissions);
            
        } catch (error) {            
            get().setWorkspacePermissions(workspaceId, []);
        }
    }    
}));
