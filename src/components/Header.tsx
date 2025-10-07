import { signOut, useSession } from "next-auth/react";
import type * as React from "react";

export default function Header(): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <header
      style={{
        height: 72,
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 16 }}>Dashboard</div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ color: "#666", fontSize: 14 }}>
          {session?.user?.email ? `Welcome, ${session.user.email}` : ""}
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            background: "#e11d48",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
