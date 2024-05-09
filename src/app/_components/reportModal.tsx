"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ReportForm from "./reportForm";

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
  const [isPending, startTransition] = useTransition();

  const myEmail = session?.user?.email?.toString();

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
        <Card className="flex flex-col gap-2 my-8 w-full sm:w-[400px] px-4 sm:px-12 py-8 mx-4 relative">
          <h2 className="text-2xl font-bold text-center">Report</h2>
          <ReportForm
            myEmail={myEmail}
            id={id}
            arenaName={arenaName}
            handleClose={handleClose}
          />
          <IoMdClose
            onClick={handleClose}
            className="absolute top-4 right-4 cursor-pointer text-xl"
          />
        </Card>
      </Modal>
    </div>
  );
}
