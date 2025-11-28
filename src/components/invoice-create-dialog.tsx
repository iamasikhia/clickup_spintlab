import { LucideEye, LucidePlus, LucideWand } from "lucide-react";
import Form from "next/form";
import { InvoicePreviewDialog } from "./invoice-preview-dialog";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const InvoiceCreateDialog = () => {
  return (
    <Dialog>
      <Form action="">
        <DialogTrigger asChild>
          <Button variant="default" className="mr-8">
            <LucidePlus />
            Create Invoice
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-y-6">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>

          {/* DIALOG FORM INPUTS */}

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="task">Select Task to Invoice</Label>
            <Select>
              <SelectTrigger id="task" name="task" className="w-full">
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {/* TODO: USER'S TASKS FROM DB SHOULD BE PUT INTO THIS SELECT */}
                <SelectItem value="task1">Task 1</SelectItem>
                <SelectItem value="task2">Task 2</SelectItem>
                <SelectItem value="task3">Task 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter client/company name"
              required
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Client Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter client/company email"
              required
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              {/* TODO: AI GENERATION OF TASK DESCRIPTION */}
              <Button variant="outline" size="sm">
                <LucideWand />
                <span className="line-through">AI Generate</span>
              </Button>
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Description of services provided"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="notes">Notes & Terms</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Payment terms, additional notes, etc."
            />
          </div>

          <DialogFooter>
            <div className="flex gap-x-2">
              <InvoicePreviewDialog
                invoiceName="Preview"
                file="/invoices/example_invoice.pdf"
              >
                <Button variant="outline">
                  <div className="flex justify-between items-center gap-x-2">
                    <LucideEye />
                    <span>Preview</span>
                  </div>
                </Button>
              </InvoicePreviewDialog>
              <Button>Create Invoice</Button>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export { InvoiceCreateDialog };
