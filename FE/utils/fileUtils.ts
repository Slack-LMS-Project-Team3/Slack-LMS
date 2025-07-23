export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toUpperCase() || "";
};

export const getFileIcon = (fileName: string): string => {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  console.log(ext);

  switch (ext) {
    case "pdf":
      return "/file-pdf.png"; // PDF 전용 아이콘
    case "doc":
    case "docx":
      return "/file-word.png"; // Word 전용 아이콘
    case "xls":
    case "xlsx":
      return "/file-excel.png"; // Excel 전용 아이콘
    case "ppt":
    case "pptx":
      return "/file-powerpoint.png"; // PowerPoint 전용 아이콘
    default:
      return "/upload_default.png"; // 기본 아이콘
  }
};
