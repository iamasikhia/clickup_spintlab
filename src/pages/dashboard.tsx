import Link from "next/link";
import { useSession } from "next-auth/react";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type TimeLog = { id: string; project: string; hours: number; date: string };
type Invoice = {
  id: string;
  client: string;
  amount: number;
  status: "paid" | "pending";
};

const MOCK_TIMELOGS: TimeLog[] = [
  { id: "t1", project: "Project A", hours: 3.5, date: "2025-09-20" },
  { id: "t2", project: "Project B", hours: 2.0, date: "2025-09-18" },
];

const MOCK_INVOICES: Invoice[] = [
  { id: "i1", client: "Client Alpha", amount: 450.0, status: "paid" },
  { id: "i2", client: "Client Beta", amount: 300.5, status: "pending" },
];

export default function DashboardPage(): JSX.Element {
  const { data: session } = useSession();
  const [previewMode, setPreviewMode] = useState(false);

  const isAuthenticated = Boolean(session);

  // Data (mocked — replace with API data later)
  const activeTasks = 2;
  const totalHours = 13.5;
  const totalEarnings = 1012.5;
  const pendingInvoices = MOCK_INVOICES.filter(
    (i) => i.status === "pending",
  ).length;

  const timeLogs = MOCK_TIMELOGS;
  const invoices = MOCK_INVOICES;

  useEffect(() => {
    // reserved for analytics or role-based redirects later
  }, []);

  if (!isAuthenticated && !previewMode) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Please log in to view the dashboard</h2>
        <div style={{ marginTop: 16 }}>
          <Link href="/login">Go to Login</Link>
        </div>
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={() => setPreviewMode(true)}
            style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
          >
            Preview demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 220, width: "100%" }}>
        <Header />
        <main style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>Dashboard</h1>
              <div style={{ color: "#666", fontSize: 13 }}>
                Overview of your projects, hours, and invoices
              </div>
            </div>
            <div style={{ color: "#666" }}>
              {isAuthenticated ? (session?.user?.email ?? "User") : "Preview"}
            </div>
          </div>

          <section style={{ marginTop: 18 }}>
            <DashboardCards
              activeTasks={activeTasks}
              totalHours={totalHours}
              totalEarnings={totalEarnings}
              pendingInvoices={pendingInvoices}
            />
          </section>

          <section
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 18,
              }}
            >
              <h3 style={{ marginTop: 0 }}>Recent Time Logs</h3>
              {timeLogs.length === 0 ? (
                <div style={{ color: "#888" }}>No time logs</div>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {timeLogs.map((t) => (
                    <li
                      key={t.id}
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px dashed #f0f0f0",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{t.project}</div>
                      <div style={{ color: "#666", fontSize: 13 }}>
                        {t.hours} hrs — {t.date}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 18,
              }}
            >
              <h3 style={{ marginTop: 0 }}>Recent Invoices</h3>
              {invoices.length === 0 ? (
                <div style={{ color: "#888" }}>No invoices</div>
              ) : (
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {invoices.map((inv) => (
                    <li
                      key={inv.id}
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px dashed #f0f0f0",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{inv.client}</div>
                      <div style={{ color: "#666", fontSize: 13 }}>
                        ${inv.amount.toFixed(2)} — {inv.status}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
