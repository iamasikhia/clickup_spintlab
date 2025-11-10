"use client"

import { useState } from "react"
import { LucidePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type AddTaskDialogProps = {
  onSubmit: (taskData: { title: string; description: string; rate: string }) => void
}

export function AddTaskDialog({ onSubmit }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rate, setRate] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (title && description && rate) {
      onSubmit({ title, description, rate })
      // Reset form
      setTitle("")
      setDescription("")
      setRate("")
      // Close dialog
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-8">
          <LucidePlus />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Create a new task to track time and manage projects</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-6 py-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
            <Input
              id="hourly-rate"
              type="number"
              placeholder="75.00"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              step="0.01"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
