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
  async rewrites() {
    // Serve the static concepts gallery index on the clean folder URL —
    // Next.js standalone doesn't auto-resolve /public/<dir>/index.html.
    return [
      { source: "/concepts", destination: "/concepts/index.html" },
      { source: "/concepts/", destination: "/concepts/index.html" },
    ];
  },
};

export default nextConfig;
