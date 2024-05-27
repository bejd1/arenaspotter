"use client";
import React, { useState, useTransition } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/app/_components/loader";
import { editUserPassword } from "@/actions/user";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const userId = session?.user?.id;

  const handleEditSubmit = async (formData: FormData) => {
    try {
      await editUserPassword(formData);

      startTransition(() => {
        setSuccess("success");
        console.log("change pass");
      });
      return toast({
        title: "Success!",
        description: "You have successfully updated your product",
        variant: "success",
      });
    } catch (error) {
      setError("An error occurred while changing the password");
      console.error("Edit function failed", error);
    }
  };

  return (
    <div className="flex flex-col w-full justify-between px-4 sm:px-6 py-2 ">
      <h2 className="p-8 text-2xl">My profile - change password</h2>

      <form
        className="relative col-span-2 w-[500px] flex flex-col gap-4 mt-4 bg-slate-600 mx-20  p-4 rounded-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          await handleEditSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <Label>Old password</Label>
        <input type="hidden" name="inputId" value={userId} />
        <Input
          placeholder="Old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <Label>New password</Label>
        <Input
          placeholder="New password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Label>Confirm new password</Label>
        <Input
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <span className="text-[10px] text-slate-300">
          Make sure it's at least 15 characters OR at least 8 characters
          including a number and a lowercase letter.
        </span>
        <Button type="submit" variant={"success"}>
          {isPending ? <Loader text={"Change password"} /> : "Change password"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
