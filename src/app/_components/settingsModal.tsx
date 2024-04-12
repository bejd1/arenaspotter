"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";

interface SettingsModalI {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  image: string | undefined;
}

export default function SettingsModal({
  id,
  name,
  email,
  image,
}: SettingsModalI) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newImage, setNewImage] = useState(image);

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
        className="flex items-center justify-center"
      >
        <Card className="flex flex-col my-8 w-[600px] px-32 py-8">
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
            <Input
              type="text"
              name="image"
              placeholder="Image"
              value={newImage || ""}
              onChange={(e) => setNewImage(e.target.value)}
              required
            />

            <Button variant="default" type="submit" className="mt-4">
              Create post
            </Button>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
