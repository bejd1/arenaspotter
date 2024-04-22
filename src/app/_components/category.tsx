import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";
import FilterData from "./filterData";
import SearchInput from "./searchInput";
import { useSearchParams } from "next/navigation";

interface CategoryPropsI {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category = ({ searchTerm, handleSearch }: CategoryPropsI) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="flex flex-row justify-between items-center w-full my-4 mx-48 sm:px-6 lg:px-32 mb-8">
      <div className="flex gap-2 mb-4">
        <Link href={"/arena"}>
          <Button variant={category === null ? "secondary" : "default"}>
            All
          </Button>
        </Link>
        <Link href={`/arena/?category=football`}>
          <Button variant={category === "football" ? "secondary" : "default"}>
            <BiFootball className="text-xl" />
          </Button>
        </Link>
        <Link href={`/arena/?category=basketball`}>
          <Button variant={category === "basketball" ? "secondary" : "default"}>
            <BiSolidBasketball className="text-xl" />
          </Button>
        </Link>
        <Link href={`/arena/?category=netball`}>
          <Button variant={category === "netball" ? "secondary" : "default"}>
            <PiVolleyball className="text-xl" />
          </Button>
        </Link>
      </div>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <FilterData />
    </div>
  );
};

export default Category;
