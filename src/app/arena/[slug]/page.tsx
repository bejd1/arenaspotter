import React from "react";
import { Badge } from "@/components/ui/badge";
import prisma from "@/app/utlis/db";
import ReportModal from "@/app/_components/reportModal";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/ui/button";
import FavoriteBtn from "@/app/_components/favoriteBtn";

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
const ArenaId = async ({ params }: { params: { slug: string } }) => {
  const productData = await prisma.post.findUnique({
    where: {
      id: params.slug,
    },
  });

  const urlMap =
    "https://cdn.discordapp.com/attachments/1182760469459632179/1224466610387943464/map.png?ex=661d9865&is=660b2365&hm=157449de97e976234f26cd481f514d2644c59f6a35a854fa943b1f571513e593&";

  return (
    <div className="my-5 px-40 flex flex-col justyfy-center h-screen mt-8 ">
      <div className="flex items-center justify-center gap-4">
        <img src={productData?.image} className="w-2/3" />
      </div>
      <div className="w-full h-0.5 bg-white my-4"></div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">{productData?.name}</h1>
          <div className="flex my-2 gap-2">
            {!productData?.netball && <Badge>Netball</Badge>}
            {!productData?.football && <Badge>Football</Badge>}
            {!productData?.basketball && <Badge>Basketball</Badge>}
          </div>
        </div>
        <div className="p-2 rounded-md">
          <Tooltip title="Add to favorite">
            <Button variant={"outline"} size="icon">
              <FavoriteBtn
                id={productData?.id}
                name={productData?.name}
                image={productData?.image}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="bg-[#ececec] text-[#373727] my-3 p-2 px-10  rounded-md w-max">
        <h2 className="text-2xl font-bold">
          Location, Opening Hours and Prices
        </h2>
      </div>
      <div className="flex flex-row gap-20 my-8">
        <div className="flex gap-10">
          {/* Opening */}
          <div className="flex flex-col">
            <p className="text-2xl font-bold">Opening Hours</p>
            <div>
              {openingHours.map((openingHour) => (
                <p key={openingHour.day}>
                  {openingHour.day}: {openingHour.hours}
                </p>
              ))}
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Info</p>
          <p>City: {productData?.city}</p>
          <p>Adress: {productData?.address}</p>
          <p>Phone number: +48 999 999 999</p>
          <p>Email: {productData?.email}</p>
        </div>
        {/* Price */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Price</p>
          <p>
            {productData?.cost === null ? (
              <p>Free</p>
            ) : (
              `${productData?.cost}$/h`
            )}
          </p>
        </div>
        {/* More */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">More</p>
          <p>Max people: {productData?.people}</p>
          <p>Toilet: </p>
          <p>Parking:</p>
          <p>Dressing room:</p>
          <p>Lighting:</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold">Location</p>
        <img src={urlMap} className="mb-20" />
      </div>
      <div className="absolute right-32">
        <ReportModal id={params.slug} arenaName={productData?.name} />
      </div>
    </div>
  );
};
export default ArenaId;
