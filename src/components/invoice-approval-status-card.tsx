import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type InvoiceApprovalStatusCardProps = {
  title: string;
  icon: React.ReactNode;
  status: string;
  number: string;
  description: string;
};

const InvoiceApprovalStatusCard = ({
  title,
  icon,
  status,
  number,
  description,
}: InvoiceApprovalStatusCardProps) => {
  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex flex-col">
        <span
          className={clsx(
            status === "approved" && "text-[#00A63D]",
            status === "rejected" && "text-[#E7000B]",
            "font-bold text-2xl",
          )}
        >
          {number}
        </span>
        <span className="text-xs text-gray-500">{description}</span>
      </CardContent>
    </Card>
  );
};

export { InvoiceApprovalStatusCard };
