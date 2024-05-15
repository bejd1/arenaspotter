import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { FcStatistics } from "react-icons/fc";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/actions/user";

type mySettingsI = {
  id: string;
  name: string;
  password: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  role: string;
} | null;

const DropdownImage = () => {
  const { data: session } = useSession();

  const id = session?.user?.id;

  const { data: mySettings } = useQuery<mySettingsI>({
    queryKey: ["mySettings"],
    queryFn: async () => await getUserById(id || ""),
  });

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
              <Image
                src={mySettings?.image as string}
                width={100}
                height={100}
                className="w-8 h-8 ml-2 rounded-full cursor-pointer"
                alt="user image"
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!session?.user && (
            <DropdownMenuItem className="cursor-pointer sm:hidden">
              <Button>Login</Button>
            </DropdownMenuItem>
          )}

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
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer flex gap-2 justify-between">
                  <p>Dashboard</p>
                  <FcStatistics className="text-lg" />
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
