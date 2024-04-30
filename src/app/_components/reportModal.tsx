"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { createReport } from "@/actions/report";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MdOutlineReportProblem } from "react-icons/md";
import { Tooltip } from "@mui/material";

export default function ReportModal({
  id,
  arenaName,
}: {
  id: string;
  arenaName: string | undefined;
}) {
  const { data: session } = useSession();
  const [email, setEmail] = useState(session?.user?.email?.toString());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <div>
      <Button
        variant={"outline"}
        onClick={handleOpen}
        className="border border-white"
      >
        <MdOutlineReportProblem className="text-xl" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center mb-12"
      >
        <Card className="flex flex-col my-8 w-[600px] px-12 py-8">
          <h2 className="text-2xl font-bold text-center">Report</h2>
          <form
            ref={ref}
            onSubmit={async (e) => {
              e.preventDefault();
              await handleCreateSubmit(
                new FormData(e.target as HTMLFormElement)
              );
            }}
            className="w-full"
          >
            <input name="arenaId" type="hidden" value={id} />
            <input name="name" type="hidden" value={arenaName} />
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
              className="mb-2"
              required
            />
            <Button type="submit">Report</Button>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
