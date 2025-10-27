import { LucideX } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type InvoiceCreateFormProps = {
  onClose: () => void;
};

const InvoiceCreateForm = ({ onClose }: InvoiceCreateFormProps) => {
  return (
    <Card className="w-[30%]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Create New Invoice</CardTitle>
          <CardDescription>Select Tasks to Invoice</CardDescription>
        </div>
        <LucideX className="cursor-pointer" size="20px" onClick={onClose} />
      </CardHeader>
    </Card>
  );
};

export { InvoiceCreateForm };
