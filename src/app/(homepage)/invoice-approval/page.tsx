import { LucideSend } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";

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
    </div>
  );
};

export default InvoiceApproval;
