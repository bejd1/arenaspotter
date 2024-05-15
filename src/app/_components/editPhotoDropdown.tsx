import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BiPencil } from "react-icons/bi";

const EditPhotoDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute bottom-0 -right-2 z-10">
        <Button variant={"noHover"} className="flex gap-1 ">
          <BiPencil />
          Edit
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative  z-10">
        <DropdownMenuItem className="cursor-pointer">
          Edit photo...
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Remove photo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditPhotoDropdown;
