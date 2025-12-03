import { Heading } from "@/components/heading";
import { InvoiceCard } from "@/components/invoice-card";
import InvoiceCreateDialog from "@/components/invoice-create-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceGenerator = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Invoice Generator"
          description="Create AI-powered professional invoices from your time logs"
        />
        <InvoiceCreateDialog />
      </div>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Created Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceCard
            invoiceName="#inv_001"
            companyName="Acme Corporation"
            time="10.5"
            createdDate="1/20/2024"
            amount="754.05"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceGenerator;
