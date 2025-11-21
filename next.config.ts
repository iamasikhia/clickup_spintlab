import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/openai-route",
        destination: "http://localhost:8000/openai-route"
      },
    ];
  },
};

export default nextConfig;
