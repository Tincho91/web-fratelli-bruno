import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      zIndex: {
        1: "1",
        11: "11",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
    },
  },
  plugins: [typography],
} satisfies Config;

export default config;
