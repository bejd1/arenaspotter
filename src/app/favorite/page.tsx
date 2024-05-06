import React from "react";
import FavoriteList from "../_components/favoriteList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite",
};

const Favorite = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2">
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        Favorite
      </h2>
      <FavoriteList />
    </div>
  );
};

export default Favorite;
