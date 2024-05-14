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
import { getArenaByAuthor } from "@/actions/arena";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import EditPost from "./editModal";
import DeletePost from "./deletePost";
import ErrorComponent from "./errorComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DropdownActions from "./dropdownActions";

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
                  <TableHead>Status areana</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right p-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arenas &&
                  arenas.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <Link href={`/arena/${post.id}`}>{post.name}</Link>
                      </TableCell>
                      <TableCell>
                        {post.status === "accept" && (
                          <Badge variant="success">Accept</Badge>
                        )}
                        {post.status === "pending" && (
                          <Badge variant="pending">Pending</Badge>
                        )}
                        {post.status === "rejected" && (
                          <Badge variant="rejected">Rejected</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {post.premium === "false" ? (
                          <Badge variant={"pending"}>Free</Badge>
                        ) : (
                          <Badge variant={"success"}>Premium</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex sm:hidden justify-end">
                          <DropdownActions post={post} id={post.id} />
                        </div>
                        <div className="hidden sm:flex justify-end gap-1">
                          <Button variant={"success"}>Upgrade</Button>
                          <EditPost post={post} />
                          <DeletePost id={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-[45vh] p-8 sm:p-0">
              <div className="flex flex-col justify-center gap-1">
                <h2 className="text-xl font-bold">
                  Your arena list is empty 🙄
                </h2>
                <h3>If you add arenat it will appear here.</h3>
                <Link href={"/create-post"}>
                  <Button variant={"default"} className="mt-2">
                    Create post
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyArenaList;
