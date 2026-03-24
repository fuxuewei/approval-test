import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 配置
 * 主题配置已迁移到 globals.css 中的 @theme 指令
 * 此文件仅保留 content 配置用于指定扫描路径
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;

