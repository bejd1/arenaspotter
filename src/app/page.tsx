"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomInput } from "@/components/ui/customInput";
import Component from "./_components/login-btn";
import GitHubProvider from "next-auth/providers/github";

const ParentComponent = () => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl my-5">Witam</h2>
      <form className="flex flex-col">
        <div
          className={`flex items-center justify-center border w-[420px] rounded-md ${
            isInputClicked ? "border-slate-900" : "border-slate-300"
          } ${
            isInputClicked ? "dark:border-white" : "dark:border-y-slate-300"
          }`}
        >
          <div className="w-full">
            <CustomInput
              placeholder="Choose arena near you..."
              className="border-none"
              onFocus={() => setIsInputClicked(true)}
              onBlur={() => setIsInputClicked(false)}
            />
          </div>
          <BsSearch className="text-xl mr-4 font-bold" />
        </div>
        <div>
          <label htmlFor="" className="mr-2">
            Free
          </label>
          <input type="checkbox" />
        </div>
      </form>
      <Button className="mt-12">
        <Link href={"/arena"}>Arena</Link>
      </Button>
      <Component />
    </div>
  );
};

export default ParentComponent;
