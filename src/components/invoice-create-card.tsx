"use client";

import { LucideEye, LucideWand, LucideX } from "lucide-react";
import Form from "next/form";
import { useState } from "react";
import { InvoiceCreateTaskCard } from "./invoice-create-task-card";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type InvoiceCreateCardProps = {
  onClose: () => void;
};



const InvoiceCreateCard = ({ onClose }: InvoiceCreateCardProps) => {
  const [taskSelected, setTaskSelected] = useState(true);
  const description = fetchData();

  
  return (
    <Card className="w-[30%]">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Create New Invoice</CardTitle>
          <CardDescription>Select Tasks to Invoice</CardDescription>
        </div>
        <LucideX className="cursor-pointer" size="20px" onClick={onClose} />
      </CardHeader>

      <CardContent className="flex flex-col gap-y-6">
        {/* TODO: invoice list from backend */}
        <div>
          <InvoiceCreateTaskCard
            title="UI/UX Design"
            time={3}
            rate={75}
            logs={1}
          />
        </div>
        <Form action="" className="flex flex-col gap-y-6">
          <div className="flex gap-x-4">
            <div className="w-full flex flex-col gap-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Client or company name"
              />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Label htmlFor="email">Client Email</Label>
              <Input id="email" type="text" placeholder="client@example.com" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-end">
              <Label htmlFor="description">Invoice Description</Label>
              <Button variant="outline" size="sm">
                <div className="flex justify-between items-center gap-x-2">
                  <LucideWand />
                  <span>AI Generate</span>
                </div>
              </Button>
            </div>
            <Textarea
              id="description"
              placeholder="Description of services provided..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="notes">Notes and Terms</Label>
            <Textarea id="notes" placeholder="Notes and Terms" />
          </div>
        </Form>

        {taskSelected && (
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between">
                <span>Total Hours:</span>
                <span>3.0</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>$225.00</span>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex gap-x-2">
          <Button variant="outline">
            <div className="flex justify-between items-center gap-x-2">
              <LucideEye />
              <span>Preview</span>
            </div>
          </Button>
          <Button>Create Invoice</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardFooter>
    </Card>
  );  
};

async function fetchData() {
  
  const response = await fetch(
    `/api/openai-route?title=${title}=${time}&rate=${rate}&logs=${logs}`
  );

  if (!response.ok) {
    throw new Error("Failed to generate.");
  }
}

export { InvoiceCreateCard };
