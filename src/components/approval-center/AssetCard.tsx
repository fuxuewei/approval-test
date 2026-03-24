"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StatusTag, Tag } from "@/components/ui/tag";
import { AssetThumbnail } from "@/components/AssetThumbnail";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/icons";
import { useState } from "react";
import { Asset, AssetStatus } from "@/app/approval/types";

// Asset Card Component for Grid View
interface AssetCardProps {
    asset: Asset;
    isSelected: boolean;
    onToggle: () => void;
}

export const AssetCard = ({ asset, isSelected, onToggle }: AssetCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Status badge style - aligned with MuseDAM design system
    const getStatusStyle = (status: AssetStatus) => {
        switch (status) {
            case AssetStatus.APPROVED:
                return "bg-success-1 text-success-6 border-success-6";
            case AssetStatus.REJECTED:
                return "bg-danger-1 text-danger-6 border-danger-6";
            case AssetStatus.PENDING:
            default:
                return "bg-page text-text-secondary border-border-strong";
        }
    };

    return (
        <div
            data-component="ApprovalCenter/DetailPanel/AssetSection/AssetCard"
            className={cn(
                "group relative flex flex-col gap-2 pb-2 rounded-[8px] border transition-all duration-200 cursor-pointer",
                isSelected
                    ? "border-primary-6 bg-primary-1"
                    : "border-border bg-surface hover:border-border-strong"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail Container - 3:2 aspect ratio */}
            <div className="relative aspect-[3/2] rounded-[6px] bg-page overflow-hidden">
                {/* Thumbnail */}
                <AssetThumbnail
                    asset={{
                        thumbnailUrl: asset.thumbnail,
                        extension: asset.extension || asset.type.toLowerCase(),
                    }}
                    maxWidth={400}
                    maxHeight={267}
                    className="w-full h-full"
                />

                {/* Checkbox Overlay */}
                <div
                    className={cn(
                        "absolute top-2 left-2 z-10 transition-opacity duration-200",
                        isSelected || isHovered ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={onToggle}
                        className="bg-white/90 border-border-strong data-[state=checked]:bg-primary-6 data-[state=checked]:border-primary-6"
                    />
                </div>

                {/* Hover Actions Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/40 transition-opacity duration-200",
                        isHovered && !isSelected ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Button
                        size="sm"
                        className="h-7 px-2 text-xs bg-success-6 hover:bg-success-7 text-white rounded-[6px] border-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Approve action
                        }}
                    >
                        <Icon name="Check" size={14} className="mr-1" />
                        通过
                    </Button>
                    <Button
                        size="sm"
                        className="h-7 px-2 text-xs bg-danger-6 hover:bg-danger-7 text-white rounded-[6px] border-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Reject action
                        }}
                    >
                        <Icon name="Close" size={14} className="mr-1" />
                        拒绝
                    </Button>
                </div>
            </div>

            {/* File Info */}
            <div className="flex flex-col gap-1 px-2">
                <span
                    className="text-sm text-text-primary truncate leading-[22px]"
                    title={asset.name}
                >
                    {asset.name}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary leading-[18px]">
                    <span>{asset.type}</span>
                    <span className="w-[2px] h-[2px] rounded-full bg-text-secondary" />
                    <span>{asset.fileSize}</span>
                    <span className="w-[2px] h-[2px] rounded-full bg-text-secondary" />
                    <span>{asset.size}</span>
                </div>
                {/* Status Badge - below file info */}
                <StatusTag>
                    {asset.status}
                </StatusTag>
            </div>
        </div>
    );
};
