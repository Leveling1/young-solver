/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Ajouté pour l'exportation statique
  images: {
    unoptimized: true,
    qualities: [75, 80],
  },
}

export default nextConfig
