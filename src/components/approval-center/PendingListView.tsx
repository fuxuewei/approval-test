"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ModuleSidebar } from "./ModuleSidebar";
import {
  Filter,
  LayoutGrid,
  List,
  MessageSquare,
  ChevronDown,
  Search,
  X,
  Check,
  Image as ImageIcon,
  FileText,
  Video,
  Music,
  File,
} from "lucide-react";

// ============== Types ==============

type ViewMode = "list" | "grid";
type AssetStatus = "pending" | "approved" | "rejected";

interface Asset {
  id: string;
  name: string;
  status: AssetStatus;
  format: string;
  dimensions: string;
  size: string;
  thumbnail?: string;
  submitterNote?: string;
}

interface PendingListViewProps {
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}

// ============== Mock Data ==============

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "summer_campaign_banner_v1.png",
    status: "pending",
    format: "PNG",
    dimensions: "1920 x 1080",
    size: "2.4 MB",
    submitterNote: "这里是提交审批者的留言，如果用户填写了的话，没填写则不显示这个板块~",
  },
  {
    id: "2",
    name: "product_showcase_hero.jpg",
    status: "approved",
    format: "JPG",
    dimensions: "2560 x 1440",
    size: "4.1 MB",
  },
  {
    id: "3",
    name: "brand_guidelines_2024.pdf",
    status: "rejected",
    format: "PDF",
    dimensions: "-",
    size: "15.2 MB",
    submitterNote: "请按照新的品牌规范调整配色方案",
  },
  {
    id: "4",
    name: "app_demo_video.mp4",
    status: "pending",
    format: "MP4",
    dimensions: "1920 x 1080",
    size: "128.5 MB",
  },
  {
    id: "5",
    name: "icon_set_assets.zip",
    status: "pending",
    format: "ZIP",
    dimensions: "-",
    size: "8.3 MB",
  },
];

// ============== Helper Components ==============

/**
 * IconRail - 左侧图标导航栏
 * Figma: ApprovalCenter/IconRail
 */
function IconRail() {
  const navItems = [
    { id: "home", icon: "Home", active: false },
    { id: "library", icon: "Library", active: false },
    { id: "folder", icon: "Folder", active: false },
    { id: "project", icon: "Project", active: false },
    { id: "task", icon: "Task", active: true },
    { id: "magic", icon: "Magic", active: false },
    { id: "video", icon: "Video", active: false },
    { id: "setting", icon: "Setting", active: false },
  ];

  return (
    <div
      data-component="ApprovalCenter/IconRail"
      className={cn(
        "flex flex-col items-center gap-6",
        "w-[54px] h-full",
        "py-4",
        "border-r border-[var(--ant-basic-3)]",
        "bg-[var(--ant-basic-0)]"
      )}
    >
      {/* Logo */}
      <div
        data-component="ApprovalCenter/IconRail/Logo"
        className="h-8 w-8 rounded-lg bg-[var(--ant-primary-6)]"
      />

      {/* NavItems */}
      <nav className="flex flex-1 flex-col items-center gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            data-component={`ApprovalCenter/IconRail/NavItem/${item.id}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              item.active
                ? "bg-[var(--ant-primary-1)] text-[var(--ant-primary-6)]"
                : "text-[var(--ant-basic-5)] hover:bg-[var(--ant-basic-1)] hover:text-[var(--ant-basic-6)]"
            )}
          >
            <NavIcon name={item.icon} />
          </button>
        ))}
      </nav>

      {/* BottomActions */}
      <div className="flex flex-col gap-2">
        <button
          data-component="ApprovalCenter/IconRail/NotificationButton"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ant-basic-3)] bg-[var(--ant-basic-0)] text-[var(--ant-basic-5)] hover:text-[var(--ant-basic-6)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2C8 2 6 2 6 4C6 6 4 7 4 9C4 11 6 13 8 13C10 13 12 11 12 9C12 7 10 6 10 4C10 2 8 2 8 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 13V14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          data-component="ApprovalCenter/IconRail/HelpButton"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ant-basic-3)] bg-[var(--ant-basic-0)] text-[var(--ant-basic-5)] hover:text-[var(--ant-basic-6)]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 11V10.5C8 9.5 8.5 9 9 8.5C9.5 8 10 7.5 10 6.5C10 5.5 9 4.5 8 4.5C7 4.5 6 5 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* UserAvatar */}
      <div
        data-component="ApprovalCenter/IconRail/UserAvatar"
        className="h-9 w-9 rounded-full bg-[var(--ant-primary-6)] ring-1 ring-black/10"
      />
    </div>
  );
}

