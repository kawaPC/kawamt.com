"use client";
import { Dialog, DialogContent } from "components/Dialog";
import { ModalBackButton } from "components/ModalBackButton";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type Props = {
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) return;
      router.back();
    },
    [router]
  );

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent onClick={router.back}>
        <ModalBackButton />
        {children}
      </DialogContent>
    </Dialog>
  );
};
