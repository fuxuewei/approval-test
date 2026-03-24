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
      <SidebarInset className="h-full relative overflow-hidden flex flex-col">
        <main className="pt-[22px] pb-5 px-5 flex flex-1 flex-col gap-4 bg-basic-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
