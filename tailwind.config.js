/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1db954",
        spotifyLGreen: "#1ed760",
        spotifyBlack: "#121212",
        spotifyLBlack: "#212121",
        spotifyXLBlack: "#262626",
        spotifyGray: "#424242",
        spotifyLGray: "#b3b3b3",
      },
    },
  },
  plugins: [],
};
