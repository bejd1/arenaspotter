"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import Link from "next/link";
import { PostT } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FavoriteBtn from "./favoriteBtn";

const Arenas = ({
  arenas,
  searchTerm,
}: {
  arenas: PostT[];
  searchTerm: string;
}) => {
  const [data, setData] = useState([...arenas]);
  const [sortedArenas, setSortedArenas] = useState([...arenas]);
  const [value, setValue] = useState(0);
  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    setData(filtered());
  }, [category, arenas]);

  const filtered = () => {
    if (category && arenas) {
      return sortedArenas.filter((arena) => {
        return (
          (category === "basketball" && arena.basketball) ||
          (category === "football" && arena.football) ||
          (category === "netball" && arena.netball)
        );
      });
    } else {
      return arenas;
    }
  };

  // const sortCostAsc = () => {
  //   setData([...filtered()].sort((a, b) => a.cost - b.cost));
  // };

  // const sortCostDesc = () => {
  //   setData([...filtered()].sort((a, b) => b.cost - a.cost));
  // };

  // const sortPplAsc = () => {
  //   setData([...filtered()].sort((a, b) => a.people - b.people));
  // };

  // const sortPplDesc = () => {
  //   setData([...filtered()].sort((a, b) => b.people - a.people));
  // };
  // const sortFree = () => {
  //   setData([...filtered()].filter((a) => a.cost === 0));
  // };

  // const sortPayment = () => {
  //   setData([...filtered()].filter((a) => a.cost !== 0));
  // };

  // const filterCost = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setData([...filtered()].filter((a) => a.cost <= value));
  // };

  // const restartForm = () => {
  //   setValue(0);
  //   setData(filtered());
  // };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap px-24 gap-4">
        {filtered().length === 0 ? (
          <div>Doesn't exist: {searchTerm}</div>
        ) : (
          data.map((arena) => {
            const { id, name, city, image, people, cost, status } = arena;

            return (
              <Card
                key={id}
                className={`cursor-pointer relative ${
                  status === "Pending" ? "hidden" : "block"
                }`}
              >
                <Link href={`/arena/${id}`}>
                  <img
                    src={image}
                    className="w-[320px] min-h-[200px] max-h-[201px]"
                  />
                  <CardHeader>
                    <CardTitle className="pb-2 text-lg p-0 w-full h-6">
                      {name}
                    </CardTitle>

                    <CardContent className="flex items-center gap-2 p-0 w-full h-6">
                      <FaRegMoneyBillAlt />
                      <div>{cost !== 0 ? <p>${cost}/h</p> : <p>Free</p>}</div>
                    </CardContent>
                    <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                      <CiLocationOn />
                      <div>{city}</div>
                    </CardContent>
                    <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                      <IoPeopleSharp />
                      <div>{people}</div>
                    </CardContent>
                  </CardHeader>
                </Link>
                <CardContent className="absolute flex items-center justify-center bg-slate-900 text-white top-1 right-1 p-2 rounded-md z-10">
                  <FavoriteBtn id={id} name={name} image={image} />
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Arenas;