/**
 * NavIcon - 导航图标映射
 */
function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Home: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 15V10H10V15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Library: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 2H14V14H4V2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 4H4V12H2C1.44772 12 1 11.5523 1 11V5C1 4.44772 1.44772 4 2 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Folder: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M14 13V4C14 3.44772 13.5523 3 13 3H8L6 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Project: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M14 4H2V14H14V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 2H5V4H11V2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Task: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4.5C2 3.11929 3.11929 2 4.5 2H11.5C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14H4.5C3.11929 14 2 12.8807 2 11.5V4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5 8L7 10L11 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Magic: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2L9.5 5.5L13 6L10.5 8.5L11 12L8 10.5L5 12L5.5 8.5L3 6L6.5 5.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Video: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 6L10 8L6 10V6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    Setting: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M14 8C14 8 13 6 12 6M14 8C14 8 13 10 12 10M2 8C2 8 3 6 4 6M2 8C2 8 3 10 4 10M8 2C8 2 6 3 6 4M8 2C8 2 10 3 10 4M8 14C8 14 6 13 6 12M8 14C8 14 10 13 10 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return <>{icons[name] || null}</>;
}

/**
 * StatusTag - 状态标签组件
 * Figma: ApprovalCenter/StatusTag
 * Tag 圆角必须 rounded 4px
 */
function StatusTag({ status }: { status: AssetStatus }) {
  const statusConfig = {
    pending: {
      label: "待标记",
      bg: "bg-[var(--sunset-orange-1)]",
      border: "border-[var(--sunset-orange-3)]",
      text: "text-[var(--ant-warning-6)]",
    },
    approved: {
      label: "已通过",
      bg: "bg-[var(--ant-success-1)]",
      border: "border-[var(--ant-success-6)]",
      text: "text-[var(--ant-success-6)]",
    },
    rejected: {
      label: "已拒绝",
      bg: "bg-[var(--ant-danger-1)]",
      border: "border-[var(--ant-danger-6)]",
      text: "text-[var(--ant-danger-6)]",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      data-component={`ApprovalCenter/StatusTag/${status}`}
      variant="outline"
      className={cn(
        "px-1.5 py-0.5 text-xs font-medium",
        "rounded-[4px]",
        config.bg,
        config.border,
        config.text,
        "border"
      )}
    >
      {config.label}
    </Badge>
  );
}

/**
 * FormatIcon - 文件格式图标
 */
function FormatIcon({ format }: { format: string }) {
  const formatLower = format.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(formatLower)) {
    return <ImageIcon size={16} className="text-[var(--ant-basic-5)]" />;
  }
  if (["mp4", "mov", "avi", "webm"].includes(formatLower)) {
    return <Video size={16} className="text-[var(--ant-basic-5)]" />;
  }
  if (["mp3", "wav", "aac"].includes(formatLower)) {
    return <Music size={16} className="text-[var(--ant-basic-5)]" />;
  }
  if (["pdf", "doc", "docx", "txt"].includes(formatLower)) {
    return <FileText size={16} className="text-[var(--ant-basic-5)]" />;
  }
  return <File size={16} className="text-[var(--ant-basic-5)]" />;
}

/**
 * SubmitterNote - 提交者留言区块
 * Figma: ApprovalCenter/SubmitterNote
 */
function SubmitterNote({ note }: { note: string }) {
  return (
    <div
      data-component="ApprovalCenter/SubmitterNote"
      className={cn(
        "flex items-center gap-2.5",
        "px-3 py-2.5",
        "rounded-[8px]",
        "bg-[var(--ant-basic-1)]"
      )}
    >
      <div
        data-component="ApprovalCenter/SubmitterNote/Icon"
        className={cn(
          "flex items-center justify-center",
          "w-6 h-6 rounded-full",
          "bg-[var(--ant-primary-1)]"
        )}
      >
        <MessageSquare size={14} className="text-[var(--ant-primary-6)]" />
      </div>
      <span
        data-component="ApprovalCenter/SubmitterNote/Text"
        className="text-sm text-[var(--ant-basic-10)]"
      >
        {note}
      </span>
    </div>
  );
}

/**
 * AssetRow - 列表视图中的单行素材
 * Figma: ApprovalCenter/AssetRow
 */
interface AssetRowProps {
  asset: Asset;
  selected: boolean;
  onSelect: (id: string) => void;
}

