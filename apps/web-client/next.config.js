/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@youness-garage/shared'],
};

module.exports = nextConfig;
