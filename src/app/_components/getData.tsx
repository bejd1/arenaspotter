"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/actions/post";
import DeletePost from "./deletePost";
import { PostT } from "@/types/types";

const GetData = () => {
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
    <div className="my-5">
      <h1 className="text-xl mb-2">Data:</h1>
      {data.map((d) => {
        return (
          <div className="flex gap-4" key={d.id}>
            <div>
              <p>{d.title}</p>
              <p>{d.body}</p>
              <p>{d.id}</p>
            </div>
            <DeletePost id={d.id} />
          </div>
        );
      })}
    </div>
  );
};

export default GetData;
