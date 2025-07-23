import { Editor } from "@tiptap/react";
import {
  HardDriveUploadIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  LinkIcon,
  ListOrderedIcon,
  ListIcon,
  TextQuoteIcon,
  CodeIcon,
} from "lucide-react";
import "./styles.scss";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CodeBlockIcon } from "../tiptap-icons/code-block-icon";


const ToolBar = ({
  editor,
  setLink,
  addImage,
}: {
  editor: Editor;
  setLink: () => void;
  addImage: () => void;
}) => {
  return (
    <div className="toolbar text-gray-500">
      <div className="itemBox">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`toolbarBtn ${editor.isActive("bold") ? "is-active" : ""}`}
            >
              <BoldIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>굵게</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`toolbarBtn ${editor.isActive("italic") ? "is-active" : ""}`}
            >
              <ItalicIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>기울임꼴</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`toolbarBtn ${editor.isActive("strike") ? "is-active" : ""}`}
            >
              <StrikethroughIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>취소선</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={setLink}
              className={`toolbarBtn ${editor.isActive("link") ? "is-active" : ""}`}
            >
              <LinkIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>링크</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`toolbarBtn ${editor.isActive("orderedList") ? "is-active" : ""}`}
            >
              <ListOrderedIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>순서가 지정된 목록</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`toolbarBtn ${editor.isActive("bulletList") ? "is-active" : ""}`}
            >
              <ListIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>글머리 기호 목록</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`toolbarBtn ${editor.isActive("blockquote") ? "is-active" : ""}`}
            >
              <TextQuoteIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>인용구</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`toolbarBtn ${editor.isActive("code") ? "is-active" : ""}`}
            >
              <CodeIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>코드</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`toolbarBtn ${editor.isActive("codeBlock") ? "is-active" : ""}`}
            >
              <CodeBlockIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>코드 블록</span>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={addImage}
              className={`toolbarBtn ${editor.isActive("image") ? "is-active" : ""}`}
            >
              <HardDriveUploadIcon className="w-4 h-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex flex-col text-xs text-center gap-2">
            <span>첨부</span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ToolBar;
