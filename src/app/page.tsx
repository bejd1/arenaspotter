"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { BsSearch } from "react-icons/bs";
import Arena from "./arena/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ParentComponent = () => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl my-5">Witam</h2>
      <div
        className={`flex items-center justify-center border w-[420px] rounded-md ${
          isInputClicked ? "border-slate-900" : "border-slate-300"
        } dark:${isInputClicked ? "border-slate-100" : "border-gray-200"}`}
      >
        <Input
          placeholder="Choose arena near you..."
          className="border-none"
          onFocus={() => setIsInputClicked(true)}
          onBlur={() => setIsInputClicked(false)}
        />
        <BsSearch className="text-xl mr-4 font-bold" />
      </div>
      <Button className="mt-12">
        <Link href={"/arena"}>Arena</Link>
      </Button>
    </div>
  );
};

export default ParentComponent;
