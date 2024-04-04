"use client";
import React, { useState } from "react";
import { getData } from "@/actions/post";
import Category from "../_components/category";
import Arenas from "../_components/arenas";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";

const Arena = ({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) => {
  const {
    data: arenas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getData(),
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  const filteredArenas = arenas.filter(
    (arena) =>
      arena.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arena.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arena.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredArenas.length === 0) {
    return (
      <div className="flex flex-col mt-8 items-center justify-center w-full">
        <h1 className="text-3xl font-extrabold mb-2">Arenas</h1>
        <Category searchTerm={searchTerm} handleSearch={handleSearch} />
        <div>Doesn't exist: {searchTerm}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <h1 className="text-3xl font-extrabold mb-2">Arenas</h1>
      <Category searchTerm={searchTerm} handleSearch={handleSearch} />
      <Arenas arenas={filteredArenas} />
    </div>
  );
};

export default Arena;
