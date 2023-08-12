/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./feature/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease",
        leave: "leave 0.3s forwards",
        enter: "enter 0.3s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(40px)", opacity: 0.2 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        leave: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        enter: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
