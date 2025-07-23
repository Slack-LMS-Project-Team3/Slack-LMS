import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

interface User {
  email: string;
  name: string;
  // role: string;
  group?: string;
  blog?: string;
  github?: string;
}

// FE/apis/excelApi.ts
export async function getWorkspaceColumns() {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/1/userinfo`, {
    method: "GET",
  });

  if (res == null) {
  } else {
    if (!res.ok) throw new Error("워크스페이스 컬럼 조회 실패");
    return res.json();
  }
}

// users 테이블에 user 생성
export async function createUsers(
  users: User[],
  groups: string[],
  workspaceId: string | number,
) {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/users`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users, groups }),
    },
  );

  if (res == null) {
    throw new Error("인증 실패");
  }
  if (!res.ok) throw new Error("유저 생성 실패");
  return res.json();
}
