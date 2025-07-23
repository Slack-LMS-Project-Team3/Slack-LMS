import { useState } from "react";

export function ImageWithModal({ fileUrl }: { fileUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={fileUrl}
        alt="file"
        className="max-w-[300px] w-full h-auto cursor-pointer object-contain rounded-md"
        onDoubleClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <img
            src={fileUrl}
            alt="file-large"
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
          />
        </div>
      )}
    </>
  );
}
