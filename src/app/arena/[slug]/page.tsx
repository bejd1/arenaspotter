import React from "react";
import { Badge } from "@/components/ui/badge";
import prisma from "@/app/utlis/db";
import ReportModal from "@/app/_components/reportModal";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/ui/button";
import FavoriteBtn from "@/app/_components/favoriteBtn";
import { MapComponent } from "@/app/_components/map";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arena",
};

const ArenaId = async ({ params }: { params: { slug: string } }) => {
  const productData = await prisma.post.findUnique({
    where: {
      id: params.slug,
    },
  });

  const formattedDate = productData?.updatedAt?.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  return (
    <div className="my-5 px-4 sm:px-8 lg:px-20 xl:px-40 flex flex-col justyfy-center h-screen mt-8">
      <div className="flex items-center justify-center">
        <Image
          src={productData?.image || ""}
          width={300}
          height={100}
          alt="Arena image"
          className="min-w-[90%] max-w-[91%] max-h-[700px] sm:min-w-[60%] sm:max-w-[61%] sm:max-h-[700px]"
        />
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl lg:text-3xl font-extrabold">
            {productData?.name}
          </h1>
          <div className="flex my-2 gap-2">
            {productData?.netball === "on" && <Badge>Netball</Badge>}
            {productData?.football === "on" && <Badge>Football</Badge>}
            {productData?.basketball === "on" && <Badge>Basketball</Badge>}
          </div>
        </div>
        <div className="p-2 rounded-md">
          <Tooltip title="Add to favorite">
            <Button variant={"outline"} size="icon">
              <FavoriteBtn
                id={productData?.id}
                name={productData?.name}
                image={productData?.image}
                city={productData?.city}
                street={productData?.street}
                cost={productData?.cost}
                people={productData?.people}
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-wrap bg-[#ececec] text-[#373727] my-3 p-2 px-2 sm:px-4 lg:px-10 rounded-md w-max">
        <h2 className="text-md lg:text-2xl font-bold">
          Location, Opening Hours and Prices
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 my-8">
        <div className="flex lg:gap-10">
          {/* Opening */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">Opening Hours</h3>
            <div>
              <p>
                Monday: {productData?.openingMonday} -
                {productData?.openingHoursMonday}
              </p>
              <p>
                Tuesday: {productData?.openingTuesday} -
                {productData?.openingHoursTuesday}
              </p>
              <p>
                Wednesday: {productData?.openingWednesday} -
                {productData?.openingHoursWednesday}
              </p>
              <p>
                Thursday: {productData?.openingThursday} -
                {productData?.openingHoursThursday}
              </p>
              <p>
                Friday: {productData?.openingFriday} -
                {productData?.openingHoursFriday}
              </p>
              <p>
                Saturday: {productData?.openingSaturday} -
                {productData?.openingHoursSaturday}
              </p>
              <p>
                Sunday: {productData?.openingSunday} -
                {productData?.openingHoursSunday}
              </p>
            </div>
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Info</h3>
          <p>City: {productData?.city}</p>
          <p>Street: {productData?.street}</p>
          <p>ZIP/PostalCode: {productData?.zipOrPostalCode}</p>
          <p>Phone number: {productData?.phoneNumber}</p>
          <p>Email: {productData?.email}</p>
        </div>
        {/* Price */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">Price</h3>
          <p>
            {productData?.cost === 0 ? <p>Free</p> : `${productData?.cost}$/h`}
          </p>
        </div>
        {/* More */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold">More</h3>
          <p>Max people: {productData?.people}</p>
          <p className="flex flex-row items-center gap-1">
            Toilet:
            {productData?.toilet === "true" ? (
              <FaCheck className="text-green-700" />
            ) : (
              <IoMdClose className="text-lg text-red-600" />
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            Parking:
            {productData?.parking === "true" ? (
              <FaCheck className="text-green-700" />
            ) : (
              <IoMdClose className="text-lg text-red-600" />
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            Showers:
            {productData?.showers === "true" ? (
              <FaCheck className="text-green-700" />
            ) : (
              <IoMdClose className="text-lg text-red-600" />
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            Dressing room:
            {productData?.dressingRoom === "true" ? (
              <FaCheck className="text-green-700" />
            ) : (
              <IoMdClose className="text-lg text-red-600" />
            )}
          </p>
          <p className="flex flex-row items-center gap-1">
            Lighting:
            {productData?.lighting === "true" ? (
              <FaCheck className="text-green-700" />
            ) : (
              <IoMdClose className="text-lg text-red-600" />
            )}
          </p>
        </div>
        {/* Description */}
        <div className="flex flex-col">
          <p className="text-2xl font-bold">Description</p>
          {productData?.description?.length === 0 ? (
            <p>No desciption yet.</p>
          ) : (
            <p>{productData?.description}</p>
          )}
        </div>
        {/* Socials */}
        <div>
          <h3 className="text-2xl font-bold">Socials</h3>
          <div className="flex flex-col">
            {productData?.facebook?.length === 0 &&
            productData?.instagram?.length === 0 &&
            productData?.website?.length === 0 ? (
              <div>No socials yet.</div>
            ) : (
              <div className="flex flex-row gap-2 mt-2">
                {productData?.instagram?.length === 0 ? (
                  <></>
                ) : (
                  <a href={productData?.instagram || ""}>
                    <FaInstagram className="text-xl cursor-pointer hover:text-slate-300" />
                  </a>
                )}
                {productData?.facebook?.length === 0 ? (
                  <></>
                ) : (
                  <a href={productData?.facebook || ""}>
                    <FaFacebook className="text-xl cursor-pointer hover:text-slate-300" />
                  </a>
                )}
                {productData?.website?.length === 0 ? (
                  <></>
                ) : (
                  <a href={productData?.website || ""}>
                    <CgWebsite className="text-xl cursor-pointer hover:text-slate-300" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold">Location</p>
        <div className="w-full my-8">
          <MapComponent />
        </div>
      </div>
      <div className="text-sm py-3">Last update: {formattedDate}</div>
      <div className="absolute right-3 sm:right-12 md:right-32 top-20">
        <ReportModal id={params.slug} arenaName={productData?.name} />
      </div>
    </div>
  );
};
export default ArenaId;
