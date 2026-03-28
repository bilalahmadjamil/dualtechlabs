/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Dev-only: keep compiled route modules in memory a bit longer so rapid refreshes
   * are less likely to request chunks that were just invalidated mid-HMR.
   */
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  webpack: (config, { dev }) => {
    // Avoid webpack 5 persistent cache corruption in dev (can manifest as 404s on /_next/static/*).
    if (dev) {
      config.cache = false;
    }
    return config;
  },
}

module.exports = nextConfig
