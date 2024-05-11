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
  const firstName = session?.user?.name;
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
          <div className="flex flex-row w-full gap-4 my-6 sm:my-12 ml-2">
            <div className="flex flex-row gap-4 w-full">
              <div>
                {session?.user?.image?.toString() === undefined ? (
                  <div className="flex items-center justify-center w-20 sm:w-40 h-20 sm:h-40 ml-2 bg-blue-600 text-white rounded-full cursor-pointer text-6xl sm:text-8xl">
                    {session?.user?.name?.charAt(0).toLocaleUpperCase()}
                  </div>
                ) : (
                  <Image
                    src={session?.user?.image}
                    width={100}
                    height={100}
                    className="w-20 sm:w-40 h-20 sm:h-40 rounded-full"
                    alt="user image"
                  />
                )}
              </div>
              <div className="flex justify-between">
                {mySettings ? (
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className="font-bold">ID: {mySettings.id}</p>
                      <p className="font-bold">Name: {mySettings.name}</p>
                      <p>Password: {mySettings.password ?? "N/A"}</p>
                      <p>Email: {mySettings.email}</p>
                      <p>
                        Email Verified:
                        {mySettings.emailVerified?.toISOString() ?? "N/A"}
                      </p>
                      <p>Image: {mySettings.image ?? "N/A"}</p>
                      <p>Role: {mySettings.role}</p>
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
                ) : null}
              </div>
            </div>
          </div>
          <DeleteUserModal id={session?.user?.id} />
        </>
      )}
    </>
  );
};

export default SettingsComponent;
