import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import UploadBtn from "./uploadBtn";
import DeleteBtn from "./deleteBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/actions/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "./loading";
import Loader from "./loader";

type FormData = z.infer<typeof SettingsSchema>;

const SettingsForm = ({ id, firstName, email }: any) => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");

  const onSubmit = async (formData: FormData) => {
    try {
      const editData = new FormData();
      editData.append("inputId", id || "");
      editData.append("firstName", formData.firstName);
      editData.append("email", formData.email);
      editData.append("image", url || "");

      const response = await editUser(editData);

      startTransition(() => {
        update({
          firstName: formData.firstName,
          email: formData.email,
          image: url || "",
        });
      });
      await update(response);

      return toast({
        title: "Success",
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

  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      firstName: firstName || "",
      email: email || "",
    },
  });

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

        <Button variant="success" type="submit">
          {isPending ? <Loader text={"Upload profile"} /> : "Upload profile"}
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
