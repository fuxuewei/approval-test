import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page-bg)",
        surface: "var(--color-surface)",
        primary: {
          100: "var(--color-primary-100)",
          600: "var(--color-primary-600)",
        },
        success: {
          100: "var(--color-success-100)",
          600: "var(--color-success-600)",
        },
        warning: {
          100: "var(--color-warning-100)",
          600: "var(--color-warning-600)",
        },
        danger: {
          100: "var(--color-danger-100)",
          600: "var(--color-danger-600)",
        },
        info: {
          100: "var(--color-info-100)",
          600: "var(--color-info-600)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
      },
      borderRadius: {
        button: "var(--radius-button-input)",
        input: "var(--radius-button-input)",
        card: "var(--radius-card)",
        modal: "var(--radius-modal)",
        tag: "var(--radius-tag)",
        avatar: "var(--radius-avatar)",
      },
      fontSize: {
        12: ["var(--font-size-12)", { lineHeight: "var(--line-height-body)" }],
        13: ["var(--font-size-13)", { lineHeight: "var(--line-height-body)" }],
        14: ["var(--font-size-14)", { lineHeight: "var(--line-height-body)" }],
        16: ["var(--font-size-16)", { lineHeight: "var(--line-height-body)" }],
        18: ["var(--font-size-18)", { lineHeight: "var(--line-height-heading)" }],
        20: ["var(--font-size-20)", { lineHeight: "var(--line-height-heading)" }],
        22: ["var(--font-size-22)", { lineHeight: "var(--line-height-heading)" }],
        26: ["var(--font-size-26)", { lineHeight: "var(--line-height-heading-tight)" }],
        30: ["var(--font-size-30)", { lineHeight: "var(--line-height-heading-tight)" }],
        32: ["var(--font-size-32)", { lineHeight: "var(--line-height-heading-tight)" }],
        36: ["var(--font-size-36)", { lineHeight: "var(--line-height-heading-tight)" }],
      },
    },
  },
  plugins: [],
};

export default config;

