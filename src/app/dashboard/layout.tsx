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

interface linksI {
  name: string;
  href: string;
  icon: ReactNode;
  counter?: ReactNode;
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
    counter: (
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-400 ml-1 ">
        0
      </span>
    ),
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: <MdReportGmailerrorred className="text-xl mr-1" />,
    counter: (
      <span className="flex items-center justify-center w-4 h-4 ml-1 rounded-full bg-blue-400 ">
        0
      </span>
    ),
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

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
                  {link.icon} {link.name} {link.counter}
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
