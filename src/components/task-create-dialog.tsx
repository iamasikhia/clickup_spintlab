import { LucidePlus } from "lucide-react";
import Form from "next/form";
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

const TaskCreateDialog = () => {
  return (
    <Dialog>
      <Form action="">
        <DialogTrigger asChild>
          <Button variant="default" className="mr-8">
            <LucidePlus />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>

          {/* DIALOG FORM INPUTS */}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input id="task-name" placeholder="Enter task name" required />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="rate">Hourly Rate ($)</Label>
            <Input id="rate" type="number" placeholder="75" />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input id="description" placeholder="Enter task description" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export { TaskCreateDialog };
