import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "divinity-prorate-lived.ngrok-free.dev",
  ],

  // All images are served locally from public/images/ — no remote image
  // hosts to allowlist.
};

export default nextConfig;