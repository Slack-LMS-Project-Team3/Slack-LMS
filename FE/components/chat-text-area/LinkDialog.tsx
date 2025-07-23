"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export type LinkDialogProps = {
  /** 다이얼로그 열림 상태 */
  isOpen: boolean;
  /** 다이얼로그 열림/닫힘 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 저장 시 실행되는 콜백 (linkText, linkUrl) */
  onSave: (linkText: string, linkUrl: string) => void;
  /** 초기 텍스트 (편집 모드 시) */
  initialText?: string;
  /** 초기 URL (편집 모드 시) */
  initialUrl?: string;
};

export function LinkDialog({
  isOpen,
  onOpenChange,
  onSave,
  initialText = "",
  initialUrl = "",
}: LinkDialogProps) {
  const [linkText, setLinkText] = React.useState(initialText);
  const [linkUrl, setLinkUrl] = React.useState(initialUrl);

  // 초기값이 바뀌면 내부 state 동기화
  React.useEffect(() => {
    setLinkText(initialText);
    setLinkUrl(initialUrl);
  }, [initialText, initialUrl]);

  const handleSave = () => {
    onSave(linkText.trim(), linkUrl.trim());
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    setLinkText("");
    setLinkUrl("");
    onOpenChange(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl mb-2">
            링크 추가
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium">텍스트</span>
            <input
              type="text"
              className="border rounded-md px-2 py-1.5 mt-1"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium">링크</span>
            <input
              type="text"
              className="border rounded-md px-2 py-1.5 mt-1"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            disabled={linkText.trim() === "" || linkUrl.trim() === ""}
            onClick={handleSave}>추가</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
