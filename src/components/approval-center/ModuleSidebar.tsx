"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Clock, RotateCcw, CheckSquare } from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  href?: string;
}

const navItems: NavItem[] = [
  {
    id: "pending",
    icon: <Clock size={18} />,
    label: "待我审批",
    count: 5,
    active: true,
    href: "/approval/pending",
  },
  {
    id: "submitted",
    icon: <CheckCircle size={18} />,
    label: "我提交的",
    count: 3,
    href: "/approval/submitted",
  },
  {
    id: "processed",
    icon: <CheckSquare size={18} />,
    label: "我已审批",
    href: "/approval/processed",
  },
  {
    id: "cc",
    icon: <RotateCcw size={18} />,
    label: "抄送我的",
    count: 2,
    href: "/approval/cc",
  },
];

interface ModuleSidebarProps {
  title?: string;
}

export const ModuleSidebar = ({ title = "审批中心" }: ModuleSidebarProps) => {
  return (
    <div
      data-component="ApprovalCenter/ModuleSidebar"
      className={cn(
        "flex flex-col gap-6",
        "w-[200px] min-w-[200px] h-full",
        "py-4"
      )}
    >
      {/* Header */}
      <div
        data-component="ApprovalCenter/ModuleSidebar/Header"
        className="flex items-center gap-2.5 px-3 pt-2"
      >
        <h2 className="text-lg font-semibold text-basic-8">
          {title}
        </h2>
      </div>

      {/* Nav Content */}
      <div
        data-component="ApprovalCenter/ModuleSidebar/NavContent"
        className="flex flex-col gap-1 px-2"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-2 rounded-[6px]",
              "text-sm transition-colors duration-200",
              item.active
                ? "bg-primary-1 text-primary-6 font-medium"
                : "text-basic-6 hover:bg-basic-1 hover:text-basic-8"
            )}
          >
            <div className="flex items-center gap-2">
              <span className={item.active ? "text-primary-6" : "text-basic-5"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && item.count > 0 && (
              <span className={cn(
                "px-1.5 py-0.5 text-xs rounded-full",
                item.active
                  ? "bg-primary-6 text-white"
                  : "bg-basic-3 text-basic-5"
              )}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
