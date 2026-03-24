"use client";

import { cn } from "@/lib/utils";
import { NavIcon, NavIconName } from "@/components/icons/NavIcons";
import { UserAvatar } from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  id: string;
  icon: NavIconName;
  label: string;
  active?: boolean;
  href?: string;
}

const navItems: NavItem[] = [
  { id: "home", icon: "home", label: "首页", href: "/" },
  { id: "assetLibrary", icon: "assetLibrary", label: "素材库", href: "/library" },
  { id: "assetLibrary2", icon: "assetLibrary2", label: "资源库", href: "/resources" },
  { id: "projectLibrary", icon: "projectLibrary", label: "项目库", href: "/projects" },
  { id: "taskWorkflow", icon: "taskWorkflow", label: "任务流", href: "/workflow" },
  { id: "approvalCenter", icon: "approvalCenter", label: "审批中心", active: true, href: "/approval" },
  { id: "museAI", icon: "museAI", label: "Muse AI", href: "/ai" },
  { id: "museCut", icon: "museCut", label: "Muse Cut", href: "/cut" },
  { id: "complianceCheck", icon: "complianceCheck", label: "合规检查", href: "/compliance" },
];

interface IconRailProps {
  userInfo?: {
    orgRealName?: string;
    orgNickName?: string;
    realName?: string;
    nickName?: string;
    avatarUrl?: string;
    phone?: string;
  };
}

export const IconRail = ({ userInfo }: IconRailProps) => {
  return (
    <div
      data-component="AppShell/IconRail"
      className={cn(
        "flex flex-col items-center",
        "w-[54px] h-full py-4 gap-6",
        "bg-basic-0"
      )}
    >
      {/* Logo */}
      <div
        data-component="AppShell/IconRail/Logo"
        className="flex items-center justify-center w-8 h-8 rounded-[9px] bg-primary-6"
      >
        <span className="text-white text-xs font-bold">M</span>
      </div>

      {/* Nav Items */}
      <div
        data-component="AppShell/IconRail/NavItems"
        className="flex flex-col items-center gap-3 flex-1"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            data-component={`AppShell/IconRail/NavItem/${item.id}`}
            className={cn(
              "flex items-center justify-center",
              "w-8 h-8 rounded-lg p-1",
              "transition-colors duration-200",
              item.active
                ? "bg-primary-1 text-primary-6"
                : "text-basic-5 hover:text-basic-8 hover:bg-basic-1"
            )}
            title={item.label}
          >
            <NavIcon name={item.icon} size={16} />
          </button>
        ))}
      </div>

      {/* Bottom Actions */}
      <div
        data-component="AppShell/IconRail/BottomActions"
        className="flex flex-col items-center gap-2"
      >
        <Separator
          data-component="AppShell/IconRail/Divider"
          className="w-4 bg-basic-3"
          orientation="horizontal"
        />

        {/* User Avatar */}
        <div className="pt-2">
          <UserAvatar userInfo={userInfo} size={36} />
        </div>
      </div>
    </div>
  );
};
