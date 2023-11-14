"use client";
import { Dialog, DialogContent } from "components/Dialog";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogContent onClick={router.back}>{children}</DialogContent>
    </Dialog>
  );
};
