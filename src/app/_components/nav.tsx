import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import React from "react";
import { GiSoccerField } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import DropdownBurger from "@/components/dropdown-burger";
import { Separator } from "@/components/ui/separator";

const Nav = () => {
  return (
    <div>
      <div className="flex justify-between px-20 py-2">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <GiSoccerField className="text-5xl" />
            <h2 className="text-xl font-semibold">Arena Spotter</h2>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link href={"/login"}>
            <Button variant={"default"}>Login</Button>
          </Link>
          <div className="flex items-center justify-center">
            <Button variant={"outline"} size="icon">
              <AiOutlinePlus className="text-xl cursor-pointer" />
            </Button>
            <Button variant={"outline"} size="icon">
              <AiOutlineStar className="text-xl cursor-pointer" />
            </Button>
            <ModeToggle />
            <DropdownBurger />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Nav;
