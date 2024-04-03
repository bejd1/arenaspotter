"use client";
import React, { useState } from "react";
import { getData } from "@/actions/post";
import Category from "../_components/category";
import SandboxPreview from "../_components/loading";
import Arenas from "../_components/arenas";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import SearchInput from "../_components/searchInput";

const Arena = () => {
  const {
    data: arenas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas"],
    queryFn: async () => await getData(),
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <SandboxPreview />;
  if (isError) return <div>Error</div>;

  const filteredArenas = arenas.filter(
    (arena) =>
      arena.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arena.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arena.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <h1 className="text-2xl font-extrabold mb-2">Arenas</h1>
      <Category />
      <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
      <Arenas arenas={filteredArenas} />
    </div>
  );
};

export default Arena;
