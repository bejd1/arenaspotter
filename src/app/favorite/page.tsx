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
import { Button } from "@/components/ui/button";

const Favorite = () => {
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
          <TableRow>
            <TableCell className="font-medium">
              <Link href={"/arena/66101025b8b0a9aafce6219e"}>Orlik 2000</Link>
            </TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Favorite;
