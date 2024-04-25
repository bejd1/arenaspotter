"use client";
import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import DropdownImage from "@/components/dropdown-image";
import { GiSoccerField } from "react-icons/gi";
import NavIcons from "./navIcons";
import { MdPerson } from "react-icons/md";
import { Button } from "@/components/ui/button";

const Nav = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="flex justify-between px-4 sm:px-6 lg:px-20 py-2">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <GiSoccerField className="text-4xl sm:text-5xl" />
            <h2 className="text-sm sm:text-xl font-semibold">Arena Spotter</h2>
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
                  <div className="flex flex-row gap-2">
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
