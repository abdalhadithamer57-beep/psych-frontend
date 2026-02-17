/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          orange: "#FF8C42",
          orangeDark: "#E87A30",
          gold: "#F9C74F",
          red: "#F94144",
          cream: "#FFF9F5",
          creamDark: "#FDF2E9",
          text: "#432818",
          subtext: "#7F5539",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        }
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(255, 140, 66, 0.15)",
        "warm-hover": "0 10px 25px -4px rgba(255, 140, 66, 0.25)",
      }
    },
  },
  plugins: [],
}