/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  // experimental: {
  //   instrumentationHook: true,
  // },
};
