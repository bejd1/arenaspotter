"use client";
import React, { useState } from "react";
import { getArena } from "@/actions/arena";
import Category from "../_components/category";
import Arenas from "../_components/arenas";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "../_components/errorComponent";

const Arena = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: arenas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getArena(),
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  const filteredArenas = arenas.filter(
    (arena) =>
      (arena.city?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (arena.address?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (arena.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <h1 className="text-3xl font-extrabold mb-2">Arenas</h1>
      <Category searchTerm={searchTerm} handleSearch={handleSearch} />
      <Arenas arenas={filteredArenas} searchTerm={searchTerm} />
    </div>
  );
};

export default Arena;
