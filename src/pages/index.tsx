

import { signOut, useSession } from "next-auth/react";
import type * as React from "react";

export default function HomePage(): React.JSX.Element {
  const { data: sessionTyped } = useSession();

  if (!sessionTyped) return <p>Please log in</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Welcome {sessionTyped.user?.email}!</h1>
      <p>Your role: {sessionTyped.user?.role}</p>

      {sessionTyped.user?.role === "admin" && <div>🔑 Admin dashboard</div>}
      {sessionTyped.user?.role === "freelancer" && (
        <div>💼 Freelancer panel</div>
      )}
      {sessionTyped.user?.role === "client" && <div>📋 Client tools</div>}

      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
