import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const ModalBackButton: React.FC = () => {
  const router = useRouter();

  const onClickClose = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      e.stopPropagation();
      router.back();
    },
    [router]
  );

  return (
    <Image
      src="/cross.svg"
      width={35}
      height={35}
      alt="閉じる"
      onClick={onClickClose}
      className="fixed right-[4px] top-0 z-10 cursor-pointer opacity-60 border bg-white hover:opacity-80 rounded-full p-1"
    />
  );
};
