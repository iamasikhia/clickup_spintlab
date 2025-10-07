import Link from "next/link";
import type * as React from "react";

export default function Sidebar(): React.JSX.Element {
  return (
    <aside
      aria-label="Main navigation"
      style={{
        width: 220,
        padding: 20,
        borderRight: "1px solid #eee",
        height: "100vh",
        boxSizing: "border-box",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#fff",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Smart Invoice</h2>
      </div>

      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 12 }}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li style={{ marginBottom: 12 }}>
            <Link href="/tasks">Task Manager</Link>
          </li>
          <li style={{ marginBottom: 12 }}>
            <Link href="/time-tracker">Time Tracker</Link>
          </li>
          <li style={{ marginBottom: 12 }}>
            <Link href="/invoice">Invoice Generator</Link>
          </li>
          <li style={{ marginBottom: 12 }}>
            <Link href="/export">Export and Share</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
