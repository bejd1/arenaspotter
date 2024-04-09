"use client";
import React, { useRef, useState } from "react";
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
import { useSession } from "next-auth/react";
import { createReport } from "@/actions/report";

export function ReportArena({
  id,
  arenaName,
}: {
  id: string;
  arenaName: string | undefined;
}) {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email?.toString());
  const ref = useRef<HTMLFormElement>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createReport(formData);
      ref.current?.reset();
    } catch (error) {
      console.error("Edit function failed", error);
    }
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
          <form
            ref={ref}
            onSubmit={async (e) => {
              e.preventDefault();
              await handleCreateSubmit(
                new FormData(e.target as HTMLFormElement)
              );
            }}
          >
            <input name="arenaId" type="hidden" value={id} className="mb-2" />
            <input
              name="name"
              type="hidden"
              value={arenaName}
              className="mb-2"
            />
            <input
              name="email"
              type="hidden"
              value={session?.user?.email?.toString()}
              className="mb-2"
              onChange={handleNameChange}
            />
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Title"
              className="col-span-3"
              required
            />
            <Label htmlFor="username" className="text-right">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              required
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Report</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
