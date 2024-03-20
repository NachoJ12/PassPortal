/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: { domains: ['grupo7-bucket.s3.amazonaws.com'] },
}

module.exports = nextConfig