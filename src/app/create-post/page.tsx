"use client";
import { createPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreatePost = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [payment, setPayment] = useState<string>("Free");
  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPayment(event.target.value);
  };

  const handleCreateSubmit = async (formData: FormData) => {
    try {
      await createPost(formData);
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
          <Label>Payment</Label>
          <select name="payment" value={payment} onChange={handlePaymentChange}>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          {payment === "Paid" && (
            <>
              <Label>Cost $</Label>
              <Input type="number" name="cost" placeholder="Cost/h" />
            </>
          )}
          <Label>People</Label>
          <Input type="number" name="people" placeholder="People" required />
          <Label>Category</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Football
            </label>
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Basketball
            </label>
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Netball
            </label>
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
