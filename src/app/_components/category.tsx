import React from "react";
import FilterData from "./filterData";
import SearchInput from "./searchInput";
import { useSearchParams } from "next/navigation";
import CategoryBtn from "./categoryBtn";

interface CategoryPropsI {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Category = ({ searchTerm, handleSearch }: CategoryPropsI) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center w-full px-8 md:px-16 lg:px-32 my-8 gap-3">
      <div className="hidden md:block">
        <CategoryBtn category={category} />
      </div>
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="block md:hidden">
          <CategoryBtn category={category} />
        </div>
        <FilterData />
      </div>
    </div>
  );
};

export default Category;
