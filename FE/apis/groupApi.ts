const BASE = process.env.NEXT_PUBLIC_BASE;

import { fetchWithAuth } from "./authApi";
import { Member } from "./tabApi";

export interface Group {
  group_id?: number;
  group_name?: string;
  members?: Member[];
  non_members?: Member[];
  group_members_count?: number;  
  user_names?: string[];
  role_id?: number;
  role_name?: string;  
}

export interface InviteGroups {
  successCnt: number;
  group_names: string[];
}

// 그룹 조회
export const getGroups = async (workspaceId: string): Promise<Group[]> => {
    const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/groups`, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (res && res.ok) {
        return res.json();
    } else {
        throw new Error("그룹 조회에 실패했습니다.");
    }

    /////////////////// 일단 더미 데이터 반환/////////////////////////
    // return getDummyGroups(workspaceId);
}

// 더미 그룹 데이터 생성 함수
function getDummyGroups(workspaceId: string): Group[] {
  const workspaceIdNum = parseInt(workspaceId) || 1;
  
  // 더미 멤버 생성
  const dummyMembers: Member[] = [
    {
      user_id: "user1",
      nickname: "김관리자",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
      role_id: 1,
      role_name: "admin",
      group_name: ["개발팀", "기획팀"]
    },
    {
      user_id: "user2",
      nickname: "이사용자",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka",
      role_id: 2,
      role_name: "member",
      group_name: ["개발팀"]
    },
    {
      user_id: "user3",
      nickname: "박멤버",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dusty",
      role_id: 2,
      role_name: "member",
      group_name: ["디자인팀"]
    },
    {
      user_id: "user4",
      nickname: "최사용자",
      image: null,
      role_id: 2,
      role_name: "member",
      group_name: []
    },
    {
      user_id: "user5",
      nickname: "정개발자",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Charlie",
      role_id: 2,
      role_name: "member",
      group_name: ["개발팀"]
    },
    {
      user_id: "user6",
      nickname: "조디자이너",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mia",
      role_id: 2,
      role_name: "member",
      group_name: ["디자인팀"]
    },
    {
      user_id: "user7",
      nickname: "임기획자",
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophie",
      role_id: 2,
      role_name: "member",
      group_name: ["기획팀"]
    }
  ];
  
  const dummyGroups: Group[] = [
    {
      group_id: 1,
      group_name: "개발팀",
      members: [dummyMembers[0], dummyMembers[1], dummyMembers[4]],
      non_members: [dummyMembers[2], dummyMembers[3], dummyMembers[5], dummyMembers[6]],
      role_id: 1,
      role_name: "admin"
    },
    {
      group_id: 2,
      group_name: "디자인팀",
      members: [dummyMembers[2], dummyMembers[5]],
      non_members: [dummyMembers[0], dummyMembers[1], dummyMembers[3], dummyMembers[4], dummyMembers[6]],
      role_name: "member"
    },
    {
      group_id: 3,
      group_name: "기획팀",
      members: [dummyMembers[0], dummyMembers[6]],
      non_members: [dummyMembers[1], dummyMembers[2], dummyMembers[3], dummyMembers[4], dummyMembers[5]],
      role_name: "admin"
    },
    {
      group_id: 4,
      group_name: "마케팅팀",
      members: [],
      non_members: [dummyMembers[0], dummyMembers[1], dummyMembers[2], dummyMembers[3], dummyMembers[4], dummyMembers[5], dummyMembers[6]],
      role_name: "member"
    },
    {
      group_id: 5,
      group_name: "인사팀",
      members: [],
      non_members: [dummyMembers[0], dummyMembers[1], dummyMembers[2], dummyMembers[3], dummyMembers[4], dummyMembers[5], dummyMembers[6]],
      role_name: "member"
    }
  ];
  
  return dummyGroups;
}
  

// 그룹 생성
export const createGroup = async (workspaceId: string, groupName: string): Promise<boolean> => {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name: groupName }),
  });

  if (res && res.ok) {
      return true;
  } else return false;
}

// 그룹명 변경
export const updateGroupName = async (workspaceId: string, groupId: string, groupName: string): Promise<boolean> => {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/groups/${groupId}/title`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_name: groupName }),
  });

  if (res && res.ok) {
      return true;
  } else return false;
}

// 그룹 역할 변경
export const updateGroupRole = async (workspaceId: string, groupId: string, roleId: string): Promise<boolean> => {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/groups/${groupId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role_id: roleId }),
  });

  if (res && res.ok) {
      return true;
  } else return false;  
}

// 그룹 삭제
export const deleteGroup = async (workspaceId: string, groupId: string): Promise<boolean> => {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/groups/${groupId}`, {
      method: "PATCH",
  });

  if (res && res.ok) {
      return true;
  } else return false;
}
