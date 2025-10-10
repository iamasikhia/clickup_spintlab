import {
  LucideClock,
  LucidePlay,
  LucidePlus,
  LucideSquare,
} from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const TimeTracker = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Time Tracker"
          description="Track time for your projects and manage time logs"
        />
        <Button className="mr-8" variant="outline">
          <LucidePlus />
          Manual Entry
        </Button>
      </div>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <LucideClock width="20" height="20" />
            Time Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <span className="text-sm font-semibold">Select task</span>
          <Select>
            <SelectTrigger className="w-[360px]">
              <SelectValue placeholder="Choose a task to track time for" />
            </SelectTrigger>
          </Select>
          <div className="font-mono text-6xl self-center">00:00:00</div>
          <div className="self-center flex gap-x-4">
            <Button>
              <LucidePlay />
              Start
            </Button>
            <Button variant="destructive">
              <LucideSquare />
              Stop and Save
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Today's Time Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-500 self-center">
            No time logged today. Start tracking time or add manual entries.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeTracker;
