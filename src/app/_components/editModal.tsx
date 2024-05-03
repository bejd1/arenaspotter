"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { PostT } from "@/types/types";
import { BiPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import OpeningHours from "./openingHours";
import { Textarea } from "@/components/ui/textarea";

export default function EditPost({ post }: { post: PostT }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSize, setShowSize] = useState(false);

  const handleShowSize = () => {
    setShowSize(!showSize);
  };

  return (
    <div>
      <Button variant={"outline"} onClick={handleOpen} className="p-3 sm:p-4">
        <BiPencil />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center"
      >
        <Card className="flex flex-col my-8 sm:w-[600px] px-4 sm:px-32 py-8 overflow-scroll relative">
          <h2 className="text-2xl font-bold text-center">Edit arena</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-4 mt-4"
          >
            <Input
              type="hidden"
              name="author"
              value={post?.author}
              onChange={() => {}}
              required
            />
            <Input
              type="hidden"
              name="premium"
              value={post?.premium}
              onChange={() => {}}
              required
            />
            <Label>Name*</Label>
            <Input
              type="text"
              defaultValue={post?.name}
              name="name"
              placeholder="Name"
              required
            />
            {/* Adress */}
            <Label>Adress*</Label>
            <Input
              type="text"
              defaultValue={post?.city}
              name="city"
              placeholder="City"
              required
            />
            <Input
              type="text"
              defaultValue={post?.zipOrPostalCode}
              name="zipOrPostalCode"
              placeholder="ZIP/Postal Code"
              required
            />
            <Input
              type="text"
              defaultValue={post?.street}
              name="street"
              placeholder="Street"
              required
            />
            {/* Contact */}
            <Label>Contact*</Label>
            <Input
              type="text"
              defaultValue={post?.email}
              name="email"
              placeholder="Email"
              required
            />
            <Input
              type="tel"
              defaultValue={post?.phoneNumber}
              name="phoneNumber"
              placeholder="Phone number"
              required
            />
            {/* Info */}
            <Label>Cost $/h*</Label>
            <Input
              type="number"
              defaultValue={post?.cost}
              name="cost"
              placeholder="Cost $/h"
              required
            />
            <Label>People*</Label>
            <Input
              type="number"
              defaultValue={post?.people}
              name="people"
              placeholder="People"
              required
            />
            <Input type="hidden" name="status" value={"Pending"} required />
            <Label>Category*</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="football"
                name="football"
                onClick={handleShowSize}
              />
              <label>Football</label>
              <input type="checkbox" id="basketball" name="basketball" />
              <label>Basketball</label>
              <input type="checkbox" id="netball" name="netball" />
              <label>Netball</label>
            </div>
            {showSize && (
              <div>
                <Label>Size*</Label>
                <Select name="size" required>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select"
                      defaultValue={post?.size}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullSize">Full size</SelectItem>
                    <SelectItem value="orlik">Orlik</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Label>Surface</Label>
                <Select name="surface" required>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select"
                      defaultValue={post?.surface}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="artificial">Artificial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Label>Toilet*</Label>
            <Select name="toilet" required>
              <SelectTrigger>
                <SelectValue placeholder="Select" defaultValue={post?.toilet} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <Label>Parking*</Label>
            <Select name="parking" required>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select"
                  defaultValue={post?.parking}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <Label>Showers*</Label>
            <Select name="showers" required>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select"
                  defaultValue={post?.showers}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <Label>Dressing room*</Label>
            <Select name="dressingRoom" required>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select"
                  defaultValue={post?.dressingRoom}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            <Label>Lighting*</Label>
            <Select name="lighting" required>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select"
                  defaultValue={post?.lighting}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            {/*  */}
            <Label>Opening hours*</Label>
            <div className="flex flex-row gap-1">
              <input type="checkbox" id="allTime" name="allTime" />
              <label>24/7</label>
            </div>
            <OpeningHours />
            <Label>Description</Label>
            <Textarea
              defaultValue={post?.description || ""}
              placeholder="Description"
              name="description"
            />
            <Label>Instagram</Label>
            <Input
              type="string"
              defaultValue={post?.instagram || ""}
              name="instagram"
              placeholder="Instagram"
            />
            <Label>Facebook</Label>
            <Input
              type="string"
              defaultValue={post?.facebook || ""}
              name="facebook"
              placeholder="Facebook"
            />
            <Label>Website</Label>
            <Input
              type="string"
              defaultValue={post?.website || ""}
              name="website"
              placeholder="Website"
            />
            <Label>Image*</Label>
            {/* {url.length === 0 && <UploadBtn setUrl={setUrl} setKey={setKey} />} */}
            {/* <Input type="hidden" name="image" value={url} required /> */}
            <Button variant="default" type="submit" className="mt-4">
              Create post
            </Button>
          </form>
          <IoMdClose
            onClick={handleClose}
            className="absolute top-4 right-4 cursor-pointer text-xl"
          />
        </Card>
      </Modal>
    </div>
  );
}
