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
    domains: ["yt3.ggpht.com", "i.ytimg.com", "s.gravatar.com"],
  },

  env: {
    API_URL: process.env.API_URL,
  },

  // TODO: fix type errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
