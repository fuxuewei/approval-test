"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { FileText, CheckSquare, Send, FileOutput, Settings2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainMenuItems = [
  {
    title: "待办",
    url: "/approval/pending",
    icon: FileText,
  },
  {
    title: "已办",
    url: "/approval/done",
    icon: CheckSquare,
  },
  {
    title: "抄送我",
    url: "/approval/cc",
    icon: Send,
  },
  {
    title: "已发起",
    url: "/approval/created",
    icon: FileOutput,
  },
];

const manageMenuItems = [
  {
    title: "审批模板",
    url: "/approval/templates",
    icon: Settings2,
  },
];

const allMenuItems = [...mainMenuItems, ...manageMenuItems];

export function getActiveMenuTitle(pathname: string): string {
  const activeItem = allMenuItems.find((item) => pathname === item.url);
  return activeItem?.title || "审批中心";
}

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="none"
      className={cn(
        "bg-background border-r border-border",
        "w-[200px] min-w-[200px]",
        className
      )}
      {...props}
    >
      {/* Logo / Title */}
      <SidebarHeader className="group-data-[state=collapsed]:px-0 mb-4 px-[18px] h-[48px] flex flex-row items-center justify-between group-data-[state=collapsed]:justify-center">
        <div className="group-data-[state=collapsed]:hidden leading-[32px] text-[16px] font-semibold text-foreground">审批中心</div>
        <SidebarTrigger />
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2">
        {/* 主要菜单 */}
        <SidebarMenu className="gap-1">
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                className={cn(
                  "h-10 px-3 rounded-[8px]",
                  "text-[14px] leading-[22px] text-muted-foreground",
                  "hover:bg-background hover:text-primary",
                  pathname === item.url && [
                    "bg-[var(--ant-primary-1)]",
                    "text-primary",
                    "font-medium",
                  ]
                )}
                asChild
                isActive={pathname === item.url}
              >
                <Link href={item.url}>
                  <item.icon className="size-4 mr-2" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* 管理分组 */}
        <div className="mt-6 mb-2 px-3 text-[14px] leading-[22px] text-muted-foreground/60">管理</div>
        <SidebarMenu className="gap-1">
          {manageMenuItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                className={cn(
                  "h-10 px-3 rounded-[8px]",
                  "text-[14px] leading-[22px] text-muted-foreground",
                  "hover:bg-background hover:text-primary",
                  pathname === item.url && [
                    "bg-[var(--ant-primary-1)]",
                    "text-primary",
                    "font-medium",
                  ]
                )}
                asChild
                isActive={pathname === item.url}
              >
                <Link href={item.url}>
                  <item.icon className="size-4 mr-2" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>{/* 可以在这里添加用户信息或其他底部内容 */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
