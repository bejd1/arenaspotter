import React from "react";
import SettingsComponent from "../_components/settingsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const Settings = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2 ">
      <h2 className="p-8 text-2xl">My profile - settings</h2>
      <SettingsComponent />
    </div>
  );
};

export default Settings;
