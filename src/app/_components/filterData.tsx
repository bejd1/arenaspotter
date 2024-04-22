import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/dataPicker";
import { Slider } from "@/components/ui/slider";
import SelectSort from "./selectSort";

const FilterData = () => {
  const [selectedStartHour, setSelectedStartHour] = useState("");
  const [range, setRange] = useState([0, 300]);
  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [endHourOptions, setEndHourOptions] = useState<string[]>([]);

  const handleRangeChange = (value: number[]) => {
    setRange(value);
  };

  const handleStartHourChange = (hour: string) => {
    setSelectedStartHour(hour);
  };

  const handleEndHourChange = (hour: string) => {
    setSelectedEndHour(hour);
  };

  const handleMinSalaryChange = (e: any) => {
    const newMinSalary = parseInt(e.target.value);
    const newRange = [newMinSalary, range[1]];
    setRange(newRange);
  };

  const handleMaxSalaryChange = (e: any) => {
    const newMaxSalary = parseInt(e.target.value);
    const newRange = [range[0], newMaxSalary];
    setRange(newRange);
  };

  const generateHours = () => {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = `${hour < 10 ? "0" + hour : hour}:${
          minute === 0 ? "00" : "30"
        }`;
        hours.push(formattedHour);
      }
    }
    return hours;
  };

  useEffect(() => {
    if (selectedStartHour) {
      const startHourIndex = generateHours().findIndex(
        (hour) => hour === selectedStartHour
      );
      setEndHourOptions(generateHours().slice(startHourIndex + 1));
      setSelectedEndHour("");
    }
  }, [selectedStartHour]);

  return (
    <div>
      <Dialog>
        <div className=" flex flex-row gap-2">
          <SelectSort />
          <DialogTrigger className="mb-4 bg-white text-black rounded-md">
            <Button className="hidden">More filters</Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>More filters</DialogTitle>
            <div>
              <Label className="text-md">Cost</Label>
              <div className="flex flex-row gap-4">
                <div>
                  <Label>Cost Min</Label>
                  <Input value={range[0]} onChange={handleMinSalaryChange} />
                </div>
                <div>
                  <Label>Cost Max</Label>
                  <Input value={range[1]} onChange={handleMaxSalaryChange} />
                </div>
              </div>
              <Slider
                value={range}
                max={300}
                min={0}
                step={1}
                minStepsBetweenThumbs={1}
                onValueChange={handleRangeChange}
                className="mt-2"
              />
              <div className="flex flex-row justify-between">
                <p>{range[0]}$</p>
                <p>{range[1]}$</p>
              </div>
            </div>
          </DialogHeader>
          <Button>Search</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterData;
