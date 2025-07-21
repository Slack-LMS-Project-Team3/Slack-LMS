import { Button } from "@/components/ui/button";
import { getPresignedUrl } from "@/apis/fileImport";
import { useFileStore } from "@/store/fileStore";
import { getFileExtension, getFileIcon } from "@/utils/fileUtils";

interface FileDownloadProps {
  fileUrl: string;
}

export function FileDownload({ fileUrl }: FileDownloadProps) {
  // 안전한 디코딩 함수
  const safeDecodeURIComponent = (str: string): string => {
    try {
      return decodeURIComponent(str);
    } catch (error) {
      console.warn("URI 디코딩 실패:", error);
      return str; // 디코딩 실패 시 원본 문자열 반환
    }
  };

  const fileName = fileUrl.split("/").pop() || "";
  const decodedFileName = safeDecodeURIComponent(fileName);
  const fileExtension = getFileExtension(fileName);
  const fileIcon = getFileIcon(fileName);

  const handleDownload = async () => {
    try {
      if (!fileName) return; // 이거 file 없으면 아무 출력문도 없이 끝내버리기 때문에 수정 필요함

      const result = await getPresignedUrl({ name: fileName } as File);
      if (!result) {
        alert("다운로드 실패");
        return;
      }

      const { presignedUrl } = result;
      window.open(presignedUrl, "_blank");
    } catch (e) {
      alert("다운로드 실패");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      className="w-60 h-16 px-2 py-0 relative flex items-center justify-start"
    >
      <div className="relative">
        <img src={fileIcon} alt="file icon" className="w-10 h-10" />

        {/* PDF 위치 조정 */}
        <span className="absolute left-12 top-6 text-xs text-gray-500">
          {fileExtension}
        </span>
      </div>

      {/* 파일명은 이미지 오른쪽에 표시 */}
      <span className="text-sm -translate-y-1 overflow-hidden whitespace-nowrap pb-3 text-ellipsis max-w-[160px]">
        {decodedFileName}
      </span>
    </Button>
  );
}
