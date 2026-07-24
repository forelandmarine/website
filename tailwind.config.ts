import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg0: "#040D1A",
        bg1: "#081630",
        bg2: "#0C1E42",
        accent: "#5386B6",
        green: "#22C55E",
        muted: "#7BA8C8",
        label: "#5386B6",
        // Admin ops backend (light UI, navy chrome)
        navy: "#033269",
        "navy-700": "#0A407D",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "Aptos", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
