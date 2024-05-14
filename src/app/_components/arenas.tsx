"use client";
import React, { Suspense, useEffect, useState } from "react";
import { getArena } from "@/actions/arena";
import { useQuery } from "@tanstack/react-query";
import Loading from "../_components/loading";
import ErrorComponent from "../_components/errorComponent";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ArenasData from "./arenasData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiFootball, BiSolidBasketball } from "react-icons/bi";
import { PiVolleyball } from "react-icons/pi";
import { useDebounceCallback } from "usehooks-ts";
import Category from "./category";

const Arenas = () => {
  const [sortBy, setSortBy] = useState("asc");
  const [sortOrder, setSortOrder] = useState("asc");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = searchParams.get("category");

  useEffect(() => {
    const initialCategory = searchParams.get("category");
    const initialSortBy = searchParams.get("sortBy");
    const initialSortOrder = searchParams.get("sortOrder");
    const initialCity = searchParams.get("city");

    if (initialCategory) {
      setSortBy(initialCategory);
    }
    if (initialSortBy) {
      setSortBy(initialSortBy);
    }
    if (initialSortOrder) {
      setSortOrder(initialSortOrder);
    }
    if (initialCity) {
      setCity(initialCity);
      setSearchQuery(initialCity);
    }
  }, [searchParams]);

  // sort by cost
  const handleSortCost = useDebounceCallback((order) => {
    setSortBy("cost");
    setSortOrder(order);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortBy", "cost");
    newSearchParams.set("sortOrder", order);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }, 300);

  // sort by ppl
  const handleSortPeople = useDebounceCallback((order) => {
    setSortBy("people");
    setSortOrder(order);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortBy", "people");
    newSearchParams.set("sortOrder", order);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }, 300);

  // filter by category
  const handleSortCategory = useDebounceCallback((category) => {
    setSortBy(category);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (category === "") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  }, 300);

  // search input
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [city, setCity] = useState<string | null>("");
  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== "string") {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    setCity(searchQuery || null);

    const queryParams = searchQuery ? `?city=${encodedSearchQuery}` : "";

    router.push(`${pathname}${queryParams}`);
  };

  const {
    data: arenas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["arenas", category, sortBy, sortOrder, city],
    queryFn: async () => await getArena(sortBy, sortOrder, category, city),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  return (
    <Suspense fallback={<Loading />}>
      <Category
        handleSortCategory={handleSortCategory}
        handleSortPeople={handleSortPeople}
        handleSortCost={handleSortCost}
        onSearch={onSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ArenasData arenas={arenas} />
    </Suspense>
  );
};

export default Arenas;
