import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type AllInvoiceCardProps = {
  invoiceName: string;
  companyName: string;
  time: string;
  createdDate: string;
  amount: string;
  status: string;
  approver?: string;
  approveDate?: string;
};

const AllInvoiceCard = ({
  invoiceName,
  companyName,
  time,
  createdDate,
  amount,
  status,
  approver,
  approveDate,
}: AllInvoiceCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-x-2 items-center">
          Invoice {invoiceName}
          <Badge>{status}</Badge>
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
          <div>
            <span className="font-semibold">Client:</span> {companyName}
          </div>
          <div>
            <span className="font-semibold">Amount:</span> ${amount}
          </div>
          <div>
            <span className="font-semibold">Hours:</span> {time}
          </div>
          <div>
            <span className="font-semibold">Created:</span> {createdDate}
          </div>
        </CardDescription>
        {status === "approved" && (
          <CardContent className="mt-2 p-2 bg-green-50 rounded-xl">
            <div className="text-green-900">
              <span className="font-bold">Approved by: </span>
              {approver} - {companyName} on {approveDate}
            </div>
          </CardContent>
        )}
      </CardHeader>
    </Card>
  );
};

export { AllInvoiceCard };
