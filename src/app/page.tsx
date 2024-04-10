"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Provider } from "react-redux";
import { store } from "./store";
import { GiSoccerField } from "react-icons/gi";

const ParentComponent = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center text-center h-[70vh]">
        <h2 className="text-9xl">
          <GiSoccerField className="text-9xl" />
        </h2>

        <h1 className="text-4xl font-extrabold">Search arenas near you</h1>
        <h3 className="text-xl text-zinc-400 w-[700px] my-4">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source. Get Started GitHub
        </h3>
        <Link href={"/arena"}>
          <Button className="flex gap-1 hover:gap-2">
            Arenas
            <AiOutlineArrowRight />
          </Button>
        </Link>
      </div>
    </Provider>
  );
};

export default ParentComponent;
