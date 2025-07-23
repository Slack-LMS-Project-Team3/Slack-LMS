import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

export interface Profile {
  user_id: string;
  workspace_id: number | null;
  nickname: string;
  email: string;    
  image?: string | null;
  role_id?: string | null;
  role_name?: string | null;
  group_id?: string[] | null;
  group_name?: string[] | null;  
  github?: string | null;
  blog?: string | null;
}

/* 프로필 조회 */
export async function getProfile(workspaceId: string, targetId: string): Promise<Profile> {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/members/${targetId}/profile`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  );    
  if (res == null || !res.ok) throw new Error("프로필 조회에 실패했습니다.");
  return res.json();
}

/* 프로필 부분 수정 (PATCH) */
export async function patchProfile(workspaceId: string, userId: string, payload: Partial<Profile>): Promise<Profile> { 
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/members/${userId}/profile`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (res == null || !res.ok) throw new Error("프로필 수정에 실패했습니다.");
  return res.json();
}
