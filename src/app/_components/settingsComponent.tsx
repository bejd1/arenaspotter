"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import SettingsModal from "../_components/settingsModal";
import Loading from "../_components/loading";

const SettingsComponent = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between gap-4 my-6 sm:my-12 ml-2">
            <div className="flex flex-row gap-4">
              <div>
                {session?.user?.image?.toString() === undefined ? (
                  <div className="flex items-center justify-center w-24 sm:w-40 h-24 sm:h-40 ml-2 bg-blue-600 text-white rounded-full cursor-pointer text-6xl sm:text-8xl">
                    {session?.user?.name?.charAt(0).toLocaleUpperCase()}
                  </div>
                ) : (
                  <img
                    src={session?.user?.image}
                    className="w-40 h-40 rounded-full"
                  />
                )}
              </div>
              <div>
                <p className="font-bold">Name: {session?.user?.name}</p>
                <p>Email: {session?.user?.email}</p>
                <p>Img: {session?.user?.image}</p>
              </div>
            </div>
            <SettingsModal
              id={session?.user?.id}
              name={session?.user?.name}
              email={session?.user?.email}
              image={session?.user?.image}
            />
          </div>
          <Button variant={"destructive"} className="w-max ml-2">
            Delete account
          </Button>
        </>
      )}
    </>
  );
};

export default SettingsComponent;
