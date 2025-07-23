import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

export interface workspace {
  workspace_id: number;
  workspace_name: string;
  min_tab_id: number;
}

const dummyWorkspace: workspace = {
  workspace_id: -1,
  workspace_name: "none",
  min_tab_id: -1,
};

/* 워크스페이스 정보 조회 */
export async function getWorkspaceName(
  workspaceId: string,
): Promise<workspace> {
  const res = await fetchWithAuth(
    `${BASE}/api/workspaces/${workspaceId}/title`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (res == null) {
    console.log("NOT REACH : getWorkspaceName");
    return dummyWorkspace;
  } else {
    if (!res.ok) {
      console.error(`워크스페이스 조회 실패: ${res.status}`);
      // 기본값 반환 (API 호출 실패)
      return {
        workspace_id: Number(workspaceId),
        workspace_name: "API 호출 실패",
        min_tab_id: -1,
      };
    }
    return res.json();
  }
}

/* 사용자가 참여한 워크스페이스 목록 조회 */
export async function getUserWorkspaces(
  userId: string,
  workspaceId: string,
): Promise<workspace[]> {
  const res = await fetchWithAuth(`${BASE}/api/workspaces/user/workspaces`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user_id: userId, workspace_id: workspaceId }),
  });

  if (res && res.ok) {
    const rawData = await res.json();

    // 백엔드 응답을 workspace 타입으로 변환
    const workspaces: workspace[] = rawData.map(
      (item: [number, string, number]) => ({
        workspace_id: item[0],
        workspace_name: item[1],
        min_tab_id: item[2],
      }),
    );
    console.log("getUserWorkspaces workspaces", workspaces);

    return workspaces;
  } else {
    throw new Error("워크스페이스 목록 조회에 실패했습니다.");
  }
}
