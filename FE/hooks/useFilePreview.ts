import { useCallback } from "react";
import { useFileStore } from "@/store/fileStore";
import { useMessageStore } from "@/store/messageStore";
import { putPresignedUrl, uploadFile } from "@/apis/fileImport";
export function useFilePreview(
  editor: any,
  fileInputRef: React.RefObject<HTMLInputElement>,
) {
  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      useFileStore.getState().setFile(file || null); // file store에 file 저장
      // 파일 업로드 전 presignedUrl 발급
      if (!file) return;

      // presignedUrl 발급
      const result = await putPresignedUrl(file);
      if (!result || !result.presignedUrl) {
        alert("업로드 URL을 가져오지 못했습니다.");
        return;
      }
      const { presignedUrl, fileKey } = result;

      // 파일 업로드
      const fileUrl = await uploadFile(file, presignedUrl);

      if (!fileUrl) {
        alert("fileUrl이 없습니다");
        return;
      }

      useMessageStore.getState().setFileUrl(fileUrl);
      if (file && editor) {
        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("파일 크기는 5MB 이하여야 합니다.");
          return;
        }
        // 에디터에 이미지 삽입
        if (file.type.startsWith("image/")) {
          editor.chain().focus().setImage({ src: fileUrl }).run();
        } else {
          editor?.commands.setFileDownload({
            fileUrl: fileUrl, // 예: "https://s3.aws.com/abc.pdf"
          });
        }
        // 파일 입력 초기화
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor],
  );
  return { handleFileSelect };
}
