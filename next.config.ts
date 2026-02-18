import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/break-collective-illusions" : "",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
