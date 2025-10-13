export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // ✅ Comfortaa everywhere
        comfortaa: ["Comfortaa", "cursive"],
      },
      colors: {
        quickdeliva: {
          DEFAULT: "oklch(63.7% 0.237 25.331)",
          dark: "oklch(48% 0.23 25.331)",
          light: "oklch(78% 0.18 25.331)",
        },
      },
    },
  },
  plugins: [],
};