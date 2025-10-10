import {
  LucideCircleCheck,
  LucideCircleX,
  LucideClock,
  LucideSend,
} from "lucide-react";
import { AllInvoiceCard } from "@/components/all-invoice-card";
import { Heading } from "@/components/heading";
import { InvoiceApprovalStatusCard } from "@/components/invoice-approval-status-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceApproval = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading
          title="Invoice Approval"
          description="Send invoices for client approval and manage payment setup"
        />
        <Button className="mr-8">
          <LucideSend />
          Send for Approval
        </Button>
      </div>

      <div className="mx-8 grid grid-cols-3 grid-rows-2 gap-4">
        <InvoiceApprovalStatusCard
          title="Pending Approval"
          icon={<LucideClock width="18" height="18" />}
          status="pending"
          number="0"
          description="Awaiting client response"
        />
        <InvoiceApprovalStatusCard
          title="Approved"
          icon={<LucideCircleCheck width="18" height="18" color="#00A63D" />}
          status="approved"
          number="1"
          description="Ready for payment"
        />
        <InvoiceApprovalStatusCard
          title="Rejected"
          icon={<LucideCircleX width="18" height="18" color="#E7000B" />}
          status="rejected"
          number="0"
          description="Need revision"
        />
        <Card className="col-span-3 row-span-1">
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <AllInvoiceCard
              invoiceName="#inv_001"
              companyName="Acme Corporation"
              time="10.5"
              createdDate="1/20/2024"
              amount="787.50"
              status="approved"
              approver="John Smith"
              approveDate="1/25/2024"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceApproval;
