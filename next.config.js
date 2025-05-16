module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/index.html',
        permanent: true, // Set to true if the redirect is permanent
      },
      {
        source: '/@:username',
        destination: '/:username',
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
}