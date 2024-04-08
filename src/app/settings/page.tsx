"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";

const Settings = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12">Settings</h2>
      <div className="flex gap-4 my-12">
        <img
          src={session?.user?.image?.toString()}
          className="w-40 h-40 rounded-full"
        />
        <div>
          <p className="font-bold">Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      </div>
      <Button variant={"destructive"} className="w-max">
        Delete account
      </Button>
    </div>
  );
};

export default Settings;
