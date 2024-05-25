import { deleteArena } from "@/actions/arena";
import { Button } from "@/components/ui/button";
import { BsTrash } from "react-icons/bs";
import React from "react";

const DeletePost = ({ id }: { id: string }) => {
  const handleDeleteSubmit = async (formData: FormData) => {
    try {
      await deleteArena(formData);
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleDeleteSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <input onChange={() => {}} type="hidden" name="id" value={id} />
        <Button variant={"secondary"} className="px-4 w-full">
          Delete
          <BsTrash className="ml-1" />
        </Button>
      </form>
    </div>
  );
};

export default DeletePost;
