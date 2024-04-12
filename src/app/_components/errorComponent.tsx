import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { TfiFaceSad } from "react-icons/tfi";

const ErrorComponent = () => {
  return (
    <div className="h-[86vh] md:h-[82vh] flex flex-col items-center justify-center">
      <TfiFaceSad className="text-[160px] font-extrabold mb-4" />
      <h1 className="text-2xl font-extralight">404</h1>
      <p className="text-3xl font-bold my-2">Page not found.</p>
      <Link href="/">
        <Button className="mt-2">Back</Button>
      </Link>
    </div>
  );
};

export default ErrorComponent;
