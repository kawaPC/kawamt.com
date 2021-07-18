const purgecssOption = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
};

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    process.env.CSS_ENV === "production"
      ? require("@fullhuman/postcss-purgecss")(purgecssOption)
      : undefined,
    require("cssnano")({
      preset: "default",
    }),
  ],
};
