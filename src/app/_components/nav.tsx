"use client";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import DropdownImage from "@/components/dropdown-image";
import NavIcons from "./navIcons";
import { MdPerson } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Nav = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-20 py-4">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-md sm:text-xl font-extrabold">Arena Spotter</h2>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-1 md:gap-4">
          <div className="flex items-center justify-center">
            <NavIcons />
            {status === "loading" ? (
              <MdPerson className="text-2xl ml-1 cursor-pointer" />
            ) : (
              <div>
                {!session?.user ? (
                  <div className="flex flex-row gap-2 ml-2">
                    <Link href={`/my-account`}>
                      <Button>Login</Button>
                    </Link>
                  </div>
                ) : (
                  <DropdownImage />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Nav;
