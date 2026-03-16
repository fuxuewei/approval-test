#!/usr/bin/env node
/**
 * SVG 转 TSX 组件脚本
 *
 * 功能：
 * 1. 读取 src/icons-core/assets/*.svg
 * 2. 转换为 TSX React 组件
 * 3. 输出到 src/icons-core/components/
 * 4. 自动生成统一导出文件 src/icons-core/index.ts
 *
 * 使用：
 *   node scripts/svg-to-tsx.mjs
 */

import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 路径配置
const PATHS = {
  assets: join(__dirname, "../src/icons-core/assets"),
  components: join(__dirname, "../src/icons-core/components"),
  index: join(__dirname, "../src/icons-core/index.ts"),
};

/**
 * 驼峰命名转换
 * close-icon -> CloseIcon
 * closeIcon -> CloseIcon
 */
function toPascalCase(name) {
  return name
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase())
    .replace(/icon$/i, "") // 移除末尾的 Icon（如果有的话）
    .replace(/svg$/i, "") // 移除末尾的 svg
    + "Icon";
}

/**
 * 生成 TSX 组件代码
 */
function generateComponentCode(svgContent, componentName, fileName) {
  // 提取 viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 36 36";

  // 提取所有路径元素（简化处理）
  // 移除 svg 标签，只保留内部内容
  let innerContent = svgContent
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .trim();

  // 确保 fill 使用 currentColor
  innerContent = innerContent
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');

  return `import { cn } from "@/lib/utils";
import React from "react";

export interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const ${componentName} = React.forwardRef<SVGSVGElement, ${componentName}Props>(
  ({ className, size = 16, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="${viewBox}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={typeof size === "number" ? size : undefined}
        height={typeof size === "number" ? size : undefined}
        className={cn("inline-block shrink-0", typeof size === "string" && size, className)}
        {...props}
      >
        ${innerContent}
      </svg>
    );
  }
);

${componentName}.displayName = "${componentName}";

export default ${componentName};
`;
}

/**
 * 主流程
 */
async function main() {
  console.log("🔧 开始生成 TSX 图标组件...\n");

  try {
    // 1. 确保目录存在
    if (!existsSync(PATHS.assets)) {
      console.error(`❌ 错误: 找不到 SVG 目录 ${PATHS.assets}`);
      console.error("请先运行: pnpm icons:pull 从 Figma 同步图标");
      process.exit(1);
    }

    if (!existsSync(PATHS.components)) {
      await mkdir(PATHS.components, { recursive: true });
      console.log(`📁 创建目录: ${PATHS.components}`);
    }

    // 2. 读取所有 SVG 文件
    const files = await readdir(PATHS.assets);
    const svgFiles = files.filter((f) => f.endsWith(".svg"));

    if (svgFiles.length === 0) {
      console.warn("⚠️ 没有找到 SVG 文件");
      process.exit(0);
    }

    console.log(`🎨 发现 ${svgFiles.length} 个 SVG 文件:\n`);

    const exports = [];

    // 3. 逐个转换
    for (const file of svgFiles) {
      const filePath = join(PATHS.assets, file);
      const baseName = basename(file, extname(file));
      const componentName = toPascalCase(baseName);

      process.stdout.write(`  • ${file} -> ${componentName}.tsx... `);

      // 读取 SVG
      const svgContent = await readFile(filePath, "utf-8");

      // 生成组件
      const componentCode = generateComponentCode(svgContent, componentName, file);

      // 写入组件文件
      const componentPath = join(PATHS.components, `${componentName}.tsx`);
      await writeFile(componentPath, componentCode, "utf-8");

      exports.push({ name: componentName, file: componentName });
      console.log("✅");
    }

    // 4. 生成统一导出文件
    console.log("\n📝 生成统一导出文件...");

    const exportLines = exports
      .map(({ name, file }) => `export { ${name} } from "./components/${file}";`)
      .join("\n");

    const typeExportLines = exports
      .map(({ name }) => `export type { ${name}Props } from "./components/${name}";`)
      .join("\n");

    const indexContent = `// Icon Core - 自动生成的图标组件统一导出
// 此文件由 scripts/svg-to-tsx.mjs 自动生成
// 不要手动修改

// 类型定义
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

// 图标组件导出
${exportLines}

// 类型导出
${typeExportLines}
`;

    await writeFile(PATHS.index, indexContent, "utf-8");

    console.log(`✅ 已生成 ${exports.length} 个组件`);
    console.log(`📄 统一导出: src/icons-core/index.ts`);
    console.log(`\n🎉 完成！使用方式:`);
    console.log(`  import { XxxIcon } from "@/components/icons";`);
  } catch (error) {
    console.error("\n❌ 生成失败:", error.message);
    process.exit(1);
  }
}

main();
