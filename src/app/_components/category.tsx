import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";
import FilterData from "./filterData";
import SearchInput from "./searchInput";

interface CategoryProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category = ({ searchTerm, handleSearch }: CategoryProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="flex flex-row justify-between items-center w-full my-4 sm:px-6 mx-48 lg:px-48">
      <div className="flex gap-2 mb-4">
        <Link href={"?category=football"}>
          <Button>
            <BiFootball className="text-xl" />
          </Button>
        </Link>
        <Link href={"?category=basketball"}>
          <Button>
            <BiSolidBasketball className="text-xl" />
          </Button>
        </Link>
        <Link href={"?category=netball"}>
          <Button>
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
