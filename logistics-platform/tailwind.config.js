/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0f172a",
      },
      fontFamily: {
        sans: ["system-ui", "SF Pro Text", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.35)",
        "glow-sm": "0 0 20px rgba(56, 189, 248, 0.25)",
      },
    },
  },
  plugins: [],
};
