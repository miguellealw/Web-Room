module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // {
      //   source: '/categories/:id',
      //   destination: 'http://localhost:5000/api/v1.0/users/current_user/categories/:id' // api server
      // },
      {
        source: "/auth/v1.0/:path*", // client
        destination: "http://localhost:5000/auth/v1.0/:path*", // api server
      },
      {
        // source: '/api/:path*',
        source: "/api/v1.0/:path*", // client
        destination: "http://localhost:5000/api/v1.0/:path*", // api server
      },
    ];
  },

  images: {
    domains: ["yt3.ggpht.com"],
  },

  env: {
    API_URL: process.env.API_URL,
  },
};
