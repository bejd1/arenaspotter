import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";
import FilterData from "./filterData";

const Category = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="flex flex-row justify-between w-full">
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
      <FilterData />
    </div>
  );
};

export default Category;
// const searchParams = useSearchParams();
// const cities = searchParams.get("cities");
// const category = searchParams.get("category");

// const buildHref = (newCities: any, newCategory: any) => {
//   let href = "/?";
//   if (newCities) href += `cities=${newCities}&`;
//   if (newCategory) href += `category=${newCategory}&`;
//   return href.slice(0, -1); // Remove trailing "&" or "?"
// };

// <Button>
// <Link href={buildHref("Szczecinek", category)}>Szczecinek</Link>
// </Button>
// <Button>
// <Link href={buildHref("Poznan", category)}>Poznan</Link>
// </Button>
// <Button>
// <Link href={buildHref("Warszawa", category)}>Warszawa</Link>
// </Button>
// <Button>
// <Link href="/">Clear</Link>
// </Button>
// <Button>
// <Link href={buildHref(cities, "free")}>Free</Link>
// </Button>
// <Button>
// <Link href={buildHref(cities, "paid")}>Paid</Link>
// </Button>