function AssetRow({ asset, selected, onSelect }: AssetRowProps) {
  return (
    <div
      data-component="ApprovalCenter/AssetRow"
      className={cn(
        "flex flex-col gap-3",
        "p-4",
        "rounded-[8px]",
        "bg-[var(--ant-basic-0)]",
        "border",
        selected
          ? "border-[var(--ant-primary-6)]"
          : "border-[var(--ant-basic-3)]"
      )}
    >
      {/* Main Row */}
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <Checkbox
          data-component="ApprovalCenter/AssetRow/Checkbox"
          checked={selected}
          onCheckedChange={() => onSelect(asset.id)}
        />

        {/* Thumbnail + Name */}
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <div
            data-component="ApprovalCenter/AssetRow/Thumbnail"
            className={cn(
              "flex items-center justify-center",
              "w-10 h-10 rounded-[6px]",
              "bg-[var(--ant-basic-1)]"
            )}
          >
            <FormatIcon format={asset.format} />
          </div>
          <span
            data-component="ApprovalCenter/AssetRow/Name"
            className="text-sm font-medium text-[var(--ant-basic-8)] truncate"
          >
            {asset.name}
          </span>
        </div>

        {/* Status */}
        <div className="w-[80px]">
          <StatusTag status={asset.status} />
        </div>

        {/* Format */}
        <div
          data-component="ApprovalCenter/AssetRow/Format"
          className="w-[60px] text-sm text-[var(--ant-basic-5)]"
        >
          {asset.format}
        </div>

        {/* Dimensions */}
        <div
          data-component="ApprovalCenter/AssetRow/Dimensions"
          className="w-[100px] text-sm text-[var(--ant-basic-5)]"
        >
          {asset.dimensions}
        </div>

        {/* Size */}
        <div
          data-component="ApprovalCenter/AssetRow/Size"
          className="w-[80px] text-sm text-[var(--ant-basic-5)]"
        >
          {asset.size}
        </div>
      </div>

      {/* Submitter Note (if exists) */}
      {asset.submitterNote && <SubmitterNote note={asset.submitterNote} />}
    </div>
  );
}

/**
 * ListView - 列表视图
 * Figma: ApprovalCenter/Page/Pending/ListView
 */
