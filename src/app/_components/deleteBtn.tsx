import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface DeleteBtnProps {
  setUrl: (url: string) => void;
  url: string;
}
const DeleteBtn = ({ url, setUrl }: DeleteBtnProps) => {
  const deleteImage = async () => {
    try {
      await axios.delete("api/uploadthing", {
        data: { url: url },
      });
      setUrl("");
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
