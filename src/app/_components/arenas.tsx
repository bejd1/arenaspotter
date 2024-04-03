import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { PostT } from "@/types/types";

const Arenas = ({ arenas }: { arenas: PostT[] }) => {
  return (
    <div className="flex flex-wrap  px-24 gap-4">
      {arenas?.map((arena) => {
        const {
          id,
          name,
          city,
          address,
          email,
          image,
          image2,
          image3,
          payment,
          people,
          cost,
        } = arena;

        return (
          <Link key={id} href={`/arena/${id}`}>
            <Card className="cursor-pointer relative">
              <img
                src={image}
                className="w-[320px] min-h-[200px] max-h-[201px]"
              />
              <CardHeader>
                <CardTitle className="pb-2 text-lg p-0 w-full h-6">
                  {name}
                </CardTitle>
                <CardContent className="flex items-center gap-2 p-0 w-full h-6">
                  <FaRegMoneyBillAlt />
                  <div>{payment === "Paid" ? <p>${cost}</p> : <p>Free</p>}</div>
                </CardContent>
                <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                  <CiLocationOn />
                  <div>{city}</div>
                </CardContent>
                <CardContent className="flex items-center gap-1 p-0 w-full h-6">
                  <IoPeopleSharp />
                  <div>{people}</div>
                </CardContent>
              </CardHeader>
              <CardContent className="absolute flex items-center justify-center bg-slate-900 text-white top-1 right-1 p-2 rounded-md">
                <AiFillStar className="text-2xl hover:text-red-600" />
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Arenas;
