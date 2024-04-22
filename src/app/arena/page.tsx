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

  const handleRefresh = () => {
    setForceRefresh(!forceRefresh); // Zmiana wartości forceRefresh spowoduje ponowne pobranie danych
  };

  useEffect(() => {
    refetch(); // Ponowne pobranie danych po zmianie wartości forceRefresh
  }, [forceRefresh]);

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

  const buildUrlWithParams = (additionalParams: any) => {
    const params = new URLSearchParams();
    for (const key in additionalParams) {
      params.set(key, additionalParams[key]);
    }
    if (category) {
      params.set("category", category); // Dodaj sortowanie wg kategorii
    }
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex flex-col mt-8 items-center justify-center w-full">
      {/* <h1 className="text-3xl font-extrabold mb-2">Arenas</h1>
      <div className="flex flex-row gap-2 py-4">
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ category: "" })}
        >
          all
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ category: "football" })}
        >
          football
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ category: "basketball" })}
        >
          basketball
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ category: "netball" })}
        >
          netball
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ sortByPeople: "desc" })}
        >
          sort ppl
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ sortByPeople: "asc" })}
        >
          sort ppl
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ sortByCost: "desc" })}
        >
          sort cost
        </Link>
        <Link
          className="border border-white px-4 py-2"
          href={buildUrlWithParams({ sortByCost: "asc" })}
        >
          sort cost
        </Link>
      </div> */}
      <Category searchTerm={searchTerm} handleSearch={handleSearch} />
      <Arenas arenas={filteredArenas} searchTerm={searchTerm} />
    </div>
  );
};

export default Arena;
