/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/work/proposal-engine-anc",
        destination: "/work/proposal-engine",
        permanent: true,
      },
      {
        source: "/work/operations-cockpit",
        destination: "/work/venue-operations",
        permanent: true,
      },
      {
        source: "/work/crm-platform-extension",
        destination: "/work/crm-platform",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
