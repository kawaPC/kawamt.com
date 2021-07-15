module.exports = {
  reactStrictMode: true,
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
