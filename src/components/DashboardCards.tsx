import type * as React from "react";

type Props = {
  activeTasks: number;
  totalHours: number;
  totalEarnings: number;
  pendingInvoices: number;
};

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 18,
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{children}</div>
    </div>
  );
}

export default function DashboardCards({
  activeTasks,
  totalHours,
  totalEarnings,
  pendingInvoices,
}: Props): React.JSX.Element {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 20,
      }}
    >
      <Card title="Active Tasks">{activeTasks}</Card>
      <Card title="Total Hours">{totalHours}</Card>
      <Card title="Total Earnings">${totalEarnings.toFixed(2)}</Card>
      <Card title="Pending Invoices">{pendingInvoices}</Card>
    </div>
  );
}
