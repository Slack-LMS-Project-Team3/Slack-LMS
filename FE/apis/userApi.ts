import { fetchWithAuth } from "./authApi";
import { Profile } from "./profileApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

/* 워크스페이스 유저 조회 */
export async function getUsers(workspaceId: string): Promise<Profile[]> {  

    const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/users`, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (res && res.ok) {
        return res.json();
    } else {
        throw new Error("유저 조회에 실패했습니다.");
    }    
}

/* 워크스페이스 유저 추가 */
export async function addUser(workspaceId: string, payload: Partial<Profile>): Promise<boolean> {  

  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/users/single`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res && res.ok) {
      return true;
  }
  return false;
}

/* 워크스페이스 유저 역할 수정 */
export async function updateUserRole(workspaceId: string, userId: string, role_id: string): Promise<boolean> { 

  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({role_id: role_id}),
  });

  if (res && res.ok) {
      return true;
  }
  return false;
} 

/* 워크스페이스 유저 삭제 */
export async function deleteUser(workspaceId: string, userId: string): Promise<boolean> {  

  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/users/${userId}/delete`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },    
  });

  if (res && res.ok) {
      return true;
  }
  return false;
}

export async function searchUsers(workspaceId: string, keyword: string): Promise<Profile[]> {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/members/search?q=${encodeURIComponent(keyword)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  );

  if (res && res.ok) {
    return res.json();
  }
  return [];
}


