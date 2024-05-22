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
      <DropdownMenuTrigger className="absolute bottom-0 right-2 z-10">
        <div className="flex items-center gap-1 underline-offset-4  text-slate-50 bg-[#22272e] px-3 py-1 rounded-md">
          <BiPencil />
          Edit
        </div>
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
