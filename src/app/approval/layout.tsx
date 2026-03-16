"use client";

import { AppSidebar } from "./AppSidebar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LayoutHeader } from "./LayoutHeader";

export default function ApprovalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-dvh">
      <AppSidebar />
      <SidebarInset className="bg-background">
        <LayoutHeader />
        <main className="flex-1 px-6 pb-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
