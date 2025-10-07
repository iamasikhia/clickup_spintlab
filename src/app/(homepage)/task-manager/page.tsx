import { LucidePlus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

const TaskManager = () => {
  return (
    <div>
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
    </div>
  );
};

export default TaskManager;
