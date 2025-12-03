"use client";

import {
  LucideClock,
  LucidePause,
  LucidePlay,
  LucideSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { TimeTrackerDialog } from "@/components/time-tracker-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { formatSeconds } from "@/lib/utils";
import { getClickUpTasks, type ClickUpTask } from "@/lib/utils";

const TimeTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const hasTaskSelected = !!selectedTaskId;

  useEffect(() => {
    if (!hasTaskSelected) return;
    if (!isTracking) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, hasTaskSelected, selectedTaskId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getClickUpTasks();
        setTasks(result);
      } catch (error) {
        setError("Failed to fetch tasks");
        setLoading(false);
      } finally {
        setLoading(false);
      } 
    };

    fetchTasks();
  }, []);
  
  const selectedTask = selectedTaskId
  ? tasks.find((task) => task.id === selectedTaskId)
  : undefined;

  const handleStop = () => {
    setIsTracking(false);
    setTime(0);
    setSelectedTaskId(undefined);

    // TODO: SAVE TASK TIME AND ADD TO RECENT TIME LOGS
  };



  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Time Tracker"
          description="Track time for your projects and manage time logs"
        />
        <TimeTrackerDialog />
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
          <Select value={selectedTaskId}
          onValueChange={(value) => setSelectedTaskId(value)}
          disabled={loading || !!error}>
            <SelectTrigger id = "task" name = "task" className="w-[360px]">
              <SelectValue placeholder= {loading ? "Loading tasks..." : "Choose a task to track time for"} />
            </SelectTrigger>
            <SelectContent>
              {!loading && !error && tasks.length === 0 && (
                <SelectItem value = "none" disabled>No tasks found</SelectItem>
              )}
              {!loading && !error && tasks.map((task) => (
                <SelectItem key={task.id} value={task.id}>
                  {task.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="font-mono text-6xl self-center">
            {formatSeconds(time)}
          </div>

          <div className="self-center flex gap-x-4">
            <Button 
              onClick={() => {
                if (!hasTaskSelected) return;
                setIsTracking((prev) => !prev);
              }}
              disabled={!hasTaskSelected}>
              {isTracking ? (
                <>
                  <LucidePause />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <LucidePlay />
                  <span>Start</span>
                </>
              )}
            </Button>
            <Button variant="destructive" onClick={handleStop}>
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
