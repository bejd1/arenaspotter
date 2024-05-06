import React from "react";

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

const RegisterForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Create a new account
        </CardTitle>
      </CardHeader>
      <form action={register}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">First name</Label>
            <Input id="name" type="name" name="name" placeholder="First Name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="youremail@email.com"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
            <Input
              id="new"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col py-0">
          <Button type="submit" name="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </form>
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
