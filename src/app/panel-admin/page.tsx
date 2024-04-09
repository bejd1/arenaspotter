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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PanelAdmin = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12 mb-8">Panel admin</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Link href={"/arena/66101025b8b0a9aafce6219e"}>Orlik 2000</Link>
            </TableCell>
            <TableCell>Waiting</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex w-full justify-end items-right">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Accept</SelectItem>
                  <SelectItem value="dark">Reject</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Link href={"/arena/6610105eb8b0a9aafce621a1"}>Orlik Krakov</Link>
            </TableCell>
            <TableCell>Waiting</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex w-full justify-end items-right">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Accept</SelectItem>
                  <SelectItem value="dark">Reject</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Link href={"/arena/6610105eb8b0a9aafce621a1"}>Orlik Krakov</Link>
            </TableCell>
            <TableCell>Waiting</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="flex w-full justify-end items-right">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Accept</SelectItem>
                  <SelectItem value="dark">Reject</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PanelAdmin;
