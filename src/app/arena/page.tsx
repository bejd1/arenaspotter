"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import Datas from "../datas/page";

const Arena = () => {
  const id = "elo";
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-10">
      {category && <p>You search all arenas in: {category}</p>}
      <div className="flex gap-2">
        <Button>
          <Link href={`/arena/${id}`}>To slug</Link>
        </Button>
        <Button>
          <Link href={`/arena/gbs`}>To gbs</Link>
        </Button>
        <Button>
          <Link href={`arena?category=Szczecinek`}>Szczecinek</Link>
        </Button>
        <Button>
          <Link href={`arena?category=Warszawa`}>Warszawa</Link>
        </Button>
        <Button>
          <Link href={`arena`}>Clear</Link>
        </Button>
      </div>
      <Datas />
    </div>
  );
};

export default Arena;
