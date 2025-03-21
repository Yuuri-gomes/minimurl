const nextConfig = {
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
