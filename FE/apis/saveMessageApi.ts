import { fetchWithAuth } from "./authApi";

const BASE = process.env.NEXT_PUBLIC_BASE;

export interface SaveMessage {
    save_message_id: string
    content: string
    created_at?: string
}

/* 저장 메시지 조회 */
export async function getSaveMessages(workspaceId: string, userId: string): Promise<SaveMessage[]> {
    const res = await fetchWithAuth(`${BASE}/api/save-messages?workspace_id=${workspaceId}`, {
        method: "GET",
        headers: { Accept: "application/json" },
    });

    if (res && res.ok) {
        const data = await res.json();
        return data.map((item: any) => ({
            ...item,
            save_message_id: String(item.save_message_id)
        })) as SaveMessage[];
    } else {
        throw new Error("저장 메시지 조회에 실패했습니다.");
    }
}

/* 저장 메시지 추가 */
export async function addSaveMessage(workspaceId: string, userId: string, content: string): Promise<SaveMessage> {
  const res = await fetchWithAuth(`${BASE}/api/save-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      workspace_id: workspaceId,
      user_id: userId,
      content: content
    }),
  });

    if (res && res.ok) {
        const item = await res.json();
        return {
            ...item,
            save_message_id: String(item.save_message_id)
        } as SaveMessage;
    } else {
        throw new Error("저장 메시지 조회에 실패했습니다.");
    }
}

/* 저장 메시지 삭제 */
export async function deleteSaveMessage(workspaceId: string, saveMessageId: string, userId: string): Promise<boolean> {
  const res = await fetchWithAuth(`${BASE}/api/save-messages/${saveMessageId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
  });

  if (res && res.ok) {
      return true;
  }
  return false;
}