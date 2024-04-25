"use client";
import { createArena } from "@/actions/arena";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import UploadBtn from "../_components/uploadBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteBtn from "../_components/deleteBtn";
import OpeningHours from "../_components/openingHours";

interface SelectedTimes {
  [key: string]: {
    open?: string;
    close?: string;
  };
}
const CreatePost = () => {
  const { data: session } = useSession();
  const [author, setAuthor] = useState(session?.user?.id?.toString() || "");
  const [showHours, setShowHours] = useState(true);
  const [showSize, setShowSize] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [key, setKey] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createArena(formData);
      ref.current?.reset();
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  const handleShowSize = () => {
    setShowSize(!showSize);
  };

  const handleShowHours = () => {
    setShowHours(!showHours);
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
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Email"
            required
          />
          <Label>Name</Label>
          <Input type="text" name="name" placeholder="Name" required />
          {/* Adress */}
          <Label>Adress</Label>
          <Input type="text" name="city" placeholder="City" required />
          <Input
            type="text"
            name="zipOrPostalCode"
            placeholder="ZIP/Postal Code"
            required
          />
          <Input type="text" name="street" placeholder="Street" required />
          {/* Contact */}
          <Label>Contact</Label>
          <Input type="text" name="email" placeholder="Email" required />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            required
          />
          {/* Info */}
          <Label>Cost $/h</Label>
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
              <Label>Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullSize">Full size</SelectItem>
                  <SelectItem value="orlik">Orlik</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Label>Surface</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="artificial">Artificial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Label>Toilet</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Label>Parking</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Label>Showers</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Label>Dressing room</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          <Label>Lighting room</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
          {/*  */}
          <Label>Opening hours</Label>
          <div className="flex flex-row gap-1">
            <input
              type="checkbox"
              id="netball"
              name="netball"
              onClick={handleShowHours}
            />
            <label>24/7</label>
          </div>
          {showHours && (
            <>
              <OpeningHours />
            </>
          )}
          <Label>Image</Label>
          {url.length === 0 && <UploadBtn setUrl={setUrl} setKey={setKey} />}
          <Input type="hidden" name="image" value={url} required />
        </form>
        {url.length !== 0 && (
          <div>
            <img src={url} alt="d" className="w-full py-2" />
            <DeleteBtn url={url} setUrl={setUrl} />
          </div>
        )}
        <Button variant="default" type="submit" className="mt-4">
          Create post
        </Button>
      </Card>
    </div>
  );
};

export default CreatePost;
