"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const Modal = Dialog.Root;
export const ModalPortal = Dialog.Portal;

export const ModalOverlay = (props: Dialog.DialogOverlayProps) => (
  <Dialog.Overlay className="fixed" {...props} />
);

export const ModalContent = (props: Dialog.DialogContentProps) => (
  <Dialog.Content
    className="fixed top-1/2 left-1/2 w-full max-w-lg max-h-[90vh] flex flex-col -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background p-4 shadow-lg focus:outline-none"
    {...props}
  >
    {props.children} {/* hack: profile 편집 시 에러나면 확인 */}
  </Dialog.Content>
);

export const ModalClose = Dialog.Close;