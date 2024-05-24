"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { editUser } from "@/actions/user";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Loader from "@/app/_components/loader";
import { Input } from "@/components/ui/input";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof SettingsSchema>;

interface SettingsFormI {
  id: string | undefined;
  firstName: string;
  email: string;
  refetch: any;
  update: any;
}

const Edit = ({ id, firstName, email, refetch, update }: SettingsFormI) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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

      router.push("/settings");
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
    <div className="flex items-center justify-center h-[70vh]">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[500px] gap-4 mt-4 bg-slate-600 p-4 rounded-lg"
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
            {isPending ? <Loader text={"Upload profile"} /> : "Upload profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Edit;
