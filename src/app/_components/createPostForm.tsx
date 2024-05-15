"use client";
import { createArena } from "@/actions/arena";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import React, { useRef, useState } from "react";

const CreatePostForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [author, setAuthor] = useState(session?.user?.id?.toString() || "");
  const [showSize, setShowSize] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [key, setKey] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const premium = false;

  // const form = useForm({
  //   resolver: zodResolver(CreatePostSchema),
  //   defaultValues: {
  //     name: "",
  //     city: "",
  //     zipOrPostalCode: "",
  //     street: "",
  //     email: "",
  //     phoneNumber: "",
  //     cost: "",
  //     people: "",
  //     football: "",
  //     basketball: "",
  //     netball: "",
  //     toilet: "",
  //     parking: "",
  //     showers: "",
  //     dressingRoom: "",
  //     lighting: "",
  //     monday: "",
  //     thesday: "",
  //     wednesday: "",
  //     thursday: "",
  //     friday: "",
  //     saturday: "",
  //     sunday: "",
  //     description: "",
  //     instagram: "",
  //     facebook: "",
  //     website: "",
  //     image: "",
  //     author: "",
  //     premium: "",
  //     status: "",
  //     size: "",
  //     surface: "",
  //     allTime: "",
  //   },
  // });

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createArena(formData);
      ref.current?.reset();
      router.push("/arena");
      setUrl("");
      toast({
        title: "Success",
        description: "Created",
        variant: "success",
        duration: 5000,
        className: "mb-2",
      });
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  return (
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
        onChange={() => {}}
        required
      />
      <Input
        type="hidden"
        name="premium"
        value={premium.toString()}
        onChange={() => {}}
        required
      />
      <Label>Name*</Label>
      <Input type="text" name="name" placeholder="Name" required />
      <Label>Adress*</Label>
      <Input type="text" name="city" placeholder="City" required />
      <Input
        type="text"
        name="zipOrPostalCode"
        placeholder="ZIP/Postal Code"
        required
      />
      <Input type="text" name="street" placeholder="Street" required />
      <Label>Contact*</Label>
      <Input type="text" name="email" placeholder="Email" required />
      <Input
        type="tel"
        name="phoneNumber"
        placeholder="Phone number"
        required
      />
      <Label>Cost $/h*</Label>
      <Input
        type="number"
        name="cost"
        placeholder="Cost $/h"
        defaultValue={0}
        required
      />
      <Label>People*</Label>
      <Input type="number" name="people" placeholder="People" required />
      <Input type="hidden" name="status" value={"Pending"} required />
      <Label>Category*</Label>
      <div className="flex items-center space-x-2">
        <input
          onClick={() => {
            setShowSize(!showSize);
          }}
          type="checkbox"
          id="football"
          name="football"
        />
        <label>Football</label>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="basketball" name="basketball" />
        <label>Basketball</label>
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="netball" name="netball" />
        <label>Netball</label>
      </div>
      {/*  */}
      {showSize && (
        <div>
          <Label>Size*</Label>
          <Select name="size" required>
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
          <Select name="surface" required>
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
      <Label>Toilet*</Label>
      <Select name="toilet" required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Parking*</Label>
      <Select name="parking" required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Showers*</Label>
      <Select name="showers" required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Dressing room*</Label>
      <Select name="dressingRoom" required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Lighting*</Label>
      <Select name="lighting" required>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Premium*</Label>
      <Select>
        <SelectTrigger>
          <SelectValue>False</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">True</SelectItem>
          <SelectItem value="false">False</SelectItem>
        </SelectContent>
      </Select>
      <Label>Opening hours*</Label>
      <div className="flex flex-row gap-1">
        <input type="checkbox" id="allTime" name="allTime" />
        <label>24/7</label>
      </div>
      <OpeningHours />
      <Label>Description</Label>
      <Textarea placeholder="Description" name="description" />
      <Label>Instagram</Label>
      <Input type="string" name="instagram" placeholder="Instagram" />
      <Label>Facebook</Label>
      <Input type="string" name="facebook" placeholder="Facebook" />
      <Label>Website</Label>
      <Input type="string" name="website" placeholder="Website" />
      <Label>Image*</Label>
      {url.length === 0 && <UploadBtn setUrl={setUrl} setKey={setKey} />}
      <Input type="hidden" name="image" value={url} required />
      <Button variant="default" type="submit" className="mt-4">
        Create post
      </Button>
      {url && (
        <div>
          <DeleteBtn url={url} setUrl={setUrl} />
        </div>
      )}
    </form>
  );
};

export default CreatePostForm;
