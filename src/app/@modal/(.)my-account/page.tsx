"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Modal } from "../(.)my-account/modal";
import MyAccount from "@/app/my-account/page";

export default function MyAccountModal() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <Modal>
      <MyAccount />
    </Modal>
  );
}
