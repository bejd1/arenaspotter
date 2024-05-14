"use client";
import { CustomInput } from "@/components/ui/customInput";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchInputI {
  onSearch: any;
  searchQuery: any;
  setSearchQuery: any;
}

const SearchInput = ({
  onSearch,
  searchQuery,
  setSearchQuery,
}: SearchInputI) => {
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <form
      onSubmit={onSearch}
      className="flex items-start flex-col w-full lg:px-16 xl:px-20 "
    >
      <div
        className={`flex items-center w-full justify-center border rounded-md ${
          isInputClicked ? "border-slate-900" : "border-slate-300"
        } ${isInputClicked ? "dark:border-white" : "dark:border-y-slate-300"}`}
      >
        <div className="w-full">
          <CustomInput
            placeholder="Choose arena near you..."
            className="border-none"
            value={searchQuery || ""}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setIsInputClicked(true)}
            onBlur={() => setIsInputClicked(false)}
          />
        </div>
        <BsSearch className="text-xl mr-4 font-bold" />
      </div>
    </form>
  );
};

export default SearchInput;
