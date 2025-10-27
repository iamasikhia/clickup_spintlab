"use client";

import clsx from "clsx";
import { LucidePlus } from "lucide-react";
import { useState } from "react";
import { Heading } from "@/components/heading";
import { InvoiceCreateForm } from "@/components/invoice-create-form";
import { RecentInvoiceCard } from "@/components/recent-invoice-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InvoiceGenerator = () => {
  const [showInvoiceCreateForm, setShowInvoiceCreateForm] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-1 justify-between items-center">
          <Heading
            title="Invoice Generator"
            description="Create AI-powered professional invoices from your time logs"
          />
          <Button
            className="mr-8"
            onClick={() => setShowInvoiceCreateForm(true)}
          >
            <LucidePlus />
            Create Invoice
          </Button>
        </div>
        <Card className="mx-8">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentInvoiceCard
              invoiceName="#inv_001"
              companyName="Acme Corporation"
              time="10.5"
              createdDate="1/20/2024"
              amount="754.05"
              status="approved"
            />
          </CardContent>
        </Card>
      </div>

      {showInvoiceCreateForm && (
        <>
          {/* blur when form is open */}
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40 pointer-events-auto
                   bg-black/25 duration-300"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <InvoiceCreateForm
              onClose={() => setShowInvoiceCreateForm(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default InvoiceGenerator;
