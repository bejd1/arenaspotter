import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlinePlus } from "react-icons/ai";
import { Auth } from "@/app/_components/auth";
import { signOut, useSession } from "next-auth/react";
import { IoExitOutline } from "react-icons/io5";

const DropdownImage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            {session?.user ? (
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-blue-600 rounded-full cursor-pointer">
                {session?.user?.name?.charAt(0).toLocaleUpperCase()}
              </div>
            ) : (
              <img
                src={session?.user?.image?.toString()}
                className="w-8 h-8 ml-2 rounded-full cursor-pointer"
                alt="Picture of the author"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer sm:hidden">
            <Auth />
            fdssf
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex justify-between">
            <p>Add arena</p>
            <AiOutlinePlus className="text-xl" />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer flex justify-between">
            <button onClick={() => signOut()}>Sign out</button>
            <IoExitOutline className="text-xl" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownImage;
