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
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import { getReport } from "@/actions/report";
import DeleteReport from "../_components/deleteReport";

const Reports = () => {
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getReport(),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12 mb-8">Reports</h2>
      {!reports ? (
        <div>Empty</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          {reports.map((report) => {
            return (
              <TableBody key={report.id}>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link href={`/arena/${report.arenaId}`}>{report.name}</Link>
                  </TableCell>
                  <TableCell>{report.message}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.email}</TableCell>
                  <TableCell className="hidden">
                    <input
                      name="id"
                      id="id"
                      type="text"
                      value={report.id}
                      onChange={() => {}}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteReport id={report.id} />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Reports;
