"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SettingsModal from "../_components/settingsModal";
import DeleteUserModal from "./deleteUserModal";
import Image from "next/image";
import { getUserById } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "./errorComponent";

type mySettingsI = {
  id: string;
  name: string;
  password: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  role: string;
} | null;

const SettingsComponent = () => {
  const { data: session, status, update } = useSession();
  const id = session?.user?.id;

  const {
    data: mySettings,
    isLoading,
    isError,
    refetch,
  } = useQuery<mySettingsI>({
    queryKey: ["mySettings"],
    queryFn: async () => await getUserById(id || ""),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <div>
            {mySettings ? (
              <div className="flex gap-4">
                <div className="w-[100px] sm:w-[200px]">
                  {mySettings.image?.toString() === "" ? (
                    <div className="flex items-center justify-center w-20 sm:w-40 h-20 sm:h-40 ml-2 bg-blue-600 text-white rounded-full cursor-pointer text-6xl sm:text-8xl">
                      {mySettings.name?.charAt(0).toLocaleUpperCase()}
                    </div>
                  ) : (
                    <Image
                      src={mySettings.image as string}
                      width={100}
                      height={100}
                      className="w-20 sm:w-40 h-20 sm:h-40 rounded-full"
                      alt="user image"
                    />
                  )}
                </div>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="font-bold">First name: {mySettings.name}</p>
                    <p>Email: {mySettings.email}</p>
                    <p>Register on: {mySettings.createdAt.toString()}</p>
                  </div>

                  <SettingsModal
                    id={mySettings.id}
                    firstName={mySettings.name}
                    email={mySettings.email}
                    image={mySettings.image}
                    refetch={refetch}
                    update={update}
                  />
                </div>
              </div>
            ) : null}
          </div>
          <DeleteUserModal id={session?.user?.id} />
        </>
      )}
    </>
  );
};

export default SettingsComponent;
