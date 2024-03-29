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

export function Auth() {
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Log Into My Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="youremail@email.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" placeholder="••••••••" />
                </div>
              </CardContent>
              <CardFooter className="py-0">
                <Button className="w-full">Login</Button>
              </CardFooter>
              <div className="flex items-center justify-center flex-row">
                <div className="bg-slate-200 h-0.5 w-full mr-4 ml-6"></div>
                <p className="text-center py-2">or</p>
                <div className="bg-slate-200 h-0.5 w-full mr-6 ml-4"></div>
              </div>
              <CardFooter className="flex gap-4">
                <Button variant={"secondary"} className="w-full">
                  <FaGoogle className="text-xl" />
                </Button>
                <Button variant={"secondary"} className="w-full">
                  <FaGithub className="text-xl" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Create a new account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">First name</Label>
                  <Input id="name" type="name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col py-0">
                <Button className="w-full">Register</Button>
              </CardFooter>
              <div className="flex items-center justify-center flex-row">
                <div className="bg-slate-200 h-0.5 w-full mr-4 ml-6"></div>
                <p className="text-center py-2">or</p>
                <div className="bg-slate-200 h-0.5 w-full mr-6 ml-4"></div>
              </div>
              <CardFooter className="flex gap-4">
                <Button variant={"secondary"} className="w-full">
                  <FaGoogle className="text-xl" />
                </Button>
                <Button variant={"secondary"} className="w-full">
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