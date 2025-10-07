import {
  LucideDollarSign,
  LucidePen,
  LucidePlus,
  LucideTrash,
} from "lucide-react";
import { Heading } from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <Card className="max-w-[420px]">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Task Name</CardTitle>
              <CardDescription>Details describing the task</CardDescription>
            </div>
            <Badge>active</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-row gap-x-4 items-center">
              <LucideDollarSign width="16" height="16" color="#717182" />
              <span className="font-semibold">75.00/hour</span>
            </div>
            <div className="text-gray-500 text-sm">Created: 1/14/2004</div>
            <div className="flex flex-row gap-x-2">
              <Button variant="outline" size="sm">
                <LucidePen />
              </Button>
              <Button variant="outline" size="sm">
                <LucideTrash />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskManager;
