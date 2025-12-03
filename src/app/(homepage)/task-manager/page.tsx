"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { TaskCard } from "@/components/task-card";
import { TaskDialog } from "@/components/task-dialog";
import { type ClickUpTask, getClickUpTasks } from "@/lib/utils";

export default function TaskManager() {
  // TODO: Fetch User tasks

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Task Manager"
          description="Create and manage your projects and hourly rates"
        />
        <TaskDialog mode="CREATE" />
      </div>

      <div className="mx-8 grid grid-cols-3 gap-x-8 gap-y-8">
        {/* TODO: Display created tasks here */}
      </div>
    </div>
  );
}
