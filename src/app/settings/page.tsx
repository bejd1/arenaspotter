import React from "react";
import SettingsComponent from "../_components/settingsComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const Settings = () => {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 lg:px-20 py-2 ">
      {/* <div className="flex flex-wrap bg-[#ececec] text-[#373727] my-8 mt-12 p-2 px-2 sm:px-4 lg:px-10 rounded-md w-max">
        <h2 className="text-xl sm:text-2xl font-bold ">Settings</h2>
      </div> */}
      <h2 className="text-xl sm:text-3xl mt-6 sm:mt-12 mb-4 sm:mb-8">
        Settings
      </h2>
      <SettingsComponent />
    </div>
  );
};

export default Settings;
