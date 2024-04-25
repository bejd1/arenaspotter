import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SelectItem {
  label: string;
  value: string;
}

const daysOfWeek: SelectItem[] = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const times: SelectItem[] = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j += 15) {
    const hour = i.toString().padStart(2, "0");
    const minute = j.toString().padStart(2, "0");
    times.push({ label: `${hour}:${minute}`, value: `${hour}:${minute}` });
  }
}
// Dodanie godziny "24:00"
times.push({ label: "24:00", value: "24:00" });

const OpeningHours = () => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setSelectedStartTime("");
    setSelectedEndTime("");
  };

  const handleStartTimeChange = (time: string) => {
    setSelectedStartTime(time);
    setSelectedEndTime("");
  };

  const handleEndTimeChange = (time: string) => {
    setSelectedEndTime(time);
  };

  return (
    <>
      {daysOfWeek.map((day) => (
        <div key={day.value}>
          <Label>{day.label}</Label>
          <div className="flex flex-row gap-2">
            <Select required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    onSelect={() => handleStartTimeChange(time.value)}
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select required>
              {/* <Select required disabled={!selectedStartTime}> */}
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Time" />
              </SelectTrigger>
              <SelectContent>
                {times
                  .filter((time) =>
                    selectedStartTime ? time.value > selectedStartTime : true
                  )
                  .map((time) => (
                    <SelectItem
                      key={time.value}
                      value={time.value}
                      onSelect={() => handleEndTimeChange(time.value)}
                    >
                      {time.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </>
  );
};

export default OpeningHours;
