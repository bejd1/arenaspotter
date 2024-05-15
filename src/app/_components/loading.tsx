import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 bg-slate-200/85 dark:bg-slate-900/85 w-[100vw] h-full ">
      <div className="flex items-center justify-center w-full h-[95vh]">
        <div className=" flex flex-col items-center bg-white dark:bg-[#020617] p-20 rounded-md border border-sky-950">
          <CircularProgress color="inherit" />
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
