"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";

interface ToastI {
  title: string;
  description: string;
  variant: string;
}

const Toast = ({ title, description, variant }: ToastI) => {
  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: title,
            description: description,
            variant: variant as "error",
            duration: 5000,
            className: "mb-2",
          });
        }}
      >
        Toast
      </Button>
    </div>
  );
};

export default Toast;
