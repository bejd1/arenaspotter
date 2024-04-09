"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { PostT } from "@/types/types";
import { BiPencil } from "react-icons/bi";

export default function EditPost({ post }: { post: PostT }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant={"outline"} onClick={handleOpen}>
        <BiPencil />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Card className="flex flex-col my-8 w-[600px] px-32 py-8">
          <h2 className="text-2xl font-bold text-center">Edit arena</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-4 mt-4"
          >
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={post.name}
              required
            />
            <Label>Adress</Label>
            <Input
              type="text"
              name="city"
              placeholder="City"
              defaultValue={post.city}
              required
            />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              defaultValue={post.address}
              required
            />
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              defaultValue={post.email}
              required
            />
            <Label>Image</Label>
            <Input
              type="text"
              name="image"
              placeholder="Image"
              defaultValue={post.image}
              required
            />
            <Label>Image 2</Label>
            <Input
              type="text"
              name="image2"
              placeholder="Image 2"
              defaultValue={post.image2}
              required
            />
            <Label>Image 3</Label>
            <Input
              type="text"
              name="image3"
              placeholder="Image 3"
              defaultValue={post.image3}
              required
            />
            <Label>Cost $</Label>
            <Input
              type="number"
              name="cost"
              placeholder="Cost/h"
              defaultValue={post.cost}
              required
            />
            <Label>People</Label>
            <Input
              type="number"
              name="people"
              placeholder="People"
              defaultValue={post.people}
              required
            />
            <Label>Category</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="football"
                defaultChecked={!!post.football}
                name="football"
              />
              <label htmlFor="football">Football</label>
              <input
                type="checkbox"
                id="basketball"
                defaultChecked={!!post.basketball}
                name="basketball"
              />
              <label htmlFor="basketball">Basketball</label>
              <input
                type="checkbox"
                id="netball"
                defaultChecked={!!post.netball}
                name="netball"
              />
              <label htmlFor="netball">Netball</label>
            </div>
            <Button variant="default" type="submit">
              Create post
            </Button>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
