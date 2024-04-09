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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getArenaByAuthor } from "@/actions/post";
import { PostT } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import EditPost from "../_components/editModal";

const MyArenas = () => {
  const { data: session } = useSession();
  const author = session?.user?.email;

  const {
    data: arenas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getArenaByAuthor(author as string),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12 mb-8">My arenas</h2>
      {arenas?.length !== 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-right">
                <p>Edit/Delete</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arenas &&
              arenas.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link href={`/arena/${post.id}`}>{post.name}</Link>
                  </TableCell>
                  <TableCell>{post.city}</TableCell>
                  <TableCell>{post.address}</TableCell>
                  <TableCell>{post.cost}$/h</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <EditPost post={post} />
                      <Button>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default MyArenas;
