"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@mui/material/Modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/actions/user";
import Loader from "./loader";
import { BiPencil } from "react-icons/bi";

type FormData = z.infer<typeof SettingsSchema>;

interface SettingsFormI {
  id: string | undefined;
  firstName: string;
  email: string;
  refetch: any;
  update: any;
}

const SettingsForm = ({
  id,
  firstName,
  email,
  refetch,
  update,
}: SettingsFormI) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      firstName: firstName || "",
      email: email || "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const editData = new FormData();
      editData.append("inputId", id || "");
      editData.append("firstName", formData.firstName);
      editData.append("email", formData.email);
      const response = await editUser(editData);

      startTransition(() => {
        refetch();
        update({
          firstName: formData.firstName,
          email: formData.email,
        });
      });

      await update(response);

      form.reset({
        firstName: formData.firstName,
        email: formData.email,
      });

      return toast({
        title: "Success!",
        description: "You have successfully updated your profile",
        variant: "success",
      });
    } catch (error) {
      console.error("Edit function failed", error);
      return toast({
        title: "Error",
        description: "Failed to update your profile",
        variant: "error",
      });
    }
  };
  return (
    <div>
      <Button
        variant={"outline"}
        onClick={handleOpen}
        className="border border-white flex items-center gap-1 underline-offset-4  text-slate-50 bg-[#22272e] px-3 py-1 rounded-md"
      >
        {/* <div className="flex items-center gap-1 underline-offset-4  text-slate-50 bg-[#22272e] px-3 py-1 rounded-md"> */}
        <BiPencil />
        Edit
        {/* </div> */}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center mb-12"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4 bg-slate-600 p-4 rounded-lg"
          >
            <Input
              type="hidden"
              name="inputId"
              defaultValue={id || ""}
              onChange={() => {}}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      {...field}
                      placeholder="First name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      placeholder="youremail@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="success" type="submit" className="w-32">
              {isPending ? (
                <Loader text={"Upload profile"} />
              ) : (
                "Upload profile"
              )}
            </Button>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingsForm;
