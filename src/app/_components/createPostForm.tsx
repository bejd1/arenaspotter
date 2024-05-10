"use client";
import { createArena } from "@/actions/arena";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
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
import { toast, useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { CreatePostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
type FormData = z.infer<typeof CreatePostSchema>;

const CreatePostForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [author, setAuthor] = useState(session?.user?.id?.toString() || "");
  const [showSize, setShowSize] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [key, setKey] = useState("");
  const premium = "false";

  const form = useForm({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      name: "",
      city: "",
      zipOrPostalCode: "",
      street: "",
      email: "",
      phoneNumber: "",
      cost: "",
      people: "",
      football: "",
      basketball: "",
      netball: "",
      toilet: "",
      parking: "",
      showers: "",
      dressingRoom: "",
      lighting: "",
      monday: "",
      thesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      description: "",
      instagram: "",
      facebook: "",
      website: "",
      image: "",
      author: "",
      premium: "",
      status: "",
      size: "",
      surface: "",
      allTime: "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    try {
      const arenaData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        arenaData.append(key, value.toString());
      }

      await createArena(arenaData);
      router.push("/arena");
      setUrl("");
      toast({
        title: "Success!",
        description: "Created",
        variant: "success",
        duration: 5000,
        className: "mb-2",
      });
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  const handleShowSize = () => {
    setShowSize(!showSize);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4"
      >
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} value={author} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="premium"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} value={premium} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input id="name" type="text" {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Adress */}
        <Label>Adress*</Label>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input id="city" type="text" {...field} placeholder="City" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipOrPostalCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="ZIP/Postal Code"
                  type="text"
                  {...field}
                  placeholder="ZIP/Postal Code"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="street"
                  type="text"
                  {...field}
                  placeholder="Street"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Contact */}
        <Label>Contact*</Label>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" {...field} placeholder="Phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Info */}
        <Label>Cost $/h*</Label>
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Cost $/h"
                  defaultValue={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>People*</Label>
        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" {...field} placeholder="People" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} value={"Pending"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {/* <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="football"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="checkbox"
                    id="football"
                    {...field}
                    onClick={handleShowSize}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label>Football</label>
          <FormField
            control={form.control}
            name="basketball"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="checkbox" id="basketball" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label>Basketball</label>
          <FormField
            control={form.control}
            name="netball"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="checkbox" id="netball" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label>Netball</label> */}
        {/* </div> */}
        {/* Select */}
        {/* {showSize && (
          <div>
            <Label>Size*</Label>
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullSize">Full size</SelectItem>
                        <SelectItem value="orlik">Orlik</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label>Surface*</Label>
            <FormField
              control={form.control}
              name="surface"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="artificial">Artificial</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <Label>Toilet*</Label>
        <FormField
          control={form.control}
          name="toilet"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Parking*</Label>
        <FormField
          control={form.control}
          name="parking"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Showers*</Label>
        <FormField
          control={form.control}
          name="showers"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Dressing room*</Label>
        <FormField
          control={form.control}
          name="dressingRoom"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Lighting*</Label>
        <FormField
          control={form.control}
          name="lighting"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
        {/* */}
        <Label>Opening hours*</Label>
        <div className="flex flex-row gap-1">
          <FormField
            control={form.control}
            name="allTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input type="checkbox" id="allTime" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <label>24/7</label>
        </div>
        <OpeningHours />
        <Label>Description</Label>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Instagram</Label>
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="string" {...field} placeholder="Instagram" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Facebook</Label>
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="string" {...field} placeholder="Facebook" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Website</Label>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="string" {...field} placeholder="Website" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>Image*</Label>
        {url.length === 0 && <UploadBtn setUrl={setUrl} setKey={setKey} />}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" {...field} value={url} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" type="submit" className="mt-4">
          Create post
        </Button>
      </form>
      {url.length !== 0 && (
        <div>
          <Image
            src={url}
            width={100}
            height={100}
            className="w-full py-2"
            alt="Your image"
          />
          <DeleteBtn url={url} setUrl={setUrl} />
        </div>
      )}
    </Form>
  );
};

export default CreatePostForm;
