import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";

const CategoryBtn = ({ handleSortCategory }: { handleSortCategory: any }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  return (
    <div className="flex flex-row w-max gap-1">
      <Link href={"/arena"}>
        <Button variant={category === null ? "secondary" : "default"}>
          All
        </Button>
      </Link>
      <Link href={`/arena/?category=football`}>
        <Button
          onClick={() => handleSortCategory("football")}
          variant={category === "football" ? "secondary" : "default"}
        >
          <BiFootball className="text-xl" />
        </Button>
      </Link>
      <Link href={`/arena/?category=basketball`}>
        <Button
          onClick={() => handleSortCategory("basketball")}
          variant={category === "basketball" ? "secondary" : "default"}
        >
          <BiSolidBasketball className="text-xl" />
        </Button>
      </Link>
      <Link href={`/arena/?category=netball`}>
        <Button
          onClick={() => handleSortCategory("netball")}
          variant={category === "netball" ? "secondary" : "default"}
        >
          <PiVolleyball className="text-xl" />
        </Button>
      </Link>
    </div>
  );
};

export default CategoryBtn;
