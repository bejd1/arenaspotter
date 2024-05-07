"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormError } from "./formError";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);
    const { email, password } = data;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ response });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }
      if (response.error) {
        setError("Invalid email or password");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:px-6">
        <CardTitle className="text-2xl text-center">
          Log Into My Account
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
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
                  <FormMessage className="m-0 p-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-0">Password</FormLabel>
                  <FormControl className="m-0">
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage className="m-0" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-0">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Form>
      <div className="mt-4">
        <FormError message={error} />
      </div>
      <div className="flex items-center justify-center flex-row">
        <div className="bg-slate-200 h-0.5 w-full mr-4 ml-6"></div>
        <p className="text-center text-sm py-2">or</p>
        <div className="bg-slate-200 h-0.5 w-full mr-6 ml-4"></div>
      </div>
      <CardFooter className="flex gap-4">
        <Button
          onClick={() => signIn("google")}
          variant={"secondary"}
          className="w-full"
        >
          <FaGoogle className="text-xl" />
        </Button>
        <Button
          onClick={() => signIn("github")}
          variant={"secondary"}
          className="w-full"
        >
          <FaGithub className="text-xl" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
