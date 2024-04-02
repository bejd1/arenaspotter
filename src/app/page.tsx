"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CustomInput } from "@/components/ui/customInput";
import Arena from "./arena/page";

const ParentComponent = () => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="flex flex-row gap-4">
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
        </form>
        <Button>
          <Link href={"/arena"}>Arena</Link>
        </Button>
      </div>
      <Arena />
    </div>
  );
};

export default ParentComponent;
