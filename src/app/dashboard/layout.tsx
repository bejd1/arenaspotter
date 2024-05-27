"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { DashboardDropdown } from "../_components/dashboardDropdown";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getArenaByStatus } from "@/actions/newArena";

interface linksI {
  name: string;
  href: string;
  icon: ReactNode;
}

const links: linksI[] = [
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <FaUser className="mr-1" />,
  },
  {
    name: "New arena",
    href: "/dashboard/new-arena",
    icon: <MdOutlineNotificationsActive className="text-xl mr-1" />,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: <MdReportGmailerrorred className="text-xl mr-1" />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { data: pendingPosts = [] } = useQuery({
    queryKey: ["pendingPosts"],
    queryFn: async () => await getArenaByStatus("pending"),
  });

  return (
    <div className="flex relative">
      <DashboardDropdown links={links} />
      <div className="hidden sm:flex flex-col items-center sm:w-[200px] p-2 sm:p-8 border border-l-0 border-t-0 border-r-1  h-[93vh]">
        <Button
          variant={"outline"}
          className={`mb-2 text-center ${
            pathname === "/dashboard"
              ? "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700"
              : ""
          }`}
        >
          <Link href={"/dashboard"} className="flex items-center gap-1">
            <FcStatistics className="text-lg" />
            Dashboard
          </Link>
        </Button>
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <div
              key={link.name}
              className="flex flex-col justify-start mb-2 w-full"
            >
              <Button
                variant={"outline"}
                className={
                  isActive
                    ? "bg-slate-300 hover:bg-slate-400 w-full dark:bg-slate-700"
                    : ""
                }
              >
                <Link
                  href={link.href}
                  className="flex items-center justify-start"
                >
                  {link.icon} {link.name}
                  {link.name === "New arena" ? (
                    <span className="flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-blue-400 ">
                      {pendingPosts.length}
                    </span>
                  ) : null}
                  {link.name === "Reports" ? (
                    <span className="flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-blue-400 ">
                      0
                    </span>
                  ) : null}
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
