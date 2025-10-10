import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type RecentInvoiceCardProps = {
  invoiceName: string;
  companyName: string;
  time: string;
  createdDate: string;
  amount: string;
  status: string;
};

const RecentInvoiceCard = ({
  invoiceName,
  companyName,
  time,
  createdDate,
  amount,
  status,
}: RecentInvoiceCardProps) => {
  return (
    <Card className="flex flex-row justify-between items-center">
      <CardHeader>
        <CardTitle>Invoice {invoiceName}</CardTitle>
        <CardDescription className="whitespace-nowrap">
          <div>
            {companyName} • {time} hours
          </div>
          <div>Created: {createdDate}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-end gap-y-1">
        <span className="font-semibold">${amount}</span>
        <Badge>{status}</Badge>
      </CardContent>
    </Card>
  );
};

export { RecentInvoiceCard };
