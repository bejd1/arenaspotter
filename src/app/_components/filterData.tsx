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

const FilterData = () => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [isShow, setIsShow] = useState(false);
  const [selectedStartHour, setSelectedStartHour] = useState("");
  const [selectedEndHour, setSelectedEndHour] = useState("");
  const [endHourOptions, setEndHourOptions] = useState<string[]>([]);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, max: parseInt(value) }));
  };

  const handleStartHourChange = (hour: string) => {
    setSelectedStartHour(hour);
  };

  const handleEndHourChange = (hour: string) => {
    setSelectedEndHour(hour);
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
        <DialogTrigger className="mb-4 bg-white text-black font-medium px-4 py-2 rounded-md">
          More filters
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>More filters</DialogTitle>

            <Label>Price</Label>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" onClick={() => setIsShow(!isShow)} />
              <Label htmlFor="airplane-mode">Free</Label>
            </div>
            {isShow ? (
              <div></div>
            ) : (
              <div>
                <Label>Sort price</Label>
                <Input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                />
                <Label>
                  Price range: {priceRange.min}$ - {priceRange.max}$
                </Label>
              </div>
            )}
            <Label>Date</Label>
            <DatePicker />

            <Label>Hours (Start)</Label>
            <select
              value={selectedStartHour}
              onChange={(e) => handleStartHourChange(e.target.value)}
            >
              {generateHours().map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <Label>Hours (End)</Label>
            <select
              value={selectedEndHour}
              onChange={(e) => handleEndHourChange(e.target.value)}
              disabled={!selectedStartHour}
            >
              <option value="">Select</option>
              {endHourOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </DialogHeader>
          <Button>Search</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterData;
