"use client";
import React, { useState } from "react";
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
import ErrorComponent from "../_components/errorComponent";
import { useSession } from "next-auth/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Reports = () => {
  const { data: session } = useSession();
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getReport(),
  });

  const [openReportId, setOpenReportId] = useState(null);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  if (session?.user?.role !== "admin") return null;

  const toggleReportDetails = (reportId: any) => {
    setOpenReportId(openReportId === reportId ? null : reportId);
  };

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        Reports
      </h2>
      {!reports ? (
        <div>Empty</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="hidden sm:block">Contact</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead className="text-right">More</TableHead>
            </TableRow>
          </TableHeader>
          {reports.map((report) => {
            return (
              <TableBody key={report.id}>
                <TableRow>
                  <TableCell className="font-medium">
                    <Link href={`/arena/${report.arenaId}`}>{report.name}</Link>
                  </TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.message}</TableCell>
                  <TableCell className="hidden sm:block">
                    {report.email}
                  </TableCell>
                  <TableCell>
                    <DeleteReport id={report.id} />
                  </TableCell>
                  <TableCell className="text-right">
                    {openReportId === report.id ? (
                      <IoIosArrowUp
                        className="cursor-pointer"
                        onClick={() => toggleReportDetails(report.id)}
                      />
                    ) : (
                      <IoIosArrowDown
                        className="cursor-pointer"
                        onClick={() => toggleReportDetails(report.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
                {openReportId === report.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="w-full h-20">Title {report.title}</div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Reports;
