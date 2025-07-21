// "use client";

// import { ReactNode } from "react";
// import { ModalTrigger } from "./ModalTrigger";
// import { ModalClose } from "./Modal";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface CardModalProps {
//   trigger: ReactNode;
//   title: string;
//   children: ReactNode;
//   defaultOpen?: boolean;
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
// }

// export function CardModal({ trigger, title, children, defaultOpen = false, open, onOpenChange }: CardModalProps) {
//   return (
//     <ModalTrigger trigger={trigger} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
//       <Card className="flex flex-col h-full overflow-hidden">
//         <CardHeader className="flex items-center justify-between flex-none">
//           <h3 className="text-xl font-semibold">{title}</h3>
//           <ModalClose asChild>
//             <button aria-label="Close">
//               <X size={20} />
//             </button>
//           </ModalClose>
//         </CardHeader>
//         <CardContent className="flex-1 min-h-0">{children}</CardContent>
//         {/* <CardFooter className="flex flex-row items-center justify-end flex-none gap-4">
//           <Button variant="secondary">Cancel</Button>
//           <Button variant="default">Save Changes</Button>
//         </CardFooter> */}
//       </Card>
//     </ModalTrigger>
//   );
// }

// 수정) 카드 모달이 위에 위치하게 함

"use client";

import React from "react";
import { createPortal } from "react-dom";
import { ModalTrigger } from "./ModalTrigger";
import { ModalClose } from "./Modal";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface CardModalProps {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CardModal({
  trigger,
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
}: CardModalProps) {
  return (
    <ModalTrigger
      trigger={trigger}
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {/* Portal 로 body 아래에 렌더 */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 백드롭: z-40 */}
            <div
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => onOpenChange?.(false)}
            />

            {/* 모달 박스: z-50 */}
            <Card className="relative z-50 w-full max-w-lg flex flex-col h-auto overflow-hidden">
              <CardHeader className="flex items-center justify-between px-4 py-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <ModalClose asChild>
                  <button aria-label="Close">
                    <X size={20} />
                  </button>
                </ModalClose>
              </CardHeader>

              <CardContent className="px-4 py-2">
                {children}
              </CardContent>
            </Card>
          </div>,
          document.body
        )}
    </ModalTrigger>
  );
}
