/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito-Regular", "sans-serif"],
        "nunito-italic": ["Nunito-Italic", "sans-serif"],
        "nunito-bold": ["Nunito-Bold", "sans-serif"],
        "nunito-semibold": ["Nunito-SemiBold", "sans-serif"],
        "nunito-light": ["Nunito-Light", "sans-serif"],
        "nunito-extrabold": ["Nunito-ExtraBold", "sans-serif"],
        "nunito-medium": ["Nunito-Medium", "sans-serif"],
      },
      colors: {
        primary: "#5E5CE6",
      },
    },
  },
  plugins: [],
};
