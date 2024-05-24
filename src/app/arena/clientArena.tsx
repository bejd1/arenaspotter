"use client";

import React, { Suspense } from "react";
import Loading from "../_components/loading";
import Arenas from "../_components/arenas";

const ClientArenas = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Arenas />
    </Suspense>
  );
};

export default ClientArenas;
