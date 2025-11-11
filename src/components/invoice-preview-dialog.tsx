import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type InvoicePreviewDialogProps = {
  children: React.ReactNode;
  invoiceName: string;
  companyName: string;
  file: string;
};

const InvoicePreviewDialog = ({
  children,
  invoiceName,
  companyName,
  file,
}: InvoicePreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>{invoiceName}</DialogTitle>
          <DialogDescription>Invoice for {companyName}</DialogDescription>
        </DialogHeader>
        <iframe src={file} width="100%" height="600px" title="Invoice PDF" />
      </DialogContent>
    </Dialog>
  );
};

export { InvoicePreviewDialog };
