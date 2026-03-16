import { LucideIcon } from "lucide-react";
import { IconProps, SvgIcon } from "./icon";

// 重新导出SvgIcon和IconProps
export { SvgIcon, type IconProps } from "./icon";

// 自动定义Icon文件夹中的所有图标
const iconFiles = [
  "Dashboard.svg",
  "folders.svg",
  "Monitor.svg",
  "Setting.svg",
  "TagAI.svg",
  "Tags.svg",
  "Team.svg",
] as const;

// 手动定义图标名称类型，确保类型安全
export type IconName = "dashboard" | "folders" | "monitor" | "setting" | "tag-ai" | "tags" | "team";

// 图标路径映射 - 自动生成
export const iconPaths = iconFiles.reduce(
  (acc, file) => {
    const name = file.replace(".svg", "").toLowerCase();
    const iconName = name === "tagai" ? "tag-ai" : name;
    // 运行时使用到的 SVG 路径，指向 `@/src/components/icons`
    acc[iconName as IconName] = `/src/components/icons/${file}`;
    return acc;
  },
  {} as Record<IconName, string>,
);

// 图标viewBox映射 - 可以根据需要添加特定图标的viewBox
export const iconViewBoxes: Partial<Record<IconName, string>> = {
  dashboard: "0 0 37 36",
  folders: "0 0 37 36",
  monitor: "0 0 37 36",
  setting: "0 0 37 36",
  "tag-ai": "0 0 37 36",
  tags: "0 0 37 36",
  team: "0 0 37 36",
};

export interface NamedIconProps extends IconProps {
  name: IconName;
}

/**
 * 通过名称使用图标的组件
 */
export const Icon = ({ name, ...props }: NamedIconProps) => {
  const src = iconPaths[name as keyof typeof iconPaths];
  const viewBox = iconViewBoxes[name as keyof typeof iconViewBoxes];

  if (!src) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <SvgIcon src={src} viewBox={viewBox} {...props} />;
};

// 图标名称常量
const ICON_NAMES = {
  DASHBOARD: "dashboard" as const,
  FOLDERS: "folders" as const,
  MONITOR: "monitor" as const,
  SETTING: "setting" as const,
  TAG_AI: "tag-ai" as const,
  TAGS: "tags" as const,
  TEAM: "team" as const,
} as const;

// 导出所有图标组件，直接使用SvgIcon组件
export function DashboardIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Dashboard.svg"  {...props} />;
}

export function FoldersIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/folders.svg"  {...props} />;
}

export function MonitorIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Monitor.svg"  {...props} />;
}

export function DoubleLeftIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/DoubleLeft.svg"  {...props} />;
}

export function SettingIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Setting.svg"  {...props} />;
}

export function TagOutlinedIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/TagOutlined.svg"  {...props} />;
}

export function TagSearchIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/TagSearch.svg"  {...props} />;
}


export function EditIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Edit.svg"  {...props} />;
}
export function FileImageIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/FileImage.svg"  {...props} />;
}

export function DepartmentIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Department.svg"  {...props} />;
}

export function RetryIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Retry.svg"  {...props} />;
}


export function VimIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Vim.svg"  {...props} />;
}

export function TagAIIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/TagAI.svg"  {...props} />;
}

export function TagsIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Tags.svg"  {...props} />;
}

export function TeamIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/Team.svg"  {...props} />;
}

export function ClockCircleIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/ClockCircle.svg"  {...props} />;
}

export function DefaultAvatarIcon(props: IconProps) {
  return <SvgIcon src="/src/components/icons/DefaultAvatar.svg"  {...props} />;
}
/**
 * 统一的图标组件，支持自定义SVG和Lucide图标
 */
export interface UnifiedIconProps extends IconProps {
  /**
   * 使用Lucide图标
   */
  lucide?: LucideIcon;
  /**
   * 使用自定义SVG文件
   */
  src?: string;
  /**
   * 使用预定义的图标名称
   */
  name?: IconName;
}

export const UnifiedIcon = ({ lucide: LucideComponent, src, name, ...props }: UnifiedIconProps) => {
  // 优先使用Lucide图标
  if (LucideComponent) {
    return <LucideComponent {...props} />;
  }

  // 使用自定义SVG文件
  if (src) {
    return <SvgIcon src={src} {...props} />;
  }

  // 使用预定义图标
  if (name) {
    return <Icon name={name} {...props} />;
  }

  console.warn("UnifiedIcon: 必须提供 lucide、src 或 name 属性之一");
  return null;
};
