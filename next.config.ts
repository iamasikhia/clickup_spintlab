import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/openai-route",
        destination: "http://localhost:8000/openai-route"
      },
      {
        source: "/api/auth/jwt/login",
        destination: "http://localhost:8000/auth/jwt/login",
      },
      {
        source: "/api/clickup/auth",
        destination: "http://localhost:8000/clickup/auth",
      },
      {
        source: "/api/clickup/tasks",
        destination: "http://localhost:8000/clickup/tasks",
      },
    ];
  },
};

export default nextConfig;
