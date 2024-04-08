import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[80vh]">
      <div className="flex flex-col items-center bg-white dark:bg-[#020617] p-20 rounded-md border border-sky-950">
        <CircularProgress color="inherit" />
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
