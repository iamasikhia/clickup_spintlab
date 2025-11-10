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
import { Textarea } from "@/components/ui/textarea"

type CreateInvoiceDialogProps = {
  onSubmit: (invoiceData: {
    client: string
    project: string
    startDate: string
    endDate: string
    notes: string
  }) => void
}

export function CreateInvoiceDialog({ onSubmit }: CreateInvoiceDialogProps) {
  const [client, setClient] = useState("")
  const [project, setProject] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [notes, setNotes] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (client && project && startDate && endDate) {
      onSubmit({ client, project, startDate, endDate, notes })
      // Reset form
      setClient("")
      setProject("")
      setStartDate("")
      setEndDate("")
      setNotes("")
      // Close dialog
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-8">
          <LucidePlus />
          Create Invoice
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>Generate an AI-powered invoice from your time logs</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-6 py-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="client">Client Name</Label>
            <Input
              id="client"
              placeholder="Enter client name"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="project-select">Select Project</Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger id="project-select">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Task Card">Task Card</SelectItem>
                <SelectItem value="Development Work">Development Work</SelectItem>
                <SelectItem value="Client Meeting">Client Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col gap-y-2 flex-1">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes for the invoice"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Generate Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
