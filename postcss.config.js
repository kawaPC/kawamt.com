const purgecssOption = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
};

const plugins =
  process.env.CSS_ENV === "production"
    ? [
        require("tailwindcss"),
        require("autoprefixer"),
        require("@fullhuman/postcss-purgecss")(purgecssOption),
        require("cssnano")({
          preset: "default",
        }),
      ]
    : [require("tailwindcss"), require("autoprefixer")];

module.exports = {
  plugins: plugins,
};
