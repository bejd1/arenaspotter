"use client";
import React, { Suspense, useState, useEffect } from "react";
import { getArena } from "@/actions/arena";
import Category from "../_components/category";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "../_components/errorComponent";
import { useRouter, useSearchParams } from "next/navigation";
import ArenasData from "./arenasData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";

const Arenas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();

  useEffect(() => {
    const urlSortBy = searchParams.get("sortBy");
    const urlSortOrder = searchParams.get("sortOrder");
    if (urlSortBy && urlSortOrder) {
      setSortBy(urlSortBy);
      setSortOrder(urlSortOrder);
    }
  }, [searchParams]);

  const {
    data: arenas = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["arenas", category, sortBy, sortOrder],
    queryFn: async () =>
      await getArena(
        category,
        sortBy as "asc" | "desc" | null | undefined,
        sortOrder as "asc" | "desc" | null | undefined
      ),
  });

  const handleSortAndUpdateUrl = (field: any, order: any) => {
    handleSort(field);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortBy", field);
    newSearchParams.set("sortOrder", order);
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleCategoryAndUpdateUrl = (category: any) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (category) {
      newSearchParams.set("category", category);
    } else {
      newSearchParams.delete("category");
    }
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
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
    <Suspense fallback={<Loading />}>
      <Category
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        // handleSort={handleSort}
      />
      <div>
        <input
          type="text"
          placeholder="Wyszukaj..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => handleSortAndUpdateUrl("cost", "asc")}>
          Sortuj wg ceny rosnąco{" "}
          {searchParams.get("sortBy") === "cost" &&
          searchParams.get("sortOrder") === "asc"
            ? "↑"
            : ""}
        </button>
        <button onClick={() => handleSortAndUpdateUrl("cost", "desc")}>
          Sortuj wg ceny malejąco{" "}
          {searchParams.get("sortBy") === "cost" &&
          searchParams.get("sortOrder") === "desc"
            ? "↓"
            : ""}
        </button>
        <button onClick={() => handleSortAndUpdateUrl("people", "asc")}>
          Sortuj wg liczby osób rosnąco{" "}
          {searchParams.get("sortBy") === "people" &&
          searchParams.get("sortOrder") === "asc"
            ? "↑"
            : ""}
        </button>
        <button onClick={() => handleSortAndUpdateUrl("people", "desc")}>
          Sortuj wg liczby osób malejąco{" "}
          {searchParams.get("sortBy") === "people" &&
          searchParams.get("sortOrder") === "desc"
            ? "↓"
            : ""}
        </button>
        <Link href={"/arena"} onClick={() => handleCategoryAndUpdateUrl(null)}>
          <Button
            variant={
              searchParams.get("category") === null ? "secondary" : "default"
            }
          >
            All
          </Button>
        </Link>
        <Link
          href={`/arena/?category=football`}
          onClick={() => handleCategoryAndUpdateUrl("football")}
        >
          <Button
            variant={
              searchParams.get("category") === "football"
                ? "secondary"
                : "default"
            }
          >
            <BiFootball className="text-xl" />
          </Button>
        </Link>
        <Link
          href={`/arena/?category=basketball`}
          onClick={() => handleCategoryAndUpdateUrl("basketball")}
        >
          <Button
            variant={
              searchParams.get("category") === "basketball"
                ? "secondary"
                : "default"
            }
          >
            <BiSolidBasketball className="text-xl" />
          </Button>
        </Link>
        <Link
          href={`/arena/?category=netball`}
          onClick={() => handleCategoryAndUpdateUrl("netball")}
        >
          <Button
            variant={
              searchParams.get("category") === "netball"
                ? "secondary"
                : "default"
            }
          >
            <PiVolleyball className="text-xl" />
          </Button>
        </Link>
      </div>
      <ArenasData arenas={filteredArenas} searchTerm={searchTerm} />
    </Suspense>
  );
};

export default Arenas;
