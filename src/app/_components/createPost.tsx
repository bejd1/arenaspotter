import { createPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null);

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createPost(formData);
      ref.current?.reset();
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };
  return (
    <div>
      <form
        ref={ref}
        onSubmit={async (e) => {
          e.preventDefault();
          await handleCreateSubmit(new FormData(e.target as HTMLFormElement));
        }}
        className="flex flex-col gap-4 my-20"
      >
        <Input type="text" name="title" placeholder="Title" required />
        <Input type="text" name="body" placeholder="Body" required />

        <Button variant="default" type="submit">
          Create post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
