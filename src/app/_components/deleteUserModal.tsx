"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { deleteUser } from "@/actions/user";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function DeleteUserModal({ id }: { id: string | undefined }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDeleteSubmit = async (formData: FormData) => {
    try {
      await deleteUser(formData);

      startTransition(() => {
        handleClose();
      });
      router.push("/");
      signOut();
      toast({
        title: "Success!",
        description: "You delete your account",
        variant: "success",
      });
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant={"destructive"}
        className="w-max ml-2"
      >
        Delete account
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center mb-12"
      >
        <Card className="flex flex-col gap-2 my-8 w-full sm:w-[400px] px-4 sm:px-12 py-8 mx-4 relative">
          <h2 className="text-xl">Really want to delete account?</h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={handleClose} variant={"default"}>
              No
            </Button>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleDeleteSubmit(
                  new FormData(e.target as HTMLFormElement)
                );
              }}
              className=""
            >
              <Input
                type="hidden"
                name="inputId"
                defaultValue={id}
                onChange={() => {}}
              />
              <Button
                variant={"destructive"}
                disabled={isPending}
                type="submit"
                className="bg-red-600 hover:bg-red-500"
              >
                {!isPending ? "Yes" : "Deleting..."}
              </Button>
            </form>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
