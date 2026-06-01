import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: "#0D0D0D",
        alabaster: "#FBFBFA",
        champagne: "#D4AF37",
        moss: "#2C3E2B",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.15em",
        ultrawide: "0.25em",
      },
      transitionDuration: {
        "900": "900ms",
      },
    },
  },
  plugins: [],
};

export default config;
