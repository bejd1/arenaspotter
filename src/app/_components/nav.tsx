"use client";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import React from "react";
import { GiSoccerField } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import DropdownBurger from "@/components/dropdown-burger";
import { Separator } from "@/components/ui/separator";
import { Auth } from "./auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DropdownImage from "@/components/dropdown-image";

const Nav = () => {
  const { data: session } = useSession();

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
            <Button variant={"outline"} size="icon">
              <AiOutlineStar className="text-xl cursor-pointer" />
            </Button>
            <ModeToggle />
            <div>
              {!session?.user ? (
                <div className="flex flex-row gap-2">
                  <DropdownBurger />
                  <Auth />
                </div>
              ) : (
                <DropdownImage />
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Nav;
