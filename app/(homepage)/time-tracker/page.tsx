"use client"

import { useState } from "react"
import { LucideClock, LucidePlay, LucideSquare } from "lucide-react"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ManualEntryDialog } from "@/components/manual-entry-dialog"

type TimeEntry = {
  id: string
  task: string
  hours: string
  minutes: string
  date: string
}

const TimeTracker = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  const handleAddEntry = (entryData: { task: string; hours: string; minutes: string; date: string }) => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      task: entryData.task,
      hours: entryData.hours,
      minutes: entryData.minutes,
      date: entryData.date,
    }
    setTimeEntries((prev) => [...prev, newEntry])
    console.log("[v0] Time entry added successfully:", newEntry)
  }

  const getTodayEntries = () => {
    const today = new Date().toISOString().split("T")[0]
    return timeEntries.filter((entry) => entry.date === today)
  }

  const todayEntries = getTodayEntries()

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading title="Time Tracker" description="Track time for your projects and manage time logs" />
        <ManualEntryDialog onSubmit={handleAddEntry} />
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
          {todayEntries.length === 0 ? (
            <div className="text-gray-500 self-center">
              No time logged today. Start tracking time or add manual entries.
            </div>
          ) : (
            <div className="flex flex-col gap-y-4">
              {todayEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <div className="font-semibold">{entry.task}</div>
                    <div className="text-sm text-gray-500">{entry.date}</div>
                  </div>
                  <div className="font-mono">
                    {entry.hours}h {entry.minutes}m
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TimeTracker
