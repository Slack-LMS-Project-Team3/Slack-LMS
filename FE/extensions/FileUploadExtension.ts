import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FileDownloadComponent } from "./FileUploadNodeView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fileDownload: {
      setFileDownload: (attributes: { fileUrl: string }) => ReturnType;
    };
  }
}

export const FileDownloadExtension = Node.create({
  name: "fileDownload",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      fileUrl: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="file-download"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "file-download" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FileDownloadComponent);
  },

  addCommands() {
    return {
      setFileDownload:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
