"use client"

import { useState } from "react"
import { Heading } from "@/components/heading"
import { RecentInvoiceCard } from "@/components/recent-invoice-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"

type Invoice = {
  id: string
  invoiceName: string
  companyName: string
  time: string
  createdDate: string
  amount: string
  status: string
}

const InvoiceGenerator = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceName: "#inv_001",
      companyName: "Acme Corporation",
      time: "10.5",
      createdDate: "1/20/2024",
      amount: "754.05",
      status: "approved",
    },
  ])

  const handleCreateInvoice = (invoiceData: {
    client: string
    project: string
    startDate: string
    endDate: string
    notes: string
  }) => {
    // Calculate invoice number
    const invoiceNumber = `#inv_${String(invoices.length + 1).padStart(3, "0")}`

    // For demo, calculate random hours between 5-20
    const hours = (Math.random() * 15 + 5).toFixed(1)
    const rate = 75.0 // Default hourly rate
    const amount = (Number.parseFloat(hours) * rate).toFixed(2)

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceName: invoiceNumber,
      companyName: invoiceData.client,
      time: hours,
      createdDate: new Date().toLocaleDateString(),
      amount: amount,
      status: "pending",
    }
    setInvoices((prev) => [...prev, newInvoice])
    console.log("[v0] Invoice created successfully:", newInvoice)
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-1 justify-between items-center">
        <Heading title="Invoice Generator" description="Create AI-powered professional invoices from your time logs" />
        <CreateInvoiceDialog onSubmit={handleCreateInvoice} />
      </div>
      <Card className="mx-8">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          {invoices.map((invoice) => (
            <RecentInvoiceCard
              key={invoice.id}
              invoiceName={invoice.invoiceName}
              companyName={invoice.companyName}
              time={invoice.time}
              createdDate={invoice.createdDate}
              amount={invoice.amount}
              status={invoice.status}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default InvoiceGenerator
