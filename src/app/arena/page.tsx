"use client";
import React, { useEffect, useState } from "react";
import { getArena } from "@/actions/arena";
import Category from "../_components/category";
import Arenas from "../_components/arenas";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "../_components/errorComponent";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const Arena = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [forceRefresh, setForceRefresh] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category");
  let sortByCost = searchParams.get("sortByCost") || "";
  let sortByPeople = searchParams.get("sortByPeople") || "";

  if (sortByCost && sortByPeople) {
    sortByPeople = "";
  }

  const {
    data: arenas = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["arenas", sortByCost, sortByPeople],
    queryFn: async () => await getArena(sortByCost, sortByPeople, category),
  });

  useEffect(() => {
    refetch();
  }, [forceRefresh]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  const filteredArenas = arenas.filter(
    (arena) =>
      (arena.city?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (arena.street?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (arena.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      <Category searchTerm={searchTerm} handleSearch={handleSearch} />
      <Arenas arenas={filteredArenas} searchTerm={searchTerm} />
    </div>
  );
};

export default Arena;
