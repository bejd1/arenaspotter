import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

const NavIcons = () => {
  return (
    <div className="flex items-center justify-center">
      <Link href={"/favorite"}>
        <Tooltip title="Favorite">
          <Button variant={"outline"} size="icon">
            <AiOutlineStar className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </Link>
      <ModeToggle />
      <Link href={"/create-post"}>
        <Tooltip title="Create new...">
          <Button variant={"outline"} size="icon">
            <AiOutlinePlus className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </Link>
    </div>
  );
};

export default NavIcons;
