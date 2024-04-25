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
import { editStatusArena, getArenaByStatus } from "@/actions/newArena";
import Loading from "../_components/loading";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../_components/errorComponent";
import { useSession } from "next-auth/react";

const PanelAdmin = () => {
  const { data: session } = useSession();
  const {
    data: pendingPosts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingPosts"],
    queryFn: async () => await getArenaByStatus("Pending"),
  });
  const handleEditSubmit = async (formData: FormData) => {
    try {
      await editStatusArena(formData);
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  if (session?.user?.role !== "admin") return null;

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12 mb-8">Panel admin</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {pendingPosts &&
          pendingPosts.map((pendingPost) => {
            const { id, name, status } = pendingPost;
            return (
              <TableBody key={id}>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link href={id}>{name}</Link>
                  </TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="flex w-full justify-end items-right">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        refetch();
                        await handleEditSubmit(
                          new FormData(e.target as HTMLFormElement)
                        );
                      }}
                    >
                      <select
                        name="status"
                        defaultValue="pending"
                        onChange={() => {}}
                      >
                        <option value="accept">accept</option>
                        <option value="rejected">rejected</option>
                      </select>
                      <input type="hidden" name="inputId" value={id} />
                      <button type="submit">Change</button>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
      </Table>
    </div>
  );
};

export default PanelAdmin;
