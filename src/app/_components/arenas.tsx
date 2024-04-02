import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import { PostT } from "@/types/types";

const Arenas = ({ data }: { data: PostT[] }) => {
  return (
    <div>
      <div className="flex gap-4">
        {data.map((d) => {
          return (
            <Link key={d.id} href={`/arena/${d.id}`}>
              <Card className="cursor-pointer relative">
                <img
                  src={d.image}
                  className="w-[320px] min-h-[200px] max-h-[201px]"
                />
                <CardHeader>
                  <CardTitle className="pb-2 text-lg p-0">{d.name}</CardTitle>
                  <CardContent className="flex items-center gap-2 p-0">
                    <FaRegMoneyBillAlt />
                    <div>
                      {d?.payment === "Paid" ? <p>${d.cost}</p> : <p>Free</p>}
                    </div>
                  </CardContent>
                  <CardContent className="flex items-center gap-1 p-0">
                    <CiLocationOn />
                    <div>{d.city}</div>
                  </CardContent>
                  <CardContent className="flex items-center gap-1 p-0">
                    <IoPeopleSharp />
                    <div>{d.people}</div>
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
    </div>
  );
};

export default Arenas;
