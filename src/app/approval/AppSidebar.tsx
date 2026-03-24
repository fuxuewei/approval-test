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
    url: "/approval/completed",
    icon: CheckSquare,
  },
  {
    title: "抄送我",
    url: "/approval/cc",
    icon: Send,
  },
  {
    title: "已发起",
    url: "/approval/initiated",
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
  const menuItems = allMenuItems
  const activeItem = menuItems.find((item) => pathname === item.url);
  return activeItem?.title || '审批中心'
}

export function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const menuItems = allMenuItems

  return (
    <Sidebar collapsible="icon" className={cn("bg-background", className)} {...props}>
      <SidebarHeader className="group-data-[state=collapsed]:px-0 mb-4 px-[18px] h-[48px] flex flex-row items-center justify-between group-data-[state=collapsed]:justify-center">
        <div className="group-data-[state=collapsed]:hidden leading-[32px] text-base font-semibold">审批中心</div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="px-1.5">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                className="px-4 h-10"
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon className="size-4" />
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
