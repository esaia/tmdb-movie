/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'image.tmdb.org',
        pathname: '/t/**',
      },

      {
        protocol: 'http',
        port: '8000',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        port: '8000',
        hostname: '192.168.0.103',
        pathname: '/**',
      },
      {
        protocol: 'http',
        port: '8000',
        hostname: '10.0.0.149',
        pathname: '/**',
      },
      {
        protocol: 'http',
        port: '8000',
        hostname: '46.49.48.79',
        pathname: '/**',
      },

      {
        protocol: 'http',
        port: '',
        hostname: 'api.qmovies.net',
        pathname: '/storage/**',
      },

      {
        protocol: 'https',
        port: '',
        hostname: 'api.qmovies.net',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
