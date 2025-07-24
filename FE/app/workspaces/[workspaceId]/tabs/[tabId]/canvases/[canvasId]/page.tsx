'use client';

import { ExtendedRecordMap } from 'notion-types';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation";
import { fetchWithAuth } from '@/apis/authApi';
import { useMyPermissionsStore } from '@/store/myPermissionsStore';

// Notion API 응답을 ExtendedRecordMap 형식으로 변환하는 함수
function convertToExtendedRecordMap(notionData: any): ExtendedRecordMap {
  return {
    block: notionData,
    collection: {},
    collection_view: {},
    collection_query: {},
    space: {},
    notion_user: {},
    signed_urls: {}
  } as unknown as ExtendedRecordMap;
}

const BASE = process.env.NEXT_PUBLIC_BASE;
const NotionPage = dynamic(() => import("@/components/canvas/NotionPage"), { ssr: false })

export default function Page() {
  const params = useParams();
  const workspaceId = Number(params.workspaceId);
  const tabId = Number(params.tabId);
  const canvasId = params.canvasId as string;
  
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [customPageId, setCustomPageId] = useState<string>("");
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { hasPermission } = useMyPermissionsStore();
  const isAdmin = hasPermission(workspaceId.toString(), "admin");

  const fetchCanvasData = async () => {
    try {
      const apiUrl = `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/canvases`;
      console.log("API 요청:", apiUrl);
      const res = await fetchWithAuth(apiUrl);
      
      console.log("응답 상태:", res?.status);
      if (!res) {
        throw new Error('네트워크 오류가 발생했습니다');
      }

      // 404: 등록된 페이지 없음 - 스켈레톤 상태 유지
      if (res.status === 404) {
        console.log("404 응답 받음 - 등록된 페이지 없음");
        setRecordMap(null);
        setError(null);
        return;
      }
      
      // 다른 오류들: 실제 에러로 처리
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      
      const json = await res.json();
      console.log("API 응답 받음", Object.keys(json).length > 0 ? "데이터 있음" : "데이터 없음");
      
      // Notion API 응답을 ExtendedRecordMap 형식으로 변환
      const extendedRecordMap = convertToExtendedRecordMap(json);
      setRecordMap(extendedRecordMap);
      setError(null);
    } catch (err) {
      console.error("Canvas 불러오기 오류:", err);
      setError(`캔버스를 불러오는 중 오류가 발생했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    }
  };

  const handleImportWithPageId = async (pageId: string) => {
    setLoading(true);
    try {
      const apiUrl = `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/canvases/${pageId}`;
      console.log("Import API 요청:", apiUrl);
      console.log("페이지 ID:", pageId);
      
      const res = await fetchWithAuth(apiUrl, {
        method: 'POST'
      });
      
      console.log("Import 응답 상태:", res?.status);
      
      if (!res || !res.ok) {
        const errorText = await res?.text();
        console.error("Import 에러 응답:", errorText);
        throw new Error(`API 응답 오류: ${res?.status} - ${errorText}`);
      }
      
      console.log("Import 성공");
      
      // Import 성공 후 모달 닫기
      setShowImportModal(false);
      setCustomPageId("");
      
      // 백엔드 저장 완료를 위한 짧은 지연
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 새로운 데이터 자동 로드
      await fetchCanvasData();
      
    } catch (err) {
      console.error("Canvas import 오류:", err);
      setError(`캔버스를 가져오는 중 오류가 발생했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function initializePage() {
      setLoading(true);
      await fetchCanvasData();
      setLoading(false);
    }
    initializePage();
  }, [canvasId]);

  useEffect(() => {
    if (showImportModal && inputRef.current) {
      // 짧은 지연 후 포커스 (모달 애니메이션 완료 후)
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showImportModal]);

  if (loading) {
    return (
      <div className="h-full p-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded mt-6"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return <div className="flex items-center justify-center h-full">
      <p className="text-red-500">{error}</p>
    </div>;
  }

  if (!recordMap) {
    return (
      <div className="relative h-full w-full">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="text-gray-500 text-lg">등록된 Notion 페이지가 없습니다</div>
            {isAdmin ? (
              <>
                <div className="text-gray-400 text-sm">Import 버튼을 클릭하여 페이지를 등록해주세요</div>
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Import
                </button>
              </>
            ) : (
              <div className="text-gray-400 text-sm">관리자가 페이지를 등록할 때까지 기다려주세요</div>
            )}
          </div>
        </div>
        
        {showImportModal && (
          <div className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-lg duration-200 sm:max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setCustomPageId("");
                }}
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <svg viewBox="0 0 24 24" className="size-4">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                <span className="sr-only">Close</span>
              </button>
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  Import Notion Page
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enter the Notion page ID to import the content
                </p>
              </div>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="pageId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Page ID
                  </label>
                  <input
                    ref={inputRef}
                    id="pageId"
                    type="text"
                    value={customPageId}
                    onChange={(e) => setCustomPageId(e.target.value)}
                    placeholder="Enter Notion Page ID"
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-3">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setCustomPageId("");
                  }}
                  className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-xs transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleImportWithPageId(customPageId)}
                  disabled={!customPageId.trim()}
                  className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-1"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full">
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Edit
          </button>
        </div>
      )}
      
      <div className="h-full w-full overflow-auto">
        <NotionPage recordMap={recordMap} />
      </div>
      
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-lg duration-200 sm:max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <button
              onClick={() => {
                setShowImportModal(false);
                setCustomPageId("");
              }}
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              <svg viewBox="0 0 24 24" className="size-4">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span className="sr-only">Close</span>
            </button>
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                Switch Notion Page
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter a new Notion page ID to switch the content
              </p>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="pageId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                  Page ID
                </label>
                <input
                  ref={inputRef}
                  id="pageId"
                  type="text"
                  value={customPageId}
                  onChange={(e) => setCustomPageId(e.target.value)}
                  placeholder="Enter Notion Page ID"
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-row gap-3">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setCustomPageId("");
                }}
                className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-xs transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleImportWithPageId(customPageId)}
                disabled={!customPageId.trim()}
                className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex-1"
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
