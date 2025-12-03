import { InvoicePreviewDialog } from "./invoice-preview-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type InvoiceCardProps = {
  invoiceName: string;
  companyName: string;
  time: string;
  createdDate: string;
  amount: string;
};

const InvoiceCard = ({
  invoiceName,
  companyName,
  time,
  createdDate,
  amount,
}: InvoiceCardProps) => {
  return (
    <InvoicePreviewDialog
      invoiceName={invoiceName}
      companyName={companyName}
      file="/invoices/example_invoice.pdf"
    >
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
        </CardContent>
      </Card>
    </InvoicePreviewDialog>
  );
};

export { InvoiceCard };
