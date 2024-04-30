"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFavoriteArena,
  selectFavoriteArena,
} from "@/features/favorite/favoriteSlice";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import { PostT } from "@/types/types";
import ErrorComponent from "../_components/errorComponent";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import FavoriteBtn from "../_components/favoriteBtn";
import { Button } from "@/components/ui/button";

const Favorite = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: favoriteArenaData = [] as PostT[],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["favoriteArenaData"],
    queryFn: async () => await favoriteArena,
  });

  const favoriteArena = useSelector(selectFavoriteArena);
  const dispatch = useDispatch();

  const handleRemoveFavorite = async (id: string) => {
    await dispatch(removeFavoriteArena(id));

    refetch();
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        Favorite
      </h2>

      {favoriteArenaData.length < 0 ? (
        <div className="flex flex-col items-center justify-center h-[45vh] p-8 sm:p-0">
          <div className="flex flex-col justify-center  gap-1">
            <h2 className="text-xl font-bold">
              Your favorite list is empty 🙄
            </h2>
            <h3>
              If you add something to your favorite list it will appear here.
            </h3>
            <Link href={"/arena"}>
              <Button variant={"default"} className="mt-2">
                Arena
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-2 sm:px-8 gap-4">
          {isClient &&
            favoriteArenaData.map((favArena) => {
              return (
                <div key={favArena.id}>
                  <Card className={`cursor-pointer relative`}>
                    <Link href={`/arena/${favArena.id}`}>
                      <Image
                        src={favArena.image || ""}
                        width={220}
                        height={200}
                        alt="Arena image"
                        className="w-full min-h-[199px] max-h-[200px] object-cover"
                      />
                      <CardHeader className="p-3 sm:p-4">
                        <CardTitle className="pb-2 text-lg p-0 w-full h-6">
                          {favArena.name}
                        </CardTitle>

                        <CardContent className="flex items-center gap-2 p-0 w-full h-6">
                          <FaRegMoneyBillAlt />
                          <div>
                            {favArena.cost !== 0 ? (
                              <p>${favArena.cost}/h</p>
                            ) : (
                              <p>Free</p>
                            )}
                          </div>
                        </CardContent>
                        <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                          <CiLocationOn />
                          <p className="text-sm">
                            {favArena.city}, {favArena.street}
                          </p>
                        </CardContent>
                        <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                          <IoPeopleSharp />
                          <div>{favArena.people}</div>
                        </CardContent>
                      </CardHeader>
                    </Link>
                    <CardContent
                      onClick={() => {
                        handleRemoveFavorite(favArena.id!);
                      }}
                      className="absolute flex items-center justify-center bg-slate-900 text-white top-1 right-1 p-2 rounded-md z-10"
                    >
                      <FavoriteBtn
                        id={favArena.id}
                        name={favArena.name}
                        image={favArena.image}
                        city={favArena.city}
                        street={favArena.street}
                        cost={favArena.cost}
                        people={favArena.people}
                      />
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Favorite;
