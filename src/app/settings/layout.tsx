"use client";
import React from "react";
import { useSession } from "next-auth/react";
import DeleteUserModal from "../_components/deleteUserModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-row mb-2">
      <div className="hidden sm:flex flex-col items-center justify-between sm:w-[200px] p-2 sm:p-8 border border-l-0 border-t-0 border-r-1  h-[93vh]">
        <p className="bg-slate-700/95 py-2 px-4 rounded-full text-white">
          Public profile
        </p>
        <DeleteUserModal id={session?.user?.id} />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
