import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import SettingsForm from "./settingsForm";

interface SettingsModalI {
  id: string | undefined;
  firstName: string | undefined;
  email: string | undefined;
  image: string | null | undefined;
  update: any;
  refetch: any;
}

export default function SettingsModal({
  id,
  firstName,
  email,
  image,
  update,
  refetch,
}: SettingsModalI) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Card className="flex flex-col mx-8 sm:mx-0 my-6 w-full sm:w-[600px] px-8 sm:px-32 py-8 relative">
          <h2 className="text-2xl font-bold text-center">Change profile</h2>
          <SettingsForm
            image={image}
            firstName={firstName}
            email={email}
            id={id}
            handleClose={handleClose}
            update={update}
            refetch={refetch}
          />
        </Card>
      </Modal>
    </div>
  );
}
