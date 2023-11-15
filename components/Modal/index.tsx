"use client";
import { Dialog, DialogContent } from "components/Dialog";
import Image from "next/image";
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

  const onClickClose = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      router.back();
    },
    [router]
  );

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent onClick={router.back}>
        <div className="w-screen h-screen relative">
          <Image
            src="/cross.svg"
            width={35}
            height={35}
            alt="閉じる"
            onClick={onClickClose}
            className="absolute z-10 top-10 sm:top-4 right-1 cursor-pointer opacity-40 bg-white hover:opacity-60 rounded-sm"
          />
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};
