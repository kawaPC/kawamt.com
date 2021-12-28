module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    animation: false,
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    borderWidth: ["last"],
  },
  plugins: [],
};
