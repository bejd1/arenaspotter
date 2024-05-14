import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import EditPost from "./editModal";
import DeletePost from "./deletePost";
import { PostT } from "@/types/types";

interface DropdownI {
  post: PostT;
  id: string;
}

const DropdownActions = ({ post, id }: DropdownI) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDotsVertical className="text-lg cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center flex-col gap-2">
        <div className="mt-2">
          <Button variant={"success"}>Upgrade</Button>
        </div>
        <div className="flex justyfy-between">
          <EditPost post={post} />
          <DeletePost id={id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownActions;
