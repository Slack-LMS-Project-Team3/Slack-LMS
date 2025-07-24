'use client';

import { ExtendedRecordMap } from 'notion-types';
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation";
import { fetchWithAuth } from '@/apis/authApi';
import { useMyPermissionsStore } from '@/store/myPermissionsStore';
import { DialogModal } from '@/components/modal/DialogModal';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
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
      setError(`캔버스를 불러올 수 없습니다.`);
    }
  };

  // 새로운 canvas 생성 (Import 버튼)
  const handleImportNewCanvas = async (pageId: string) => {
    setLoading(true);
    setError(null); // 먼저 에러 상태 클리어
    
    try {
      const apiUrl = `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/canvases/${pageId}`;
      console.log("Import API 요청 (POST):", apiUrl);
      
      const res = await fetchWithAuth(apiUrl, {
        method: 'POST'
      });
      
      if (!res || !res.ok) {
        const errorText = await res?.text();
        console.error("Import 에러 응답:", errorText);
        throw new Error(`API 응답 오류: ${res?.status} - ${errorText}`);
      }
      
      console.log("Import 성공");
      setShowImportModal(false);
      setCustomPageId("");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchCanvasData();
      
    } catch (err) {
      console.error("Canvas import 오류:", err);
      setError(`캔버스를 불러올 수 없습니다.`);
    } finally {
      setLoading(false);
    }
  };

  // 기존 canvas 수정 (Edit 버튼)
  const handleEditCanvas = async (pageId: string) => {
    setLoading(true);
    setError(null); // 먼저 에러 상태 클리어
    
    try {
      const apiUrl = `${BASE}/api/workspaces/${workspaceId}/tabs/${tabId}/canvases/${pageId}`;
      console.log("Edit API 요청 (PATCH):", apiUrl);
      
      const res = await fetchWithAuth(apiUrl, {
        method: 'PATCH'
      });
      
      if (!res || !res.ok) {
        const errorText = await res?.text();
        console.error("Edit 에러 응답:", errorText);
        throw new Error(`API 응답 오류: ${res?.status} - ${errorText}`);
      }
      
      console.log("Edit 성공");
      setShowEditModal(false);
      setCustomPageId("");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchCanvasData();
      
    } catch (err) {
      console.error("Canvas edit 오류:", err);
      setError(`캔버스를 불러올 수 없습니다.`);
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
    if ((showImportModal || showEditModal) && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showImportModal, showEditModal]);

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
    return (
      <div className="relative h-full w-full">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="text-red-500 text-lg">캔버스를 불러올 수 없습니다</div>
            {isAdmin ? (
              <>
                <div className="text-gray-400 text-sm">올바른 Page ID를 입력해주세요</div>
                <DialogModal
                  title={!recordMap ? "Import Notion Page" : "Switch Notion Page"}
                  open={!recordMap ? showImportModal : showEditModal}
                  onOpenChange={!recordMap ? setShowImportModal : setShowEditModal}
                  // className="[&_[data-slot=dialog-overlay]]:bg-black/90"
                  trigger={
                    <Button className="px-6 py-3">Import</Button>
                  }
                >
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <div className="text-red-800 text-sm font-medium mb-1">페이지를 불러올 수 없습니다</div>
                    <div className="text-red-600 text-sm">올바른 Notion Page ID를 입력해주세요</div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="error-page-id">Page ID</Label>
                    <Input
                      id="error-page-id"
                      ref={inputRef}
                      type="text"
                      placeholder="Enter Notion Page ID"
                      value={customPageId}
                      onChange={(e) => setCustomPageId(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (!recordMap) {
                          setShowImportModal(false);
                        } else {
                          setShowEditModal(false);
                        }
                        setCustomPageId("");
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (!recordMap) {
                          handleImportNewCanvas(customPageId);
                        } else {
                          handleEditCanvas(customPageId);
                        }
                      }}
                      disabled={!customPageId.trim()}
                      className="flex-1"
                    >
                      {!recordMap ? "Import" : "Switch"}
                    </Button>
                  </div>
                </DialogModal>
              </>
            ) : (
              <div className="text-gray-400 text-sm">관리자에게 문의해주세요</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!recordMap) {
    return (
      <div className="relative h-full w-full">
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="text-gray-500 text-lg">등록된 캔버스가 없습니다</div>
            {isAdmin ? (
              <>
                <div className="text-gray-400 text-sm">Import 버튼을 클릭하여 캔버스를 등록해주세요</div>
                <DialogModal
                  title="Import Notion Page"
                  open={showImportModal}
                  onOpenChange={setShowImportModal}
                  className="[&_[data-slot=dialog-overlay]]:bg-black/90"
                  trigger={
                    <Button className="px-6 py-3">Import</Button>
                  }
                >
                  <div className="space-y-2">
                    <Label htmlFor="import-page-id">Page ID</Label>
                    <Input
                      id="import-page-id"
                      ref={inputRef}
                      type="text"
                      placeholder="Enter Notion Page ID"
                      value={customPageId}
                      onChange={(e) => setCustomPageId(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowImportModal(false);
                        setCustomPageId("");
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleImportNewCanvas(customPageId)}
                      disabled={!customPageId.trim()}
                      className="flex-1"
                    >
                      Import
                    </Button>
                  </div>
                </DialogModal>
              </>
            ) : (
              <div className="text-gray-400 text-sm">관리자가 페이지를 등록할 때까지 기다려주세요</div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-full w-full">
      {isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <DialogModal
            title="Switch Notion Page"
            open={showEditModal}
            onOpenChange={setShowEditModal}
            className="[&_[data-slot=dialog-overlay]]:bg-black/90"
            trigger={
              <Button className="px-4 py-2">Edit</Button>
            }
          >
            <div className="space-y-2">
              <Label htmlFor="edit-page-id">Page ID</Label>
              <Input
                id="edit-page-id"
                ref={inputRef}
                type="text"
                placeholder="Enter Notion Page ID"
                value={customPageId}
                onChange={(e) => setCustomPageId(e.target.value)}
              />
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setCustomPageId("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleEditCanvas(customPageId)}
                disabled={!customPageId.trim()}
                className="flex-1"
              >
                Switch
              </Button>
            </div>
          </DialogModal>
        </div>
      )}
      
      <div className="h-full w-full pl-10 overflow-auto">
        <NotionPage recordMap={recordMap} />
      </div>
    </div>
  );
}
