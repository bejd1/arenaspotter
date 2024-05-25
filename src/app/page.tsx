import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiSoccerField } from "react-icons/gi";

export const metadata: Metadata = {
  title: "Main page",
};

const ParentComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[70vh] px-4">
      <GiSoccerField className="text-8xl sm:text-9xl" />

      <h1 className="text-2xl sm:text-4xl font-extrabold">
        Search arenas near you
      </h1>
      <h3 className="text-lg sm:text-xl text-zinc-400 sm:w-[600px] md:w-[800px] my-4">
        Welcome to Arena Spotter! Discover the best sports arenas and fields
        close to you effortlessly. Find locations, read reviews and book by
        calling next plays everything in one place. Your favorite sports site!
      </h3>
      <Link href={"/arena"}>
        <Button className="flex gap-1">
          Arenas
          <AiOutlineArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default ParentComponent;
