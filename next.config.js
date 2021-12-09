module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn-ak.f.st-hatena.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: "raw-loader",
    });

    return config;
  },
};
