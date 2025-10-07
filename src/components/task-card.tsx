import { LucideDollarSign, LucidePen, LucideTrash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TaskCardProps = {
  title: string;
  description: string;
  status: string;
  rate: string;
  created: string;
};

const TaskCard = ({
  title,
  description,
  status,
  rate,
  created,
}: TaskCardProps) => {
  return (
    <Card className="max-w-[420px]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Badge>{status}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-4 items-center">
          <LucideDollarSign width="16" height="16" color="#717182" />
          <span className="font-semibold">{rate}/hour</span>
        </div>
        <div className="text-gray-500 text-sm">Created: {created}</div>
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
  );
};

export { TaskCard };
