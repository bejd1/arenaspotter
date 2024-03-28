"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ArenaId = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <p> ArenaId {params.slug}</p>
      <Button onClick={() => router.back()}>back</Button>
    </div>
  );
};

export default ArenaId;
