import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

interface FilterDataI {
  handleSortCost: (order: "asc" | "desc") => void;
  handleSortPeople: (order: "asc" | "desc") => void;
}

const SelectSort = ({ handleSortCost, handleSortPeople }: FilterDataI) => {
  const handleSortByPrice = (order: "asc" | "desc") => {
    handleSortCost(order);
  };

  const handleSortByPeople = (order: "asc" | "desc") => {
    handleSortPeople(order);
  };

  return (
    <div>
      <Select
        onValueChange={(value) => {
          if (value.startsWith("people")) {
            handleSortByPeople(value.split("-")[1] as "asc" | "desc");
          } else {
            handleSortByPrice(value as "asc" | "desc");
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by price
              <BsArrowUpRight />
            </div>
          </SelectItem>

          <SelectItem value="desc">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by price
              <BsArrowDownRight />
            </div>
          </SelectItem>

          <SelectItem value="people-asc">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by people
              <BsArrowUpRight />
            </div>
          </SelectItem>

          <SelectItem value="people-desc">
            <div className="flex flex-row justify-between items-center w-max gap-1">
              Sort by people
              <BsArrowDownRight />
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSort;
