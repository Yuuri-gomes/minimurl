const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/v1/sitemap",
      },
    ];
  },
};

export default nextConfig;
