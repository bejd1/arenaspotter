"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/actions/post";
import { PostT } from "@/types/types";
import { Badge } from "@/components/ui/badge";

interface openingHoursI {
  day: string;
  hours: string;
}

const openingHours: openingHoursI[] = [
  { day: "Monday", hours: "7:30am - 9:30pm" },
  { day: "Tuesday", hours: "7:30am - 9:30pm" },
  { day: "Wednesday", hours: "7:30am - 9:30pm" },
  { day: "Thursday", hours: "7:30am - 9:30pm" },
  { day: "Friday", hours: "7:30am - 9:30pm" },
  { day: "Saturday", hours: "7:30am - 9:30pm" },
  { day: "Sunday", hours: "7:30am - 9:30pm" },
];
const Arena = () => {
  const [data, setData] = useState<PostT[]>([]);
  const url =
    "https://tuwiazowna.pl/wp-content/uploads/2019/06/Boisko-Orlik-w-Zakr%C4%99cie_720.jpg";

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
    <div className="my-5 px-40">
      <h1 className="text-2xl font-extrabold mb-2">Poznań Jeżyce Orlik</h1>
      <div className="flex gap-3 mb-2">
        <Badge>Football</Badge>
        <Badge>Netball</Badge>
      </div>
      <img src={url} />
      <div className="bg-[#ececec] text-[#373727] my-3 p-2 px-10  rounded-md w-max">
        <h2 className="text-2xl font-bold">
          Location, Opening Hours and Prices
        </h2>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col">
          <p className="text-xl font-bold">Opening Hours</p>
          <div>
            {openingHours.map((openingHour) => (
              <p key={openingHour.day}>
                {openingHour.day}: {openingHour.hours}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
// const id = "elo";
// const searchParams = useSearchParams();
// const category = searchParams.get("category");
