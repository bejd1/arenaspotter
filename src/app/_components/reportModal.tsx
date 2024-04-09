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

export default function ReportModal({
  id,
  arenaName,
}: {
  id: string;
  arenaName: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    <div>
      <Button onClick={handleOpen}>REPORT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-center justify-center w-full h-[90vh]">
          <Card className="w-[600px] p-4">
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
                <input
                  name="arenaId"
                  type="hidden"
                  value={id}
                  className="mb-2"
                />
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
                <Button type="submit">Report</Button>
              </form>
            </div>
          </Card>
        </div>
      </Modal>
    </div>
  );
}
