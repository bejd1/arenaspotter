import AuthModal from "@/app/_components/authModal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login or register",
};

const MyAccountModall = () => {
  return (
    <>
      <AuthModal />
    </>
  );
};

export default MyAccountModall;
