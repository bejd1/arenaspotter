import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Arena = () => {
  const id = "elo";
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Button>
        <Link href={`/arena/${id}`}>To slug</Link>
      </Button>
      <Button>
        <Link href={`/arena/gbs`}>To gbs</Link>
      </Button>
    </div>
  );
};

export default Arena;
