import type { Config } from "tailwindcss";

const config = {
  darkMode: ["selector", ".mocha"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgb(var(--ctp-overlay0))",
        input: "rgb(var(--ctp-text))",
        ring: "rgb(var(--ctp-blue))",
        background: "rgb(var(--ctp-base))",
        foreground: "rgb(var(--ctp-text))",
        primary: {
          DEFAULT: "rgb(var(--ctp-teal))",
          foreground: "rgb(var(--ctp-base))",
        },
        secondary: {
          DEFAULT: "rgb(var(--ctp-surface0))",
          foreground: "rgb(var(--ctp-text))",
        },
        destructive: {
          DEFAULT: "rgb(var(--ctp-red))",
          foreground: "rgb(var(--ctp-mantle))",
        },
        muted: {
          DEFAULT: "rgb(var(--ctp-surface0))",
          foreground: "rgb(var(--ctp-subtext1))",
        },
        accent: {
          DEFAULT: "rgb(var(--ctp-surface0))",
          foreground: "rgb(var(--ctp-text))",
        },
        popover: {
          DEFAULT: "rgb(var(--ctp-base))",
          foreground: "rgb(var(--ctp-text))",
        },
        card: {
          DEFAULT: "rgb(var(--ctp-base))",
          foreground: "rgb(var(--ctp-text))",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@catppuccin/tailwindcss")],
} satisfies Config;

export default config;
