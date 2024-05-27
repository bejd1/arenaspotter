import PanelAdminTable from "@/app/_components/panelAdminTable";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New arena",
};

const NewArena = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between px-4 py-2">
        <h2 className="p-8 text-xl">New arena</h2>
        <PanelAdminTable />
      </div>
    </div>
  );
};

export default NewArena;
