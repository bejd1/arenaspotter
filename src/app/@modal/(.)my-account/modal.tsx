"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<React.ElementRef<"dialog">>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back();

  return (
    <>
      <div></div>
      <div className="sticky top-0">
        <dialog
          ref={dialogRef}
          onClick={closeModal}
          onClose={router.back}
          className="backdrop:bg-black/60 backdrop-filter backdrop-blur-sm text-3xl bg-black sm:px-12 fixed bg-fixed"
        >
          <div>{children}</div>
        </dialog>
      </div>
    </>
  );
}
