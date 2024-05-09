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
import { LoginSchema } from "@/schemas";
import Loader from "./loader";

type FormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);
    const { email, password } = data;

    try {
      const response: any = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      startTransition(() => {
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
      });
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
          <CardContent className="m-0">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      placeholder="••••••••"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="py-0">
            <Button
              disabled={isPending}
              className="w-full"
              name="submit"
              type="submit"
            >
              {isPending ? <Loader text={"Login"} /> : "Login"}
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
