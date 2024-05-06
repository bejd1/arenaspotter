"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import UploadBtn from "./uploadBtn";
import DeleteBtn from "./deleteBtn";
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";

interface SettingsModalI {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  image: string | undefined;
}

type Inputs = {
  name: string;
  email: string;
  image: string;
};

export default function SettingsModal({
  id,
  name,
  email,
  image,
}: SettingsModalI) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [url, setUrl] = useState(image);
  const [key, setKey] = useState("");
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <Button variant={"outline"} onClick={handleOpen}>
        <BiPencil className="text-xl" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <Card className="flex flex-col my-8 w-full h-[500px] overflow-auto sm:w-[600px] px-4 sm:px-32 py-8 relative">
          <h2 className="text-2xl font-bold text-center">Change profile</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-4 mt-4"
          >
            <Input
              type="hidden"
              name="inputId"
              defaultValue={id || ""}
              onChange={() => {}}
            />
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={newName || ""}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              value={newEmail || ""}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <Label>Image</Label>
            {url?.length === 0 ? (
              <div>
                <img src={url} alt="My image" />
                <DeleteBtn url={url} setUrl={setUrl} />
              </div>
            ) : (
              <UploadBtn setUrl={setUrl} setKey={setKey} />
            )}
            <Button variant="default" type="submit" className="mt-4">
              Change
            </Button>
            <IoMdClose
              onClick={handleClose}
              className="absolute top-4 right-4 cursor-pointer text-xl"
            />
          </form>
        </Card>
      </Modal>
    </div>
  );
}
