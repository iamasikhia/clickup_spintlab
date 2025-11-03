import { Badge } from "./ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type InvoiceCreateTaskCardProps = {
  title: string;
  time: number;
  rate: number;
  logs: number;
};

const InvoiceCreateTaskCard = ({
  title,
  time,
  rate,
  logs,
}: InvoiceCreateTaskCardProps) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="whitespace-nowrap">
            {time.toFixed(1)} hours @ ${rate}/hr
          </CardDescription>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-semibold">${(time * rate).toFixed(2)}</span>
          <Badge variant="outline">{logs} logs</Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export { InvoiceCreateTaskCard };
