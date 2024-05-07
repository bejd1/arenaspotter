"use client";
import React, { useState, useTransition } from "react";
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
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { register } from "@/actions/register";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";
import Loader from "./loader";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await register(formData);
    startTransition(() => {
      if (result.error) {
        setError(result.error);
        setSuccess(undefined);
      } else {
        setSuccess(result.success);
        setError(undefined);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:px-6">
        <CardTitle className="text-2xl text-center">
          Create a new account
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">First name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="First Name"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="youremail@email.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
            <Input
              id="new"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col py-0">
          <Button
            disabled={isPending}
            className="w-full"
            name="submit"
            type="submit"
          >
            {isPending ? <Loader text={"Create account"} /> : "Create account"}
          </Button>
        </CardFooter>
      </form>
      <div className="mt-4">
        <FormSuccess message={success} />
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

export default RegisterForm;
