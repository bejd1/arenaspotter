"use client";
import { CustomInput } from "@/components/ui/customInput";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputI {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ searchTerm, handleSearch }: SearchInputI) => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <div>
      <form className="flex flex-col mb-4">
        <div
          className={`flex items-center justify-center border w-[600px] rounded-md ${
            isInputClicked ? "border-slate-900" : "border-slate-300"
          } ${
            isInputClicked ? "dark:border-white" : "dark:border-y-slate-300"
          }`}
        >
          <div className="w-full">
            <CustomInput
              placeholder="Choose arena near you..."
              className="border-none"
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setIsInputClicked(true)}
              onBlur={() => setIsInputClicked(false)}
            />
          </div>
          <BsSearch className="text-xl mr-4 font-bold" />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
