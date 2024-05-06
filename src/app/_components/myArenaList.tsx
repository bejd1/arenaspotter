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
import { useSession } from "next-auth/react";
import { getArenaByAuthor, getArenaById } from "@/actions/arena";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import EditPost from "./editModal";
import DeletePost from "./deletePost";
import ErrorComponent from "./errorComponent";

const MyArenaList = () => {
  const { data: session, status } = useSession();
  const [myId, setMyId] = useState("");

  const { data: arenas = [], isError } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getArenaByAuthor(myId),
    enabled: !!myId,
  });

  useEffect(() => {
    if (session?.user?.id) {
      setMyId(session?.user?.id);
    }
  }, [session]);

  if (isError) return <ErrorComponent />;

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          {arenas?.length !== 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="hidden sm:block">Adress</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right p-0">
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
                      <TableCell className="hidden sm:block">
                        {post.street}
                      </TableCell>
                      <TableCell>{post.cost}$/h</TableCell>

                      <TableCell className="text-right p-0">
                        <div className="flex justify-end">
                          <EditPost post={post} />
                          <DeletePost id={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div>Empty</div>
          )}
        </>
      )}
    </>
  );
};

export default MyArenaList;
