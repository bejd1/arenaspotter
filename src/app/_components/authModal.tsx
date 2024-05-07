"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MyAccount from "@/app/my-account/page";
import { Modal } from "../@modal/(.)my-account/modal";

export default function AuthModal() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/", { scroll: false });
    }
  }, [status, router]);

  return (
    <div className="absolute top-0">
      <Modal>
        <MyAccount />
      </Modal>
    </div>
  );
}
