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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ManualEntryDialogProps = {
  onSubmit: (entryData: { task: string; hours: string; minutes: string; date: string }) => void
}

export function ManualEntryDialog({ onSubmit }: ManualEntryDialogProps) {
  const [task, setTask] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [date, setDate] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (task && date && (hours || minutes)) {
      onSubmit({
        task,
        hours: hours || "0",
        minutes: minutes || "0",
        date,
      })
      // Reset form
      setTask("")
      setHours("")
      setMinutes("")
      setDate("")
      // Close dialog
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-8 bg-transparent" variant="outline">
          <LucidePlus />
          Manual Entry
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Manual Time Entry</DialogTitle>
          <DialogDescription>Manually add time for a task</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-6 py-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task-select">Select Task</Label>
            <Select value={task} onValueChange={setTask}>
              <SelectTrigger id="task-select">
                <SelectValue placeholder="Choose a task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Task Card">Task Card</SelectItem>
                <SelectItem value="Development Work">Development Work</SelectItem>
                <SelectItem value="Client Meeting">Client Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col gap-y-2 flex-1">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                placeholder="0"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                max="23"
              />
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                placeholder="0"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Entry</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
