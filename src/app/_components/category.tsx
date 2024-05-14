import React from "react";
import FilterData from "./filterData";
import SearchInput from "./searchInput";
import CategoryBtn from "./categoryBtn";

interface CategoryPropsI {
  handleSortCategory: any;
  handleSortPeople: any;
  handleSortCost: any;
  onSearch: any;
  searchQuery: any;
  setSearchQuery: any;
}

const Category = ({
  handleSortCategory,
  handleSortPeople,
  handleSortCost,
  onSearch,
  searchQuery,
  setSearchQuery,
}: CategoryPropsI) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center w-full px-8 md:px-16 lg:px-32 my-8 gap-3">
      <div className="hidden md:block">
        <CategoryBtn handleSortCategory={handleSortCategory} />
      </div>
      <SearchInput
        onSearch={onSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="block md:hidden">
          <CategoryBtn handleSortCategory={handleSortCategory} />
        </div>
        <FilterData
          handleSortPeople={handleSortPeople}
          handleSortCost={handleSortCost}
        />
      </div>
    </div>
  );
};

export default Category;
