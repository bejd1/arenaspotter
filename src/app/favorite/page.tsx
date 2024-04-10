"use client";
import React from "react";
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
  selectFavoriteFootballFields,
} from "@/features/counter/favoriteSlice";

const Favorite = () => {
  const favoriteArena = useSelector(selectFavoriteFootballFields);
  const dispatch = useDispatch();

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
          {favoriteArena.map((favArena) => {
            return (
              <TableRow key={favArena.id}>
                <TableCell className="font-medium">
                  <Link href={`/arena/${favArena.id}`}>{favArena.name}</Link>
                </TableCell>
                <TableCell>{favArena.id}</TableCell>
                <TableCell className="text-right">
                  <button
                    className="border border-white py-2 px-4"
                    onClick={() => {
                      dispatch(removeFavoriteArena(favArena.id));
                    }}
                  >
                    WYJEB MNIE
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
