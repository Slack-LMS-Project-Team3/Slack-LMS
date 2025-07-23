import { create } from "zustand";

// api 호출 함수와 savemessage 타입
import {
  getSaveMessages,
  addSaveMessage,
  deleteSaveMessage,
} from "@/apis/saveMessageApi";
import { SaveMessage } from "@/apis/saveMessageApi";

// 스토어에서 관리할 상태의 타입 정의
interface SaveMessagesState {
  items: SaveMessage[]; // 저장된 메시지 목록
  loading: boolean; // API 요청 로딩 상태 표시
  error: string | null; // 에러 메시지 저장

  fetch: (workspaceId: string, userId: string) => Promise<void>; // 메시지 목록 조회 함수
  add: (workspaceId: string, userId: string, content: string) => Promise<void>; // 메시지 추가 함수
  remove: (workspaceId: string, userId: string, id: string) => Promise<void>; // 메시지 삭제 함수
}

// zustand 스토어 생성
export const useSaveMessagesStore = create<SaveMessagesState>((set, get) => ({
  items: [], // 저장 메시지 배열 초기화
  loading: false, // 로딩 중 아님
  error: null, // 에러 없음

  // 메시지 목록 조회 (fetch)
  fetch: async (workspaceId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getSaveMessages(workspaceId, userId);
      set({ items: data || [] });
    } catch {
      set({ error: "메시지 불러오기 실패" });
    } finally {
      set({ loading: false });
    }
  },

  // 메시지 추가 (add)
  add: async (workspaceId: string, userId: string, content: string) => {
    try {
      // 서버에 메시지 저장 요청
      const newMsg = await addSaveMessage(workspaceId, userId, content);
      // 기존 items 배열에 새 메시지 객체를 추가
      set((state: SaveMessagesState) => ({ items: [...state.items, newMsg] }));
    } catch {
      set({ error: "메시지 추가 실패" });
    }
  },

  // 메시지 삭제 (remove)
  remove: async (workspaceId: string, id: string, userId: string) => {
    try {
      // 서버에서 해당 메시지 삭제
      await deleteSaveMessage(workspaceId, id, userId);
      // 로컬 상태 업데이트
      set((state: SaveMessagesState) => ({
        items: state.items.filter((m) => m.save_message_id !== id),
      }));
    } catch {
      set({ error: "삭제 실패" });
    }
  },
}));
