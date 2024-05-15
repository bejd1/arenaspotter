import React from "react";
import SettingsComponent from "../_components/settingsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const Settings = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2 ">
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        Settings
      </h2>
      <SettingsComponent />
    </div>
  );
};

export default Settings;
