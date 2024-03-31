"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { handleSignUpCredentials } from "@/actions/myreg";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";
import { FormEvent, useState } from "react";

export function Auth() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [email, setEmail] = useState<undefined | string>();
  const [password, setPassword] = useState<undefined | string>();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
    });
    console.log(email, password);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden sm:block">Login</Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:p-10">
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {/* Login */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Log Into My Account
                </CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="youremail@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="py-0">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </form>
              <div className="flex items-center justify-center flex-row">
                <div className="bg-slate-200 h-0.5 w-full mr-4 ml-6"></div>
                <p className="text-center py-2">or</p>
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
          </TabsContent>
          <TabsContent value="password">
            {/* Register */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Create a new account
                </CardTitle>
              </CardHeader>
              <form action={handleSignUpCredentials}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">First name</Label>
                    <Input
                      id="name"
                      type="name"
                      name="name"
                      placeholder="First Name"
                    />
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
                <p className="text-center py-2">or</p>
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
              {success ? <FormSuccess message={success} /> : <></>}
              {!error ? <FormError message={error} /> : <></>}
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
