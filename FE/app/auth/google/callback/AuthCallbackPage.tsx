"use client";

const BASE = process.env.NEXT_PUBLIC_BASE;

import "@/styles/globals.css";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useMyUserStore } from "@/store/myUserStore";
import { useMyPermissionsStore } from "@/store/myPermissionsStore";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const scope = params.get("scope");
  const prompt = params.get("prompt");
  const errorParam = params.get("error");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 권한 정보 호출 및 전역 상태로 저장
  const { fetchPermissions } = useMyPermissionsStore();

  useEffect(() => {
    if (!code) {
      setError("Google 로그인 code가 없습니다.");
      setIsLoading(false);
      return;
    }

    const getToken = async () => {
      try {
        const res = await fetch(
          `${BASE}/api/auth/google/callback?code=${code}&scope=${scope}&prompt=${prompt}`,
          {
            credentials: "include",
          },
        );
        if (errorParam) {
          // 추후 수정
          setError(
            errorParam === "not_found"
              ? "등록된 사용자가 아닙니다."
              : "알 수 없는 오류입니다.",
          );
          setIsLoading(false);
          return;
        }

        if (!res.ok) throw new Error("백엔드 요청 실패");

        const data = await res.json();
        const workspaceId = data.workspace_id;
        const tabId = data.tab_id;
        const accessToken = data.access_token;

        if (!accessToken) {
          setError("access_token이 없습니다.");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("access_token", accessToken);

        // 토큰에서 사용자 ID 추출하여 스토어에 저장
        const decoded = jwtDecode<{ user_id: string }>(accessToken);
        useMyUserStore.getState().setUserId(decoded.user_id);

        // 권한 정보 호출 및 전역 상태로 저장
        await fetchPermissions(workspaceId);

        router.replace(`/workspaces/${workspaceId}/tabs/${tabId}`);
      } catch (err: any) {
        setError("인증 처리 중 오류: " + err.message);
        setIsLoading(false);
      }
    };

    getToken();
  }, [code, scope, prompt, errorParam, router]);

  // 실패 시 UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-2">로그인 실패</h1>
        <p className="mb-6 text-red-600">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  // 로딩 UI
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div className="flex flex-row space-x-3.5 mb-8">
          <div className="h-3 w-3 bg-blue-200 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
          <div className="h-3 w-3 bg-blue-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 bg-blue-200 rounded-full animate-bounce"></div>
        </div>
        <div className="text-2xl text-white" lang="en">
          Loading
        </div>
      </div>
    );
  }

  return null; // 성공 시 자동 리디렉트됨
}
