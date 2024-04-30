import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";

const CategoryBtn = ({ category }: { category: string | null }) => {
  return (
    <div className="flex gap-2">
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
  );
};

export default CategoryBtn;
