import { useSession } from "next-auth/react";
import type React from "react";
import { useEffect } from "react";
import Dashboard from "./dashboard";

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      window.location.href = "/api/auth/signin";
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Redirecting to sign in...</div>;
  }

  return <Dashboard />;
};

export default HomePage;
