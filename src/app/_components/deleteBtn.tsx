import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const DeleteBtn = ({ url }: { url: string }) => {
  const deleteImage = async () => {
    try {
      await axios.delete("api/uploadthing", {
        data: { url: url },
      });
      console.log("delete image");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <div>
      <Button onClick={deleteImage}>Delete</Button>
    </div>
  );
};

export default DeleteBtn;
