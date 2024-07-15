import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      fontPrimary: "#000000",
      fontSecondary: "#656565",
      background: "#FFFFFF",
      separator: "#E4E4E4",
    },
    fontFamily: {
      body: ["Archivo"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
