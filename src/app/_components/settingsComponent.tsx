"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getUserById } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "./errorComponent";
import EditPhotoDropdown from "./editPhotoDropdown";
import { Label } from "@/components/ui/label";
import Edit from "../settings/edit/page";
import { BiPencil } from "react-icons/bi";
import Link from "next/link";

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
          <div className="grid grid-cols-5 gap-10">
            {mySettings ? (
              <>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[100px] sm:w-[200px] mt-4">
                    <Label>Profile picture</Label>
                    {mySettings.image?.toString() === "" ? (
                      <div className="relative">
                        <div className="mt-2 flex items-center justify-center w-20 sm:w-40 h-20 sm:h-40 ml-2 bg-blue-600 text-white rounded-full text-6xl sm:text-8xl ">
                          {mySettings.name?.charAt(0).toLocaleUpperCase()}
                        </div>
                        <EditPhotoDropdown />
                      </div>
                    ) : (
                      <div className="relative">
                        <Image
                          src={mySettings.image as string}
                          width={100}
                          height={100}
                          className="mt-2 w-20 sm:w-40 h-20 sm:h-40 rounded-full"
                          alt="user image"
                        />
                        <EditPhotoDropdown />
                      </div>
                    )}
                  </div>
                </div>

                <div className=" relative col-span-2  flex flex-col gap-4 mt-4 bg-slate-600 p-4 rounded-lg">
                  <p> Name: {mySettings.name}</p>
                  <p> Email: {mySettings.email}</p>
                  <div className="absolute top-2 right-4 ">
                    <Link
                      href={"/settings/edit"}
                      className="flex items-center gap-1 underline-offset-4  text-slate-50 bg-[#22272e] px-3 py-1 rounded-md"
                    >
                      <BiPencil />
                      Edit
                    </Link>
                  </div>
                  <div className="absolute">
                    <Edit
                      id={id}
                      firstName={mySettings.name}
                      email={mySettings.email}
                      refetch={refetch}
                      update={update}
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div className="col-span-2"></div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingsComponent;
