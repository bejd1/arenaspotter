"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import SettingsModal from "../_components/settingsModal";
import Loading from "../_components/loading";

const Settings = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-3xl mt-12">Settings</h2>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between gap-4 my-12">
            <div className="flex flex-row gap-4">
              <div>
                {session?.user?.image?.toString() === undefined ? (
                  <div className="flex items-center justify-center w-40 h-40 ml-2 bg-blue-600 text-white rounded-full cursor-pointer text-8xl">
                    {session?.user?.name?.charAt(0).toLocaleUpperCase()}
                  </div>
                ) : (
                  <img
                    src={session?.user?.image?.toString()}
                    className="w-40 h-40 rounded-full"
                  />
                )}
              </div>
              <div>
                <p className="font-bold">Name: {session?.user?.name}</p>
                <p>Email: {session?.user?.email}</p>
                <p>Img: {session?.user?.image}</p>
                <p>Role: {session?.user?.role}</p>
                <p>Id: {session?.user?.id}</p>
              </div>
            </div>
            <SettingsModal
              id={session?.user?.id}
              name={session?.user?.name}
              email={session?.user?.email}
              image={session?.user?.image}
            />
          </div>
          <Button variant={"destructive"} className="w-max">
            Delete account
          </Button>
        </>
      )}
    </div>
  );
};

export default Settings;
