import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

export interface Link {
  link_id: number;
  tab_id: number;
  link_url: string;
  link_favicon?: string;
  link_name: string;
}

// 링크 조회
export const getLinks = async (
  workspaceId: string,
  tabId: string,
): Promise<Link[]> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/links`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );
  if (res == null) throw new Error("조회된 링크가 없습니다");
  else if (!res.ok) throw new Error("링크 조회에 실패했습니다.");
  return res.json();
};

// 링크 생성
export const createLink = async (
  workspaceId: string,
  tabId: string,
  linkName: string,
  linkUrl: string,
): Promise<boolean> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/links`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link_name: linkName,
        link_url: linkUrl,
      }),
    },
  );
  if (res && res.ok) {
    return true;
  }
  return false;
};

// 링크 삭제
export const deleteLink = async (
  workspaceId: string,
  tabId: string,
  linkId: string,
): Promise<boolean> => {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/links`,
    {
      method: "PATCH",
      body: JSON.stringify({ link_id: linkId }),
    },
  );
  if (res && res.ok) {
    return true;
  }
  return false;
};
