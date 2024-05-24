import React from "react";
import { Metadata } from "next";
import ClientArenas from "./clientArena";

export const metadata: Metadata = {
  title: "Find your arena",
};

const Arena = () => {
  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <ClientArenas />
    </div>
  );
};

export default Arena;
