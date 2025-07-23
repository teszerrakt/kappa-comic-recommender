module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/Components/*.{js,jsx,ts,tsx}",
    "./src/Views/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    extend: {
      colors: {
        kappa: {
          black: "#0e0e0e",
          "dark-gray": "#1c1c1c",
          gray: "#757575",
          green: "#57946c",
        },
      },
      width: {
        "1/5-vw": "20vw",
        "2/5-vw": "40vw",
        "3/5-vw": "60vw",
        "4/5-vw": "80vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
