// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        net: false,
        tls: false,
        os: false,
        http: false,
        https: false,
        stream: false,
        zlib: false,
        crypto: false,
        child_process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
