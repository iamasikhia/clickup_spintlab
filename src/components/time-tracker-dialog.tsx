"use client";

import { format } from "date-fns";
import { LucideCalendar, LucidePlus } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const TimeTrackerDialog = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog>
      <Form action="">
        <DialogTrigger>
          <Button variant="outline" className="mr-8">
            <LucidePlus />
            Manual Time Entry
          </Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col gap-y-6">
          <DialogHeader>
            <DialogTitle>Add Time Manually</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task">Select a Task</Label>
            <Select>
              <SelectTrigger id="task" className="w-full">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {/* TODO: USER'S TASKS FROM DB SHOULD BE PUT INTO THIS SELECT */}
                <SelectItem value="task1">Task 1</SelectItem>
                <SelectItem value="task2">Task 2</SelectItem>
                <SelectItem value="task3">Task 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input
              id="hours"
              type="number"
              placeholder="0.00"
              step="0.25"
              min="0"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                >
                  <LucideCalendar />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" placeholder="What did you work on?" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Time Log</Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export { TimeTrackerDialog };
