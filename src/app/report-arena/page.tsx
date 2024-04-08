"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ReportArena({
  id,
  arenaName,
}: {
  id: string;
  arenaName: string | undefined;
}) {
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Report</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {arenaName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="inputId" value={id} />
            <Label htmlFor="name" className="text-right">
              Your email
            </Label>
            <Input
              id="Email"
              value={id}
              onChange={handleNameChange}
              className="col-span-3"
            />
            <Label htmlFor="username" className="text-right">
              Problem
            </Label>
            <Textarea />
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
