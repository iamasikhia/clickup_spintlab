import { LucidePlus } from "lucide-react";
import { Heading } from "@/components/heading";
import { TaskCard } from "@/components/task-card";
import { Button } from "@/components/ui/button";

const TaskManager = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Task Manager"
          description="Create and manage your projects and hourly rates"
        />
        <Button className="mr-8">
          <LucidePlus />
          Add Task
        </Button>
      </div>
      <div className="mx-8">
        <TaskCard
          title="Task Card"
          description="Description of the card"
          status="active"
          rate="75.00"
          created="1/4/2014"
        />
      </div>
    </div>
  );
};

export default TaskManager;
