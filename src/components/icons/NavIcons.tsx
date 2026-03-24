'use client';

import { Icon } from './index';

export type NavIconName =
  | 'home'
  | 'assetLibrary'
  | 'assetLibrary2'
  | 'projectLibrary'
  | 'taskWorkflow'
  | 'approvalCenter'
  | 'museAI'
  | 'museCut'
  | 'complianceCheck';

const NAV_ICON_MAP: Record<NavIconName, string> = {
  home: 'Grid',
  assetLibrary: 'Files',
  assetLibrary2: 'FolderThumbnail',
  projectLibrary: 'project',
  taskWorkflow: 'Tasks',
  approvalCenter: 'SquareCheckBig',
  museAI: 'ai',
  museCut: 'Thunderbolt',
  complianceCheck: 'FolderCheck',
};

interface NavIconProps {
  name: NavIconName;
  size?: number | string;
  className?: string;
}

export function NavIcon({ name, size = 20, className }: NavIconProps) {
  return (
    <Icon
      name={NAV_ICON_MAP[name] || name}
      size={size}
      className={className}
    />
  );
}
