"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
// import FavoriteBtn from "../_components/favoriteBtn";

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
      <h2 className="text-3xl mt-12 mb-8">Favorite</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isClient &&
            favoriteArenaData.map((favArena) => {
              return (
                <TableRow key={favArena.id}>
                  <TableCell className="font-medium">
                    <Link href={`/arena/${favArena.id}`}>{favArena.name}</Link>
                  </TableCell>
                  <TableCell>
                    <p>{favArena.id}</p>
                  </TableCell>

                  <TableCell className="text-right">
                    {/* <FavoriteBtn
                      id={favArena.id}
                      name={favArena.name}
                      image={favArena.image}
                    /> */}
                    <button
                      className="border border-white py-2 px-4"
                      onClick={() => {
                        handleRemoveFavorite(favArena.id!); // Use the handleRemoveFavorite function
                      }}
                    >
                      Remove
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Favorite;
