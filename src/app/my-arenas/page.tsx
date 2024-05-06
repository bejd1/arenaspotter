import { Metadata } from "next";
import React from "react";
import MyArenaList from "../_components/myArenaList";

export const metadata: Metadata = {
  title: "My arenas",
};

const MyArenas = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        My arenas
      </h2>
      <MyArenaList />
    </div>
  );
};

export default MyArenas;
