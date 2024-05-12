import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ReactNode } from "react";
import { FcStatistics } from "react-icons/fc";
import { FiMenu } from "react-icons/fi";

interface linksI {
  name: string;
  href: string;
  icon: ReactNode;
  counter?: ReactNode;
}

export function DashboardDropdown({ links }: { links: linksI[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="absolute top-7 right-5 sm:hidden"
        >
          <FiMenu className="text-2xl cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max">
        <Link href={"/dashboard"} className="flex items-center gap-1">
          <DropdownMenuItem>
            <FcStatistics className="text-lg" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center justify-start"
            >
              <DropdownMenuItem>
                {link.icon} {link.name} {link.counter}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
