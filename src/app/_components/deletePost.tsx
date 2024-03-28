import { deletePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import React from "react";

const DeletePost = ({ id }: { id: string }) => {
  const handleDeleteSubmit = async (formData: FormData) => {
    try {
      await deletePost(formData);
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
        <Button>Delete Post</Button>
      </form>
    </div>
  );
};

export default DeletePost;
