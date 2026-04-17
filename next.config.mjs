/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    qualities: [75, 80],
  },
}

export default nextConfig
