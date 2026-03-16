#!/usr/bin/env node
/**
 * Figma 图标同步脚本
 *
 * 功能：
 * 1. 从 Figma 获取 Icons 画布的组件列表
 * 2. 导出每个组件为 SVG
 * 3. 保存到 src/icons-core/assets/
 * 4. 自动调用 svg-to-tsx 生成 TSX 组件
 *
 * 使用：
 *   pnpm icons:pull
 *
 * 环境变量：
 *   FIGMA_TOKEN - Figma Personal Access Token
 */

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 配置
const CONFIG = {
  FILE_ID: "NQ3UwPscfsmbcDpUqafpsW",
  TARGET_CANVAS: "Foundations",
  ICON_PREFIX: "Icons/",
  OUTPUT_DIR: join(__dirname, "../src/icons-core/assets"),
  // SVG 标准化配置
  VIEWBOX: "0 0 36 36", // 根据你的项目调整，看到 CloseIcon 是 0 0 36 36
};

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

if (!FIGMA_TOKEN) {
  console.error("❌ 错误: 需要设置环境变量 FIGMA_TOKEN");
  console.error("获取方式: https://www.figma.com/developers/api#access-tokens");
  process.exit(1);
}

/**
 * 调用 Figma API 获取文件数据
 */
async function fetchFigmaFile(fileId) {
  const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API 错误: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * 从 Figma 数据结构中找到 Icons 画布
 */
function findIconsCanvas(document) {
  // 找到名为 "Foundations" 的画布
  const canvas = document.children.find(
    (child) => child.type === "CANVAS" && child.name === CONFIG.TARGET_CANVAS
  );

  if (!canvas) {
    throw new Error(`未找到画布: ${CONFIG.TARGET_CANVAS}`);
  }

  return canvas;
}

/**
 * 递归查找所有图标组件（命名以 Icons/ 开头）
 */
function findIconComponents(node, icons = []) {
  if (node.type === "COMPONENT" && node.name.startsWith(CONFIG.ICON_PREFIX)) {
    icons.push({
      id: node.id,
      name: node.name.replace(CONFIG.ICON_PREFIX, ""),
      node: node,
    });
  }

  if (node.children) {
    for (const child of node.children) {
      findIconComponents(child, icons);
    }
  }

  return icons;
}

/**
 * 导出组件为 SVG
 */
async function exportComponentAsSvg(fileId, nodeId, iconName) {
  // 1. 获取导出 URL
  const exportResponse = await fetch(
    `https://api.figma.com/v1/images/${fileId}/?ids=${encodeURIComponent(
      nodeId
    )}&format=svg`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    }
  );

  if (!exportResponse.ok) {
    throw new Error(`导出请求失败: ${exportResponse.status}`);
  }

  const exportData = await exportResponse.json();
  const svgUrl = exportData.images[nodeId];

  if (!svgUrl) {
    throw new Error(`未获取到 ${iconName} 的导出 URL`);
  }

  // 2. 下载 SVG 内容
  const svgResponse = await fetch(svgUrl);
  if (!svgResponse.ok) {
    throw new Error(`下载 SVG 失败: ${svgResponse.status}`);
  }

  return svgResponse.text();
}

/**
 * 标准化 SVG（移除硬编码 fill/stroke，使用 currentColor）
 */
function standardizeSvg(svgContent, iconName) {
  // 1. 提取 viewBox（如果 SVG 中有的话）
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : CONFIG.VIEWBOX;

  // 2. 提取所有 path/circle/rect 等元素
  // 简化处理：假设 SVG 结构是 <svg>...</svg> 包裹 path 等元素
  const pathMatches = svgContent.match(/<path[^>]*\/>/g) || [];

  if (pathMatches.length === 0) {
    console.warn(`⚠️ ${iconName}: 未找到 path 元素`);
  }

  // 3. 构建标准化的 SVG
  // 注意：这里简化处理，实际可能需要更复杂的 SVG 解析
  const paths = pathMatches
    .map((path) => {
      // 移除 fill/stroke 属性，确保使用 currentColor
      return path
        .replace(/fill="[^"]*"/g, 'fill="currentColor"')
        .replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    })
    .join("\n    ");

  return `<svg viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">\n    ${paths}\n</svg>`;
}

/**
 * 主流程
 */
async function main() {
  console.log("🚀 开始同步 Figma 图标...\n");

  try {
    // 1. 确保输出目录存在
    if (!existsSync(CONFIG.OUTPUT_DIR)) {
      await mkdir(CONFIG.OUTPUT_DIR, { recursive: true });
      console.log(`📁 创建目录: ${CONFIG.OUTPUT_DIR}`);
    }

    // 2. 获取 Figma 文件
    console.log("📡 获取 Figma 文件数据...");
    const fileData = await fetchFigmaFile(CONFIG.FILE_ID);
    console.log(`✅ 获取成功: ${fileData.name}\n`);

    // 3. 找到 Icons 画布
    console.log(`🔍 查找 ${CONFIG.TARGET_CANVAS} 画布...`);
    const iconsCanvas = findIconsCanvas(fileData.document);
    console.log(`✅ 找到画布: ${iconsCanvas.name}\n`);

    // 4. 查找所有图标组件
    const iconComponents = findIconComponents(iconsCanvas);
    console.log(`🎨 发现 ${iconComponents.length} 个图标组件:\n`);

    for (const icon of iconComponents) {
      console.log(`  • ${icon.name} (ID: ${icon.id})`);
    }
    console.log();

    // 5. 导出每个图标
    let successCount = 0;
    let failCount = 0;

    for (const icon of iconComponents) {
      try {
        process.stdout.write(`⬇️  导出 ${icon.name}... `);

        // 导出为 SVG
        const svgContent = await exportComponentAsSvg(
          CONFIG.FILE_ID,
          icon.id,
          icon.name
        );

        // 标准化
        const standardizedSvg = standardizeSvg(svgContent, icon.name);

        // 保存
        const outputPath = join(CONFIG.OUTPUT_DIR, `${icon.name}.svg`);
        await writeFile(outputPath, standardizedSvg, "utf-8");

        console.log(`✅`);
        successCount++;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        failCount++;
      }
    }

    console.log(`\n📊 导出结果: ${successCount} 成功, ${failCount} 失败`);

    // 6. 调用 svg-to-tsx 生成 TSX 组件
    if (successCount > 0) {
      console.log("\n🔧 生成 TSX 组件...\n");
      try {
        execSync("node scripts/svg-to-tsx.mjs", {
          stdio: "inherit",
          cwd: join(__dirname, ".."),
        });
        console.log("\n✅ 所有 TSX 组件生成完成！");
      } catch (error) {
        console.error("\n⚠️ TSX 生成失败，请检查 svg-to-tsx.mjs 脚本");
        process.exit(1);
      }
    }

    console.log("\n🎉 图标同步完成！");
    console.log(`\n使用方式:`);
    console.log(`  import { XxxIcon } from "@/components/icons";`);
  } catch (error) {
    console.error("\n❌ 同步失败:", error.message);
    process.exit(1);
  }
}

main();
