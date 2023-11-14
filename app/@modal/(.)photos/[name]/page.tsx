"use client";

import { Modal } from "components/Modal";
import { Photo } from "components/Photo";

type Params = {
  params: {
    name: string;
  };
};

export default function Page({ params }: Params) {
  const { name } = params;

  return (
    <Modal>
      <Photo filename={name} />
    </Modal>
  );
}
