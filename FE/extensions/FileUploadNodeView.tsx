// FE/extensions/FileUploadNodeView.tsx
import { NodeViewWrapper } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { getFileExtension, getFileIcon } from "@/utils/fileUtils";

export const FileDownloadComponent = ({ node }: { node: any }) => {
  const fileName = node.attrs.fileUrl.split("/").pop() || "";
  const decodedFileName = decodeURIComponent(fileName);
  const fileExtension = getFileExtension(fileName);
  const fileIcon = getFileIcon(fileName);

  return (
    <NodeViewWrapper className="inline-block">
      <Button
        variant="outline"
        className="w-60 h-16 px-2 py-0 relative flex items-center justify-start gap-[0px]"
      >
        {/* 아이콘 */}
        <div
          className="relative"
          style={{ marginTop: "22px", marginLeft: "2px" }}
        >
          <img src={fileIcon} alt="file icon" className="w-10 h-10" />
        </div>

        {/* 파일명과 확장자 (세로 정렬) */}
        <div className="flex flex-col justify-center items-start">
          <span
            className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-[160px]"
            style={{ paddingRight: "7px" }}
          >
            {decodedFileName}
          </span>
          <span className="text-xs text-gray-500 mt-[4px]">
            {fileExtension}
          </span>
        </div>
      </Button>
    </NodeViewWrapper>
  );
};
