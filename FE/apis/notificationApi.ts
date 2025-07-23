import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;


/* sse 알림 보내기  */
export async function alarmSSE(workspaceId: string, tabId: string, type: string ): Promise<any> {
  const res = await fetchWithAuth(`${BASE}/api/sse/notifications/${workspaceId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ 
        type: type,
        tab_id: tabId,
    }),
    },
  );
  if (res == null || !res.ok) throw new Error("SSE 송신 실패");
  return res.json();
}

/* 웹푸시 보내기  */
export async function webPush (workspaceId: string, tabId: string, content: string ): Promise<any> {
  console.log("in webPush")
  await fetchWithAuth(`${BASE}/api/notifications/${workspaceId}/${tabId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ 
        type: "new_message",
        content: content
    }),
    },
  );
  console.log("end webPush")
}