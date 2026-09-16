/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      enable: true,
      encryptionKey: process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,
      // allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],

    }

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      }
    ]
  },

};
export default nextConfig;
