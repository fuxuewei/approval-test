'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from "@/lib/utils";

/**
 * 图标组件属性
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 图标名称（对应 public/icons/ 下的文件名，不含后缀）
   * 例如: 'CaretDown', 'Message', 'folder-open'
   */
  name: string;
  /** 图标大小，默认为 20 */
  size?: number | string;
  /** 额外的 Tailwind 类名 */
  className?: string;
}

/**
 * MuseDAM 通用图标包装组件
 * 核心逻辑：
 * 1. 动态导入 SVG 资源，无需手动维护 index.ts 导出
 * 2. 强制应用 fill-current，确保颜色受 Tailwind 文本颜色（如 text-primary）控制
 * 3. 自动处理 Loading 状态，防止 UI 闪烁
 */
export const Icon = ({ name, size = 20, className, ...props }: IconProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const loadSvg = useCallback(async () => {
    try {
      // 使用 fetch 动态加载 SVG 文件内容
      const response = await fetch(`/icons/${name}.svg`);
      if (!response.ok) {
        throw new Error(`Failed to load icon: ${name}`);
      }
      let svg = await response.text();

      // 只移除 SVG 根元素的 width/height 属性（由组件控制整体尺寸），保留内部图形元素的尺寸
      svg = svg.replace(/<svg[^>]*?\s+width="[^"]*"/g, (match) => match.replace(/\s+width="[^"]*"/, ''));
      svg = svg.replace(/<svg[^>]*?\s+height="[^"]*"/g, (match) => match.replace(/\s+height="[^"]*"/, ''));
      // 添加 fill-current 类，确保颜色由 Tailwind 控制
      svg = svg.replace(/<svg/, `<svg class="fill-current"`);
      
      setSvgContent(svg);
      setError(false);
    } catch (err) {
      console.error(`[IconError] 找不到图标: "${name}"，请检查 public/icons/ 是否存在该 SVG 文件。`, err);
      setError(true);
    }
  }, [name]);

  useEffect(() => {
    loadSvg();
  }, [loadSvg]);

  // 错误状态：返回占位符
  if (error) {
    return (
      <span 
        style={{ width: size, height: size, display: 'inline-block' }} 
        className={cn("shrink-0", className)}
      />
    );
  }

  // 加载中状态
  if (!svgContent) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className="animate-pulse bg-muted/20 rounded-full shrink-0" 
      />
    );
  }

  // 渲染 SVG
  return (
    <span
      style={{ width: size, height: size, display: 'inline-flex' }}
      className={cn("shrink-0 fill-current", className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};