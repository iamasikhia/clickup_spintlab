"use client";

import { LucideEye, LucidePlus, LucideWand } from "lucide-react";
import Form from "next/form";
import { InvoicePreviewDialog } from "./invoice-preview-dialog";
import { Button } from "./ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { getClickUpTasks, type ClickUpTask, getSmartBilling } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function InvoiceCreateDialog() {
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
    
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

  const selectedTask = selectedTaskId
    ? tasks.find((task) => task.id === selectedTaskId)
    : undefined;
  
  const handleGeneration = async () => {
    try {
      /* try to generate the description */
      setIsGenerating(true);
      setGenError(null);
      
      if (!selectedTask) {
        setGenError("Please select a task first.");
        return;
      }

      const time = 3;
      const rate = 75;
      const logs = 1;

      const generated = await getSmartBilling({title: selectedTask.name, time, rate, logs});
      setDescription(generated);

    } catch (err) {
      /* handle errors */
      console.error(err);
      setGenError("Failed to generate description.");
    } finally {
      /* what is run regardless */
    setIsGenerating(false);
    }
  };

  return (
    <Dialog>
      <Form action="">
        <DialogTrigger asChild>
          <Button variant="default" className="mr-8">
            <LucidePlus />
            Create Invoice
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-y-6">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>

          {/* DIALOG FORM INPUTS */}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task">Select Task to Invoice</Label>
            <Select value = {selectedTaskId} onValueChange = {(value) => setSelectedTaskId(value)} disabled = {loading || !!error}>
              <SelectTrigger id="task" name="task" className="w-full">
                <SelectValue placeholder= {loading ? "Loading tasks..." : "Select a task"}/>
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
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter client/company name"
              required
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Client Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter client/company email"
              required
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <Button type = "button"
              onClick = {handleGeneration}
              variant = "outline"
              size="sm"
              disabled = {isGenerating}>
                <LucideWand />
                {isGenerating ? "Generating..." : "AI Generate"}
              </Button>
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter invoice description"
              value = {description}
              onChange = {(e) => setDescription(e.target.value)}
            />

            {genError && (
              <p className = "text-sm text-red-500 mt-2">
                {genError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="notes">Notes & Terms</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Payment terms, additional notes, etc."
            />
          </div>

          <DialogFooter>
            <div className="flex gap-x-2">
              <InvoicePreviewDialog
                invoiceName="Preview"
                file="/invoices/example_invoice.pdf"
              >
                <Button variant="outline">
                  <div className="flex justify-between items-center gap-x-2">
                    <LucideEye />
                    <span>Preview</span>
                  </div>
                </Button>
              </InvoicePreviewDialog>
              <Button type = "submit">Create Invoice</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
};