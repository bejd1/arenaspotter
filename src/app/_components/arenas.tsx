"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import Link from "next/link";
import { PostT } from "@/types/types";
import { useSearchParams } from "next/navigation";
import FavoriteBtn from "./favoriteBtn";
import InfiniteScroll from "react-infinite-scroller";

const Arenas = ({
  arenas,
  searchTerm,
}: {
  arenas: PostT[];
  searchTerm: string;
}) => {
  const [data, setData] = useState<PostT[]>([]);
  const [sortedArenas, setSortedArenas] = useState<PostT[]>([]);
  const params = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    setSortedArenas(arenas);
    setData(arenas.slice(0, 10)); // Initially show only 10 items
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
    // Load more items (e.g., next 10 items) when the user scrolls
    const currentLength = data.length;
    const newItems = filtered().slice(currentLength, currentLength + 10);
    setData([...data, ...newItems.slice(0, 10)]); // Changed here
  };

  return (
    <div className="flex flex-col">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={data.length < filtered().length} // Check if there are more items to load
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        threshold={200}
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default Arenas;