function ListView({
  assets,
  selectedIds,
  onSelect,
}: {
  assets: Asset[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      data-component="ApprovalCenter/ListView"
      className="flex flex-col gap-2"
    >
      {/* Table Header */}
      <div
        data-component="ApprovalCenter/ListView/Header"
        className={cn(
          "flex items-center gap-4",
          "px-4 py-2",
          "text-sm font-medium text-[var(--ant-basic-5)]"
        )}
      >
        <div className="w-4" />
        <div className="flex-1">名称</div>
        <div className="w-[80px]">状态</div>
        <div className="w-[60px]">格式</div>
        <div className="w-[100px]">尺寸</div>
        <div className="w-[80px]">大小</div>
      </div>

      {/* Asset Rows */}
      {assets.map((asset) => (
        <AssetRow
          key={asset.id}
          asset={asset}
          selected={selectedIds.has(asset.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

/**
 * GridView - 网格视图
 * Figma: ApprovalCenter/Page/Pending/GridView
 */
function GridView({
  assets,
  selectedIds,
  onSelect,
}: {
  assets: Asset[];
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      data-component="ApprovalCenter/GridView"
      className="grid grid-cols-4 gap-4"
    >
      {assets.map((asset) => (
        <div
          key={asset.id}
          data-component="ApprovalCenter/GridView/Card"
          className={cn(
            "flex flex-col gap-3",
            "p-4",
            "rounded-[8px]",
            "bg-[var(--ant-basic-0)]",
            "border",
            selectedIds.has(asset.id)
              ? "border-[var(--ant-primary-6)]"
              : "border-[var(--ant-basic-3)]"
          )}
        >
          {/* Checkbox + Actions */}
          <div className="flex items-center justify-between">
            <Checkbox
              data-component="ApprovalCenter/GridView/Card/Checkbox"
              checked={selectedIds.has(asset.id)}
              onCheckedChange={() => onSelect(asset.id)}
            />
            <StatusTag status={asset.status} />
          </div>

          {/* Thumbnail */}
          <div
            data-component="ApprovalCenter/GridView/Card/Thumbnail"
            className={cn(
              "flex items-center justify-center",
              "aspect-[4/3] rounded-[6px]",
              "bg-[var(--ant-basic-1)]"
            )}
          >
            <FormatIcon format={asset.format} />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-1">
            <span
              data-component="ApprovalCenter/GridView/Card/Name"
              className="text-sm font-medium text-[var(--ant-basic-8)] truncate"
            >
              {asset.name}
            </span>
            <div className="flex items-center gap-2 text-xs text-[var(--ant-basic-5)]">
              <span>{asset.format}</span>
              <span>·</span>
              <span>{asset.size}</span>
            </div>
          </div>

          {/* Note */}
          {asset.submitterNote && (
            <div className="text-xs text-[var(--ant-basic-5)] line-clamp-2">
              {asset.submitterNote}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * EmptyState - 空状态
 * Figma: ApprovalCenter/Page/Pending/EmptyState
 */
function EmptyState() {
  return (
    <div
      data-component="ApprovalCenter/EmptyState"
      className={cn(
        "flex flex-col items-center justify-center",
        "flex-1",
        "py-20"
      )}
    >
      <div
        data-component="ApprovalCenter/EmptyState/Icon"
        className={cn(
          "flex items-center justify-center",
          "w-16 h-16 rounded-full",
          "bg-[var(--ant-basic-1)]",
          "mb-4"
        )}
      >
        <Search size={24} className="text-[var(--ant-basic-5)]" />
      </div>
      <p
        data-component="ApprovalCenter/EmptyState/Title"
        className="text-base font-medium text-[var(--ant-basic-8)] mb-1"
      >
        暂无待办审批
      </p>
      <p
        data-component="ApprovalCenter/EmptyState/Description"
        className="text-sm text-[var(--ant-basic-5)]"
      >
        当前没有需要您审批的素材
      </p>
    </div>
  );
}

// ============== Main Component ==============

/**
 * PendingListView
 * Figma: ApprovalCenter/Page/Pending/ListView (主状态)
 * 审批中心 - 待办列表页
 *
 * 支持 viewMode: 'list' | 'grid'
 * 默认显示列表视图
 */
export function PendingListView({
  viewMode = "list",
  onViewModeChange,
}: PendingListViewProps) {
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(viewMode);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Sync with prop
  const effectiveViewMode = onViewModeChange ? viewMode : currentViewMode;

  const handleViewModeChange = (mode: ViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      setCurrentViewMode(mode);
    }
  };

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === mockAssets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(mockAssets.map((a) => a.id)));
    }
  };

  const handleRejectAll = () => {
    // TODO: Implement batch reject
    console.log("Reject all:", Array.from(selectedIds));
  };

  const handleApproveAll = () => {
    // TODO: Implement batch approve
    console.log("Approve all:", Array.from(selectedIds));
  };

  const hasSelection = selectedIds.size > 0;

  return (
    <div
      data-component="ApprovalCenter/Page/Pending/ListView"
      className={cn(
        "flex h-screen w-full",
        "bg-[var(--ant-basic-1)]"
      )}
    >
      {/* Left Panel: IconRail + ModuleSidebar */}
      <div
        data-component="ApprovalCenter/LeftPanel"
        className="flex h-full"
      >
        <IconRail />
        <ModuleSidebar />
      </div>

      {/* Main Content */}
      <div
        data-component="ApprovalCenter/MainContent"
        className="flex flex-1 flex-col min-w-0"
      >
        {/* Header */}
        <header
          data-component="ApprovalCenter/Header"
          className={cn(
            "flex items-center justify-between",
            "px-5 py-4",
            "border-b border-[var(--ant-basic-3)]",
            "bg-[var(--ant-basic-0)]"
          )}
        >
          {/* Breadcrumb */}
          <div
            data-component="ApprovalCenter/Header/Breadcrumb"
            className="flex items-center gap-2"
          >
            <h1
              data-component="ApprovalCenter/Header/Breadcrumb/Title"
              className="text-xl font-semibold text-[var(--ant-basic-10)]"
            >
              待办列表
            </h1>
          </div>

          {/* Actions */}
          <div
            data-component="ApprovalCenter/Header/Actions"
            className="flex items-center gap-3"
          >
            {/* Submit Result Button */}
            <Button
              data-component="ApprovalCenter/Header/Actions/SubmitResultButton"
              variant="default"
              size="sm"
              className={cn(
                "h-9 px-4",
                "bg-[var(--ant-primary-6)] text-white",
                "hover:bg-[var(--ant-primary-5)]"
              )}
            >
              提交审批结果
            </Button>

            {/* User Avatar */}
            <div
              data-component="ApprovalCenter/Header/Actions/UserAvatar"
              className="h-9 w-9 rounded-full bg-[var(--ant-primary-6)]"
            />
          </div>
        </header>

        {/* Content Area */}
        <div
          data-component="ApprovalCenter/ContentArea"
          className={cn(
            "flex flex-col flex-1",
            "p-5",
            "overflow-auto"
          )}
        >
          {/* Toolbar */}
          <div
            data-component="ApprovalCenter/Toolbar"
            className={cn(
              "flex items-center justify-between",
              "mb-4"
            )}
          >
            {/* Left: Batch Actions */}
            <div
              data-component="ApprovalCenter/Toolbar/BatchActions"
              className="flex items-center gap-3"
            >
              <Button
                data-component="ApprovalCenter/Toolbar/BatchActions/RejectAllButton"
                variant="danger"
                size="sm"
                disabled={!hasSelection}
                onClick={handleRejectAll}
                className={cn(
                  "h-8 px-3",
                  "text-[var(--ant-danger-6)]",
                  "border-[var(--ant-danger-6)]",
                  "hover:bg-[var(--ant-danger-1)]",
                  "disabled:opacity-50"
                )}
              >
                <X size={14} className="mr-1" />
                全部标记为拒绝
              </Button>
              <Button
                data-component="ApprovalCenter/Toolbar/BatchActions/ApproveAllButton"
                variant="default"
                size="sm"
                disabled={!hasSelection}
                onClick={handleApproveAll}
                className={cn(
                  "h-8 px-3",
                  "bg-[var(--ant-primary-6)] text-white",
                  "hover:bg-[var(--ant-primary-5)]",
                  "disabled:opacity-50"
                )}
              >
                <Check size={14} className="mr-1" />
                全部标记为通过
              </Button>

              {hasSelection && (
                <span
                  data-component="ApprovalCenter/Toolbar/BatchActions/SelectionCount"
                  className="text-sm text-[var(--ant-basic-5)]"
                >
                  已选择 {selectedIds.size} 项
                </span>
              )}
            </div>

            {/* Right: View Controls */}
            <div
              data-component="ApprovalCenter/Toolbar/ViewControls"
              className="flex items-center gap-2"
            >
              {/* Filter Button */}
              <Button
                data-component="ApprovalCenter/Toolbar/ViewControls/FilterButton"
                variant="outline"
                size="sm"
                className={cn(
                  "h-8 gap-1",
                  "border-[var(--ant-basic-3)]",
                  "text-[var(--ant-basic-6)]",
                  "hover:border-[var(--ant-primary-5)] hover:text-[var(--ant-primary-6)]"
                )}
              >
                <Filter size={14} />
                筛选
                <ChevronDown size={12} />
              </Button>

              {/* View Mode Toggle */}
              <div
                data-component="ApprovalCenter/Toolbar/ViewControls/ViewModeToggle"
                className={cn(
                  "flex items-center",
                  "rounded-[6px]",
                  "border border-[var(--ant-basic-3)]",
                  "bg-[var(--ant-basic-0)]"
                )}
              >
                <button
                  data-component="ApprovalCenter/Toolbar/ViewControls/GridButton"
                  onClick={() => handleViewModeChange("grid")}
                  className={cn(
                    "flex items-center justify-center",
                    "w-8 h-8",
                    "rounded-l-[6px]",
                    "transition-colors",
                    effectiveViewMode === "grid"
                      ? "bg-[var(--ant-primary-1)] text-[var(--ant-primary-6)]"
                      : "text-[var(--ant-basic-5)] hover:bg-[var(--ant-basic-1)]"
                  )}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  data-component="ApprovalCenter/Toolbar/ViewControls/ListButton"
                  onClick={() => handleViewModeChange("list")}
                  className={cn(
                    "flex items-center justify-center",
                    "w-8 h-8",
                    "rounded-r-[6px]",
                    "transition-colors",
                    effectiveViewMode === "list"
                      ? "bg-[var(--ant-primary-1)] text-[var(--ant-primary-6)]"
                      : "text-[var(--ant-basic-5)] hover:bg-[var(--ant-basic-1)]"
                  )}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Assets Content */}
          {mockAssets.length === 0 ? (
            <EmptyState />
          ) : effectiveViewMode === "list" ? (
            <ListView
              assets={mockAssets}
              selectedIds={selectedIds}
              onSelect={handleSelect}
            />
          ) : (
            <GridView
              assets={mockAssets}
              selectedIds={selectedIds}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingListView;
