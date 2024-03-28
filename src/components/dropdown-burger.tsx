import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@/components/ui/button";

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
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Subscription
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownBurger;
