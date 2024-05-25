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
import { redirect } from "next/navigation";

const ReportsTable = () => {
  const { data: session } = useSession();
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getReport(),
  });

  const [openReportIds, setOpenReportIds] = useState<number[]>([]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;
  if (!session?.user) {
    redirect("/");
  }
  if (session?.user?.role !== "admin") return null;

  const toggleReportDetails = (reportId: any) => {
    if (openReportIds.includes(reportId)) {
      setOpenReportIds(openReportIds.filter((id) => id !== reportId));
    } else {
      setOpenReportIds([...openReportIds, reportId]);
    }
  };

  return (
    <>
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
                    {openReportIds.includes(report.id as any) ? (
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
                {openReportIds.includes(report.id as any) && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="w-full">
                        <p>Title: {report.title}</p>
                        <p>Message: {report.message}</p>
                        <p>Email: {report.email}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            );
          })}
        </Table>
      )}
    </>
  );
};

export default ReportsTable;
