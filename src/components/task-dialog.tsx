import { LucidePen, LucidePlus } from "lucide-react";
import Form from "next/form";
import { useEffect, useState } from "react";
import { type ClickUpTask, getClickUpTasks } from "@/lib/utils";
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

type TaskDialogProps = {
  mode: "CREATE" | "EDIT";
};

const TaskDialog = ({ mode }: TaskDialogProps) => {
  const [tasks, setTasks] = useState<ClickUpTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

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
    <Dialog>
      <Form action="">
        <DialogTrigger asChild>
          {mode === "CREATE" ? (
            <Button variant="default" className="mr-8">
              <LucidePlus />
              Add Task
            </Button>
          ) : (
            <Button variant="outline" size="sm">
              <LucidePen />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "CREATE" ? "Create New Task" : "Edit Task"}
            </DialogTitle>
          </DialogHeader>

          {/* DIALOG FORM INPUTS */}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task">Select Task to Invoice</Label>
            <Select
              value={selectedTaskId}
              onValueChange={(value) => setSelectedTaskId(value)}
              disabled={loading || !!error}
            >
              <SelectTrigger id="task" name="task" className="w-full">
                <SelectValue
                  placeholder={
                    loading ? "Loading tasks..." : "Select a ClickUp task"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {!loading && !error && tasks.length === 0 && (
                  <SelectItem value="none" disabled>
                    No tasks found
                  </SelectItem>
                )}
                {!loading &&
                  !error &&
                  tasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      <span className="block truncate max-w-[300px]">
                        {task.name}
                      </span>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="rate">Hourly Rate ($)</Label>
            <Input id="rate" name="rate" type="number" placeholder="75" />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter task description"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {mode === "CREATE" ? "Create Task" : "Edit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export { TaskDialog };
