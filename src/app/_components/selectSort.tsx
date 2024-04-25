import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { IoRefreshSharp } from "react-icons/io5";

const SelectSort = () => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by price
              <BsArrowUpRight />
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by price
              <BsArrowDownRight />
            </div>
          </SelectItem>
          <SelectItem value="syss">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by ppl
              <BsArrowUpRight />
            </div>
          </SelectItem>
          <SelectItem value="system">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by ppl
              <BsArrowDownRight />
            </div>
          </SelectItem>
          <SelectItem value="systedm" className="flex flex-row">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Free
            </div>
          </SelectItem>
          <SelectItem value="systsdsem">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Payment only
            </div>
          </SelectItem>
          <SelectItem value="dfsystsdsem" className="flex flex-row">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Restart
              <IoRefreshSharp className="text-lg" />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSort;