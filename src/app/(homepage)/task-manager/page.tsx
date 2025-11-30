"use client";

import { LucidePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { TaskCard } from "@/components/task-card";
import { TaskDialog } from "@/components/task-dialog";
import { Button } from "@/components/ui/button";
import { TaskCreateDialog } from "@/components/task-create-dialog";
import { getClickUpTasks, type ClickUpTask } from "@/lib/utils";

export default function TaskManager() {
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getClickUpTasks();
        setTasks(result);
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === "No access token found") {
          setError("Please log in before viewing your ClickUp tasks.");
        } else {
          setError("Could not fetch ClickUp tasks.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Task Manager"
          description="Create and manage your projects and hourly rates"
        />
        <TaskDialog mode="CREATE" />
      </div>

      {loading && (
        <p className="mx-8">Loading tasks from ClickUp...</p>
      )}

      {error && (
        <p className = "mx-8 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mx-8 grid grid-cols-3 gap-x-8 gap-y-8">
        {tasks.map((task) => (
          <TaskCard
            key = {task.id}
            title = {task.name}
            description="Description of the card"
            status={task.status?.status ?? "active"}
            rate="75.00"
            created={new Date(Number(task.date_created)).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
};
