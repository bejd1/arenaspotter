import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReportSchema } from "@/schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createReport } from "@/actions/report";

interface ReportI {
  myEmail: string | undefined;
  arenaName: string | undefined;
  id: string;
  handleClose: any;
}

type FormData = z.infer<typeof ReportSchema>;

const ReportForm = ({ myEmail, id, arenaName, handleClose }: ReportI) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const reportData = new FormData();
      reportData.append("title", formData.title);
      reportData.append("message", formData.message);

      const arenaNameValue = arenaName || "";
      const myEmailValue = myEmail || "";

      await createReport(reportData, id, arenaNameValue, myEmailValue);
      form.reset();
      startTransition(() => {
        handleClose();
      });
      return toast({
        title: "Success",
        description: "You have successfully report arena",
        variant: "success",
      });
    } catch (error) {
      console.error("Edit function failed", error);
      return toast({
        title: "Error",
        description: "Failed to report arena",
        variant: "error",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <input name="arenaId" type="hidden" value={id} />
        <input name="name" type="hidden" value={arenaName} />
        <input name="email" type="hidden" value={myEmail} className="mb-2" />
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input id="title" type="text" {...field} placeholder="Title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input
                  id="message"
                  type="text"
                  {...field}
                  placeholder="Message"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-1">
          Report
        </Button>
      </form>
    </Form>
  );
};

export default ReportForm;
