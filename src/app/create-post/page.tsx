"use client";
import { createArena } from "@/actions/arena";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null);
  const { data: session } = useSession();

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createArena(formData);
      ref.current?.reset();
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <Card className="flex flex-col my-8 w-[600px] px-32 py-8">
        <h2 className="text-2xl font-bold text-center">Create new arena</h2>
        <form
          ref={ref}
          onSubmit={async (e) => {
            e.preventDefault();
            await handleCreateSubmit(new FormData(e.target as HTMLFormElement));
          }}
          className="flex flex-col gap-4 mt-4"
        >
          <Input
            type="hidden"
            name="author"
            value={session?.user?.email?.toString()}
            placeholder="Email"
            required
          />
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Name" required />
          <Label>Adress</Label>
          <Input type="text" name="city" placeholder="City" required />
          <Input type="text" name="address" placeholder="Address" required />
          <Label>Email</Label>
          <Input type="text" name="email" placeholder="Email" required />
          <Label>Image</Label>
          <Input type="text" name="image" placeholder="Image" required />
          <Label>Image 2</Label>
          <Input type="text" name="image2" placeholder="Image 2" required />
          <Label>Image 3</Label>
          <Input type="text" name="image3" placeholder="Image 3" required />
          <Label>Cost $</Label>
          <Input
            type="number"
            name="cost"
            placeholder="Cost/h"
            defaultValue={0}
            required
          />
          <Label>People</Label>
          <Input type="number" name="people" placeholder="People" required />
          <Input
            type="hidden"
            name="people"
            value="pending"
            placeholder="People"
            required
          />
          <Input type="hidden" name="status" value={"Pending"} required />
          <Label>Category</Label>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="football" name="football" />
            <label>Football</label>
            <input type="checkbox" id="basketball" name="basketball" />
            <label>Basketball</label>
            <input type="checkbox" id="netball" name="netball" />
            <label>Netball</label>
          </div>
          <Button variant="default" type="submit">
            Create post
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
