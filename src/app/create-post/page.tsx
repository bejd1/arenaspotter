import React from "react";
import CreatePostForm from "../_components/createPostForm";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post",
};

const CreatePost = () => {
  return (
    <div className="flex items-center justify-center mx-2">
      <Card className="flex flex-col my-8 w-full sm:w-[600px] px-4 sm:px-20 py-8">
        <h2 className="text-2xl font-bold text-center">Create new arena</h2>
        <CreatePostForm />
      </Card>
    </div>
  );
};

export default CreatePost;
