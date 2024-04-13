"use client";
import { useSession } from "next-auth/react";
import { Modal } from "../(.)my-account/modal";
import MyAccount from "@/app/my-account/page";
import Arena from "@/app/arena/page";

export default function MyAccountModal() {
  // export default async function MyAccountModal() {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data: session, status } = useSession();

  if (status === "authenticated") return <Arena />;
  return (
    <Modal>
      <MyAccount />
    </Modal>
  );
}
