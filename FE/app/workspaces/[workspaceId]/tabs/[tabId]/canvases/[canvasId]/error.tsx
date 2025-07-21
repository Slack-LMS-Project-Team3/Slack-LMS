"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Canvas page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          캔버스를 불러오는 중 오류가 발생했습니다
        </h2>
        <p className="text-gray-600 mb-6">
          노션 페이지를 로드할 수 없습니다. 잠시 후 다시 시도해주세요.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}