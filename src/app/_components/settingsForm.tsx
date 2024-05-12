"use client";
import React, { useState, useTransition } from "react";
import UploadBtn from "./uploadBtn";
import DeleteBtn from "./deleteBtn";
import { IoMdClose } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editUser } from "@/actions/user";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

interface SettingsI {
  image: string | null | undefined;
  firstName: string | undefined;
  email: string | undefined;
  id: string | undefined;
  handleClose: () => void;
  update: any;
  refetch: any;
}

type FormData = z.infer<typeof SettingsSchema>;

const SettingsForm = ({
  image,
  firstName,
  email,
  id,
  handleClose,
  update,
  refetch,
}: SettingsI) => {
  const [url, setUrl] = useState(image);
  const [key, setKey] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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
      editData.append("image", url || "");

      const response = await editUser(editData);

      startTransition(() => {
        refetch();
        handleClose();
        update({
          firstName: formData.firstName,
          email: formData.email,
          image: url || "",
        });
      });
      await update(response);

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <Input
          type="hidden"
          name="inputId"
          defaultValue={id || ""}
          onChange={() => {}}
        />
        <Input
          type="hidden"
          name="image"
          defaultValue={url || ""}
          onChange={() => {}}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
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
        {/* image */}
        <Label>Image</Label>
        {url?.length !== 0 ? (
          <div>
            <Image src={url || ""} width={100} height={100} alt="My image" />
            <DeleteBtn url={url} setUrl={setUrl} />
          </div>
        ) : (
          <UploadBtn setUrl={setUrl} setKey={setKey} />
        )}

        <Button variant="default" type="submit">
          Change
        </Button>
        <IoMdClose
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-xl"
        />
      </form>
    </Form>
  );
};

export default SettingsForm;
