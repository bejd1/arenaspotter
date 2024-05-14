"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Link from "next/link";
import { PostT } from "@/types/types";
import { useSearchParams } from "next/navigation";
import FavoriteBtn from "./favoriteBtn";
import InfiniteScroll from "react-infinite-scroller";
import Image from "next/image";

const ArenasData = ({ arenas }: { arenas: PostT[] }) => {
  const [data, setData] = useState<PostT[]>([]);
  const [sortedArenas, setSortedArenas] = useState<PostT[]>([]);
  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    setSortedArenas(arenas);
    setData(arenas.slice(0, 10));
  }, [arenas]);

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
      return sortedArenas;
    }
  };

  const loadMore = () => {
    const currentLength = data.length;
    const newItems = filtered().slice(currentLength, currentLength + 10);
    setData([...data, ...newItems.slice(0, 10)]);
  };

  return (
    <div className="flex flex-col w-full px-4">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={data.length < filtered().length}
        loader={
          <div className="loader" key={0}>
            Loading...
          </div>
        }
        threshold={200}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 sm:px-8 gap-4">
          {filtered().length === 0 ? (
            <div className="col-span-full flex justify-center">
              <div className="text-center">Doesn&apos;t exist: nic</div>
            </div>
          ) : (
            data.map((arena) => {
              const { id, name, city, street, image, people, cost, status } =
                arena;

              return (
                <div key={id}>
                  <Card
                    className={`cursor-pointer relative p-0 ${
                      status === "Pending" ? "hidden" : "block"
                    }`}
                  >
                    <Link href={`/arena/${id}`}>
                      <Image
                        src={image}
                        width={220}
                        height={200}
                        alt="Arena image"
                        className="w-full min-h-[199px] max-h-[200px] object-cover"
                      />
                      <CardHeader className="sm:p-3">
                        <CardTitle className="pb-2 text-lg p-0 w-full h-6">
                          {name}
                        </CardTitle>

                        <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                          <FaRegMoneyBillAlt />
                          <div>
                            {cost !== 0 ? <p>${cost}/h</p> : <p>Free</p>}
                          </div>
                        </CardContent>
                        <CardContent className="flex flex-col p-0 w-full">
                          <div className="flex items-center  h-6">
                            <CiLocationOn className="mr-[2px]" />
                            <p className="text-sm">{city}</p>
                          </div>
                          <div className="flex gap-1 items-center h-6 mt-[6px]">
                            <FaLocationCrosshairs />
                            <p className="text-sm">Ul. {street}</p>
                          </div>
                        </CardContent>
                        <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                          <IoPeopleSharp />
                          <div>{people}</div>
                        </CardContent>
                      </CardHeader>
                    </Link>
                    <CardContent className="absolute flex items-center justify-center bg-slate-900 text-white top-1 right-1 p-2 rounded-md z-10">
                      <FavoriteBtn
                        id={id}
                        name={name}
                        image={image}
                        city={city}
                        street={street}
                        cost={cost}
                        people={people}
                      />
                    </CardContent>
                  </Card>
                </div>
              );
            })
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ArenasData;
