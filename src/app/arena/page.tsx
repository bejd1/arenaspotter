import React from "react";
import Arenas from "../_components/arenas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find your arena",
};

const Arena = () => {
  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <Arenas />
    </div>
  );
};

export default Arena;
