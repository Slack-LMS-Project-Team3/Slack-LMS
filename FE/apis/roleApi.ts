const BASE = process.env.NEXT_PUBLIC_BASE;

import { fetchWithAuth } from "./authApi";
import { Member } from "./tabApi";

export interface Role {
  role_id: number;
  role_name: string;
  members?: Member[];
  non_members?: Member[];
  group_names?: string[];
  non_group_names?: string[];
  group_id?: number[];
  non_group_id?: number[];
  permissions?: string[];
  user_names?: string[];
}

// 역할 조회
export const getRoles = async (workspaceId: string): Promise<Role[]> => {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/${workspaceId}/roles`, {
      method: "GET",
      headers: { Accept: "application/json" },
  });

  if (res && res.ok) {
      return res.json();
  } else {
      throw new Error("역할 조회에 실패했습니다.");
  }
};

// 역할 생성
export const createRole = async (workspaceId: string, roleName: string, rolePermission: string[]) : Promise<boolean> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/roles`,
    {
      method: "POST",
      body: JSON.stringify({
        role_name: roleName,
        role_permission: rolePermission,
      }),
    },
  );
  if (res == null || !res.ok) throw new Error("역할 생성에 실패했습니다.");
  return res.json();
};

// 역할 수정
export const updateRole = async (workspaceId: string, roleId: string, rolePermission: string[]) : Promise<boolean> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/roles/${roleId}/edit`,
    {
      method: "PATCH",
      body: JSON.stringify({ role_permission: rolePermission }),
    },
  );
  if (res == null || !res.ok) throw new Error("역할 수정에 실패했습니다.");
  return res.json();
};

// 역할 삭제
export const deleteRole = async (workspaceId: string, roleId: string) : Promise<boolean> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/roles/${roleId}/delete`,
    {
      method: "DELETE",
    },
  );
  if (res == null || !res.ok) throw new Error("역할 삭제에 실패했습니다.");
  return res.json();
};

// 사용자 권한 조회
export const getUserPermissions = async (workspaceId: string, userId: string): Promise<string[]> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/users/${userId}/permissions`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  );
  if (res && res.ok) {
    const data = await res.json();
    return data.permissions || [];
  } else throw new Error("권한 조회에 실패했습니다.");
};
