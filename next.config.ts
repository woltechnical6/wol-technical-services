import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating "N" dev-tools badge; compile/runtime errors still surface.
  devIndicators: false,
};

export default nextConfig;
