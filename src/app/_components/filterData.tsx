import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FilterData = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          More filters
          {/* <Button></Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>More filters</DialogTitle>
            <DialogDescription>
              <Label>Price</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Pay">Pay</SelectItem>
                </SelectContent>
              </Select>
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label>Option One</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label>Option Two</Label>
                </div>
              </RadioGroup>
              <Label>Cost</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Free
                </label>
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Payment
                </label>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Button>Search</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterData;
