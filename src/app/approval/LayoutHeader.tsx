"use client";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function LayoutHeader() {
    return (
        <header
            className={cn(
                "sticky top-0 z-10",
                "flex items-center justify-between",
                "bg-basic-1"
            )}
        >
            {/* Search */}
            <div className="relative w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-basic-5" />
                <Input
                    type="text"
                    placeholder="搜索名称"
                    className={cn(
                        "pl-9 h-9",
                        "bg-card",
                        "border-border",
                        "text-[14px] leading-[22px]",
                        "rounded-[6px]"
                    )}
                />
            </div>

            {/* User Avatar */}
            <UserAvatar userInfo={{
                orgRealName: 'xxx'
            }} />
        </header>
    );
}
