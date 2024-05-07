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
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  message: string;
};
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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

  const handleCombinedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(ref.current as HTMLFormElement);
    await handleSubmit((data) => {
      handleCreateSubmit(formData);
      onSubmit(data);
      handleClose();
    })(e);
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
        <Card className="flex flex-col gap-2 my-8 w-full sm:w-[600px] px-4 sm:px-12 py-8 mx-4 relative">
          <h2 className="text-2xl font-bold text-center">Report</h2>
          <form
            ref={ref}
            onSubmit={handleCombinedSubmit}
            className="w-full flex flex-col gap-1 items-start"
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
            <Label
              htmlFor="name"
              className={`${errors.title ? "text-red-700" : ""}`}
            >
              Title
            </Label>
            <Input
              {...register("title", { required: true })}
              id="title"
              name="title"
              placeholder="Title"
              className={`col-span-3 ${
                errors.title ? "border border-red-700" : ""
              }`}
            />
            {errors.title && (
              <span className="text-red-700">This field is required</span>
            )}
            <Label
              htmlFor="username"
              className={`${errors.message ? "text-red-700" : ""}`}
            >
              Message
            </Label>
            <Textarea
              {...register("message", { required: true })}
              id="message"
              name="message"
              placeholder="Message"
              className={`h-28 border border-red-400 `}
              style={{
                border: `${errors.message ? "1px solid red" : ""}`,
              }}
            />
            {errors.message && (
              <span className="text-red-700">This field is required</span>
            )}
            <Button type="submit" className="mt-1">
              Report
            </Button>
          </form>
          <IoMdClose
            onClick={handleClose}
            className="absolute top-4 right-4 cursor-pointer text-xl"
          />
        </Card>
      </Modal>
    </div>
  );
}
