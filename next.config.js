/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/form",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
