"use client";
import React from "react";
import { useSession } from "next-auth/react";
import DeleteUserModal from "../_components/deleteUserModal";
import { FaUser } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row mb-2">
      <div className="hidden sm:flex flex-col items-center justify-between sm:w-[200px] p-2 sm:p-8 border border-l-0 border-t-0 border-r-1  h-[93vh]">
        <div className="flex flex-col gap-4">
          <Link
            href={"/settings"}
            className="flex flex-row  items-center bg-slate-700/95 py-1 px-3 rounded-md text-white"
          >
            <FaUser className="mr-1" />
            <p className="text-extrabold">My profile</p>
          </Link>
          <Link
            href={"/settings/change-password"}
            className="flex flex-row  items-center bg-slate-700/95 py-1 px-3 rounded-md text-white"
          >
            <TbPassword className="mr-1 text-xl" />
            <p className="text-extrabold">Change password</p>
          </Link>
          <Link
            href={"/settings/"}
            className="flex flex-row  items-center bg-slate-700/95 py-1 px-3 rounded-md text-white"
          >
            <MdOutlinePayment className="mr-1 text-xl" />
            <p className="text-extrabold">Payments</p>
          </Link>
        </div>
        <DeleteUserModal id={session?.user?.id} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
