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
import { register } from "@/actions/register";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export function Auth() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
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
      console.log({ response });
      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
    } catch (error: any) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden sm:block ml-2">Login</Button>
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
              <form action={register}>
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
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
