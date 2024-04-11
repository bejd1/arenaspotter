import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Auth } from "@/app/_components/auth";
import { signOut, useSession } from "next-auth/react";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { MdReportGmailerrorred } from "react-icons/md";
import Link from "next/link";

const DropdownImage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            {session?.user?.image?.toString() === undefined ? (
              <div className="flex items-center justify-center w-8 h-8 ml-2 bg-blue-600 text-white rounded-full cursor-pointer">
                {session?.user?.name?.charAt(0).toLocaleUpperCase()}
              </div>
            ) : (
              <img
                src={session?.user?.image?.toString()}
                className="w-8 h-8 ml-2 rounded-full cursor-pointer"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer sm:hidden">
            <Auth />
          </DropdownMenuItem>
          <Link href="/my-arenas">
            <DropdownMenuItem className="cursor-pointer flex gap-2 justify-between">
              <p>My arenas</p>
              <CiViewList className="text-xl" />
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer flex gap-2 justify-between">
              <p>Settings</p>
              <IoSettingsOutline className="text-xl" />
            </DropdownMenuItem>
          </Link>
          {session?.user?.role === "admin" && (
            <>
              <Link href="/panel-admin">
                <DropdownMenuItem className="cursor-pointer flex gap-2 justify-between">
                  <p>Panel admin</p>
                  <GrUserAdmin className="text-lg" />
                </DropdownMenuItem>
              </Link>
              <Link href="/reports">
                <DropdownMenuItem className="cursor-pointer flex gap-2 justify-between">
                  <p>Reports</p>
                  <MdReportGmailerrorred className="text-xl" />
                </DropdownMenuItem>
              </Link>
            </>
          )}

          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer flex gap-2 justify-between"
          >
            <button>Sign out</button>
            <IoExitOutline className="text-xl" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownImage;
