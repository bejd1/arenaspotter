"use client";
import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useSelector } from "react-redux";
import { selectFavoriteArena } from "@/features/favorite/favoriteSlice";

const NavIcons = () => {
  const favoriteArena = useSelector(selectFavoriteArena);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Link className="relative" href={"/favorite"}>
        <Tooltip title="Favorite">
          <Button variant={"outline"} size="icon">
            <AiOutlineStar className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
        {isClient && favoriteArena.length > 0 && (
          <div
            className={`absolute bottom-6 right-0 flex items-center justify-center  h-4 w-4 rounded-full p-2 text-sm   ${
              favoriteArena.length > 9 && "text-[11px]"
            } bg-blue-600 text-white`}
          >
            {favoriteArena.length}
          </div>
        )}
      </Link>
      <ModeToggle />
      <Link href={"/create-post"}>
        <Tooltip title="Create new...">
          <Button variant={"outline"} size="icon">
            <AiOutlinePlus className="text-xl cursor-pointer" />
          </Button>
        </Tooltip>
      </Link>
    </div>
  );
};

export default NavIcons;
