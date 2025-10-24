module.exports = {
  async redirects() {
    return [
      {
        source: '/@:username',
        destination: '/:username',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  // Enable features for improved SEO and performance
  experimental: {
    optimizeFonts: true
  },
  // Configure image optimization
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'api.dicebear.com']
  },
  // Enable compression for better performance
  compress: true,
  // Add poweredByHeader false to remove X-Powered-By header for security
  poweredByHeader: false,
  // Configure headers for better SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
  // Custom domain support
  trailingSlash: false,
}