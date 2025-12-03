"use client";

import { useState } from "react";
import { ExportOptionsCard } from "@/components/export-options-card";
import { Heading } from "@/components/heading";
import { InvoiceCard } from "@/components/invoice-card";
import { InvoiceExportDetailsCard } from "@/components/invoice-export-details-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Export = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<string | undefined>(
    undefined,
  );

  return (
    <div className="flex flex-col gap-y-8 mb-4">
      <Heading
        title="Export & Share"
        description="Download invoices as PDF or send them directly via email"
      />
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Select Invoice to Export</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <span className="font-semibold text-sm">Select invoice</span>
          <Select
            value={selectedInvoice}
            onValueChange={(value) => setSelectedInvoice(value)}
          >
            <SelectTrigger className="w-[360px]">
              <SelectValue placeholder="Select an invoice to export or share" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: display actual user created invoices here */}
              <SelectItem value="dummy-invoice">
                Invoice #inv_001 - $787.50 (Acme Corporation)
              </SelectItem>
            </SelectContent>
          </Select>
          {selectedInvoice === "dummy-invoice" && (
            <div className="flex flex-col gap-y-4 mt-2">
              <InvoiceExportDetailsCard
                invoiceName="#inv_001"
                companyName="Acme Corporation"
                companyEmail="billing@acme.com"
                time="10.5"
                createdDate="1/20/2024"
                amount="754.05"
              />
              <ExportOptionsCard />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Export History</CardTitle>
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

export default Export;
