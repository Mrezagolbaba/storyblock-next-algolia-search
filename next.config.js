/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tobii.com",
        port: "",
        pathname: "/imagevault/publishedmedia/tqutr62/**",
      },
    ],
  },
};

module.exports = nextConfig;
