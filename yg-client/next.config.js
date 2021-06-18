module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // source: '/api/:path*',
        source: '/:path*',
        destination: 'http://localhost:5000/:path*' // api server
      }
    ]
  }
}
