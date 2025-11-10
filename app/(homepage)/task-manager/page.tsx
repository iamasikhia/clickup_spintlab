"use client"

import { useState } from "react"
import { Heading } from "@/components/heading"
import { TaskCard } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"

type Task = {
  id: string
  title: string
  description: string
  status: string
  rate: string
  created: string
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Task Card",
      description: "Description of the card",
      status: "active",
      rate: "75.00",
      created: "1/4/2014",
    },
    {
      id: "2",
      title: "Task Card",
      description: "Description of the card",
      status: "active",
      rate: "75.00",
      created: "1/4/2014",
    },
    {
      id: "3",
      title: "Task Card",
      description: "Description of the card",
      status: "active",
      rate: "75.00",
      created: "1/4/2014",
    },
  ])

  const handleAddTask = (taskData: { title: string; description: string; rate: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      status: "active",
      rate: taskData.rate,
      created: new Date().toLocaleDateString(),
    }
    setTasks((prev) => [...prev, newTask])
    console.log("[v0] Task added successfully:", newTask)
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading title="Task Manager" description="Create and manage your projects and hourly rates" />
        <AddTaskDialog onSubmit={handleAddTask} />
      </div>
      <div className="mx-8 grid grid-cols-3 gap-x-8 gap-y-8">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            rate={task.rate}
            created={task.created}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskManager
