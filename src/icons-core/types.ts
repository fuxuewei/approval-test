import React from "react";

/**
 * 图标组件的基础属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   * @example 16 | "w-4 h-4" | "20px"
   */
  size?: number | string;
  /**
   * 额外的 CSS 类名
   */
  className?: string;
}

/**
 * 图标组件类型
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;
