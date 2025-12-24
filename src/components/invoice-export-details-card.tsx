import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type InvoiceExportDetailsCardProps = {
  invoiceName: string;
  companyName: string;
  companyEmail: string;
  time: string;
  createdDate: string;
  amount: string;
};

const InvoiceExportDetailsCard = ({
  invoiceName,
  companyName,
  companyEmail,
  time,
  createdDate,
  amount,
}: InvoiceExportDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex flex-col">
            <div className="text-sm">
              <span className="font-semibold">Invoice Name: </span>{" "}
              {invoiceName}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Client: </span> {companyName}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Email: </span> {companyEmail}
            </div>
          </div>
          <div className="flex flex-col ml-auto w-1/2">
            <div className="text-sm">
              <span className="font-semibold">Time: </span> {time}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Created Date: </span>{" "}
              {createdDate}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Amount: </span> {amount}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { InvoiceExportDetailsCard };
