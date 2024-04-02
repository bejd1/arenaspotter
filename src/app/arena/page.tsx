"use client";
import React, { Suspense, useEffect, useState } from "react";
import { PostT } from "@/types/types";
import { getData } from "@/actions/post";
import Category from "../_components/category";
import { LoadingSkeleton } from "../_components/loading";
import Arenas from "../_components/arenas";

const Arena = () => {
  const [data, setData] = useState<PostT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-20 items-center justify-center w-full px-4 sm:px-6 lg:px-96">
      <h1 className="text-2xl font-extrabold mb-2">Arenas</h1>
      <Category />
      <Suspense fallback={<LoadingSkeleton />}>
        <Arenas data={data} />
      </Suspense>
    </div>
  );
};

export default Arena;
