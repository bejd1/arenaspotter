import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { Auth } from "@/app/_components/auth";

const DropdownBurger = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"} size="icon">
            <RxHamburgerMenu className="text-xl cursor-pointer" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer sm:hidden">
            <Auth />
            fdssf
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex justify-between">
            <p>Add arena</p>
            <AiOutlinePlus className="text-xl cursor-pointer" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownBurger;