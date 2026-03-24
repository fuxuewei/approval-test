"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/UserAvatar";
import { AssetThumbnail } from "@/components/AssetThumbnail";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Filter,
  List,
  Image as ImageIcon,
} from "lucide-react";
import { Icon } from "@/components/icons";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import * as Slider from "@radix-ui/react-slider";
import { Asset, AssetStatus, type TaskType } from "@/app/approval/types";
import { AssetCard } from "./AssetCard";
import { Tag } from "../ui";
import { statusVariantMap } from "./TaskListPanel";

type ViewMode = "grid" | "list";
type BatchActionType = "approve" | "reject" | null;

interface DetailPanelProps {
  taskId?: string;
  pageType?: TaskType;
  showSubmitButton?: boolean;
}

// Mock asset data
const initialAssetData: Asset[] = [
  { id: 1, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 2, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 3, name: "文件名称", status: AssetStatus.APPROVED, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 4, name: "文件名称", status: AssetStatus.REJECTED, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 5, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 6, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 7, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
  { id: 8, name: "文件名称", status: AssetStatus.PENDING, type: "PNG", size: "928 × 1232", fileSize: "120 KB", thumbnail: "/placeholder.jpg", extension: "png" },
];

// Mock approval records
const recordData = [
  {
    id: 1,
    action: "提交",
    operator: { name: "姓名(昵称)", avatar: "" },
    status: "已提交",
    result: "—",
    comment: "",
    time: "1个月前\n3月12日 21:22"
  },
  {
    id: 2,
    action: "审批",
    operator: { name: "姓名(昵称)", avatar: "" },
    status: "已通过",
    result: "—",
    comment: "",
    time: "1个月前\n3月12日 21:22"
  },
  {
    id: 3,
    action: "审批",
    operator: { name: "姓名(昵称)", avatar: "" },
    status: "已通过",
    result: "—",
    comment: "此部分需要计入Xaptur审查程序\n的部分，参数2088，此部分\n分需要计入Xaptur审查程序的\nBD版本，参数3088。",
    time: "1个月前\n3月12日 21:22"
  },
  {
    id: 4,
    action: "结束",
    operator: { name: "系统", avatar: "" },
    status: "已自动入库",
    result: "—",
    comment: "文件夹名称",
    time: "1个月前\n3月12日 21:22"
  },
  {
    id: 5,
    action: "结束",
    operator: { name: "系统", avatar: "" },
    status: "自动抄送",
    result: "—",
    comment: "抄送4人\n文件夹名称",
    time: "1个月前\n3月12日 21:22"
  },
];

export const DetailPanel = ({ taskId, pageType = "pending", showSubmitButton = true }: DetailPanelProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("assets");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [gridColumns, setGridColumns] = useState(4);
  const [selectedAssets, setSelectedAssets] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const [batchActionDialogOpen, setBatchActionDialogOpen] = useState(false);
  const [batchActionType, setBatchActionType] = useState<BatchActionType>(null);
  const [assetData, setAssetData] = useState<Asset[]>(initialAssetData);
  const [submitResultDialogOpen, setSubmitResultDialogOpen] = useState(false);
  const [approvalComment, setApprovalComment] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const assetsRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Pagination calculations
  const totalItems = assetData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  // Handle page input submit
  const handlePageInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = parseInt((e.target as HTMLInputElement).value, 10);
      if (!isNaN(value) && value >= 1 && value <= totalPages) {
        handlePageChange(value);
      }
    }
  };

  // Toggle asset selection
  const toggleAssetSelection = (id: number) => {
    setSelectedAssets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Select all assets
  const selectAllAssets = () => {
    setSelectedAssets(new Set(assetData.map(a => a.id)));
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedAssets(new Set());
  };

  // Handle batch action dialog open
  const openBatchActionDialog = (type: BatchActionType) => {
    setBatchActionType(type);
    setBatchActionDialogOpen(true);
  };

  // Handle batch action confirm
  const handleBatchActionConfirm = () => {
    if (batchActionType === "approve") {
      // 将全部素材标记为通过
      setAssetData(prev => prev.map(asset =>
        asset.status === AssetStatus.PENDING
          ? { ...asset, status: AssetStatus.APPROVED }
          : asset
      ));
    } else if (batchActionType === "reject") {
      // 将全部素材标记为拒绝
      setAssetData(prev => prev.map(asset =>
        asset.status === AssetStatus.PENDING
          ? { ...asset, status: AssetStatus.REJECTED }
          : asset
      ));
    }
    setBatchActionDialogOpen(false);
    setBatchActionType(null);
  };

  // Handle submit result dialog
  const openSubmitResultDialog = () => {
    setApprovalComment("");
    setSubmitResultDialogOpen(true);
  };

  // Handle submit approval result
  const handleSubmitApprovalResult = () => {
    // TODO: 调用API提交审批结果
    console.log("提交审批结果:", { comment: approvalComment });
    setSubmitResultDialogOpen(false);
    setApprovalComment("");
  };

  // 监听滚动，根据当前滚动位置切换 Tab 高亮
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const container = contentRef.current;
      const scrollTop = container.scrollTop;
      const containerTop = container.getBoundingClientRect().top;

      // 获取各个 section 相对于容器的位置
      const assetsTop = assetsRef.current ? assetsRef.current.getBoundingClientRect().top - containerTop + scrollTop : Infinity;
      const recordsTop = recordsRef.current ? recordsRef.current.getBoundingClientRect().top - containerTop + scrollTop : Infinity;
      const commentsTop = commentsRef.current ? commentsRef.current.getBoundingClientRect().top - containerTop + scrollTop : Infinity;

      // 根据滚动位置判断当前活跃的 Tab
      const offset = 50; // 偏移量，提前一点切换
      if (scrollTop + offset >= commentsTop) {
        setActiveTab("comments");
      } else if (scrollTop + offset >= recordsTop) {
        setActiveTab("records");
      } else {
        setActiveTab("assets");
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // 点击 Tab 滚动到对应 section
  const scrollToSection = (section: string) => {
    let targetRef;
    switch (section) {
      case "assets":
        targetRef = assetsRef;
        break;
      case "records":
        targetRef = recordsRef;
        break;
      case "comments":
        targetRef = commentsRef;
        break;
    }

    if (targetRef?.current && contentRef.current) {
      const container = contentRef.current;
      const target = targetRef.current;
      container.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
      });
    }
  };

  if (!taskId) {
    return (
      <div
        data-component="ApprovalCenter/DetailPanel"
        className={cn(
          "flex flex-col items-center justify-center",
          "flex-1 min-h-[400px]",
          "bg-surface rounded-[8px] border border-border"
        )}
      >
        <div className="flex flex-col items-center gap-4 text-text-secondary">
          <Icon name="folder-open" size={48} />
          <p className="text-sm">请选择一个审批任务查看详情</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-component="ApprovalCenter/DetailPanel"
      className={cn(
        "flex flex-col flex-1 h-full min-h-0",
        "bg-surface rounded-[8px] border border-border",
        "min-w-0 overflow-hidden"
      )}
    >
      {/* Header - 48px height, only TaskIdInput + SubmitResultButton */}
      <div
        data-component="ApprovalCenter/DetailPanel/Header"
        className={cn(
          "flex items-center justify-between gap-3",
          "h-12 px-5 border-b border-border"
        )}
      >
        {/* Task ID Input */}
        <Input
          data-component="ApprovalCenter/DetailPanel/Header/TaskIdInput"
          placeholder="编号: 202504290001"
          className="w-[200px] h-8 text-sm rounded-[6px] bg-transparent border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          readOnly
        />

        {/* Submit Result Button - Only show for pending page */}
        {showSubmitButton && (
          <Button
            data-component="ApprovalCenter/DetailPanel/Header/SubmitResultButton"
            variant="default"
            size="sm"
            className="h-8 px-3 text-sm bg-primary-6 text-white rounded-[6px]"
            onClick={openSubmitResultDialog}
          >
            提交审批结果
          </Button>
        )}
      </div>

      {/* Task Info */}
      <div
        data-component="ApprovalCenter/DetailPanel/TaskInfo"
        className={cn(
          "flex flex-col gap-2.5",
          "px-5 py-4"
        )}
      >
        {/* Title + Status */}
        <div className="flex items-center gap-2.5">
          <h2
            data-component="ApprovalCenter/DetailPanel/TaskInfo/TitleText"
            className="text-[22px] leading-[32px] font-semibold text-text-primary"
          >
            审批任务名称
          </h2>
          <Tag
            data-component="ApprovalCenter/DetailPanel/TaskInfo/StatusTag"
            variant={statusVariantMap["pending"]}
          >
            待审批
          </Tag>
        </div>

        {/* Meta Row */}
        <div
          data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow"
          className="flex items-center gap-2 flex-wrap"
        >
          {/* Submitter Info */}
          <div
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/SubmitterInfo"
            className="flex items-center gap-1.5"
          >
            <UserAvatar
              userInfo={{ realName: "姓名" }}
              size={16}
            />
            <span className="text-sm text-text-primary">姓名</span>
          </div>

          <span className="text-sm text-text-secondary">部门名称</span>

          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/TargetLocation"
            className="text-sm text-text-secondary"
          >
            目标位置: 全部素材
          </span>

          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/SubmitTime"
            className="text-sm text-text-secondary"
          >
            提交时间: 2025-04-29 16:53
          </span>
        </div>

        {/* Submitter Note */}
        <div
          data-component="ApprovalCenter/DetailPanel/TaskInfo/SubmitterNote"
          className={cn(
            "flex items-center gap-2.5",
            "p-2.5 rounded-[8px] bg-page"
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-1">
            <Icon name="Message" size={14} className="text-primary-6" />
          </div>
          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/SubmitterNote/NoteText"
            className="text-sm text-text-primary"
          >
            留言：这里是提交审批者的留言，如果用户填写了的话，没填写则不显示这个板块~
          </span>
        </div>
      </div>

      {/* Content Tabs */}
      <div
        data-component="ApprovalCenter/DetailPanel/ContentTabs"
        className="flex flex-col flex-1 min-h-0"
      >
        {/* Tab Bar - Sticky */}
        <div
          data-component="ApprovalCenter/DetailPanel/ContentTabs/TabBar"
          className="border-b border-border bg-surface"
        >
          <div className="flex h-10 px-5">
            <button
              onClick={() => scrollToSection("assets")}
              className={cn(
                "text-sm px-4 py-2 border-b-2 transition-colors",
                activeTab === "assets"
                  ? "text-primary-6 border-primary-6"
                  : "text-text-tertiary border-transparent hover:text-text-primary"
              )}
            >
              审批素材
            </button>
            <button
              onClick={() => scrollToSection("records")}
              className={cn(
                "text-sm px-4 py-2 border-b-2 transition-colors",
                activeTab === "records"
                  ? "text-primary-6 border-primary-6"
                  : "text-text-tertiary border-transparent hover:text-text-primary"
              )}
            >
              审批记录
            </button>
            <button
              onClick={() => scrollToSection("comments")}
              className={cn(
                "text-sm px-4 py-2 border-b-2 transition-colors",
                activeTab === "comments"
                  ? "text-primary-6 border-primary-6"
                  : "text-text-tertiary border-transparent hover:text-text-primary"
              )}
            >
              评论
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div
          ref={contentRef}
          data-component="ApprovalCenter/DetailPanel/ContentScrollArea"
          className="flex-1 overflow-auto"
        >
          {/* Asset Section */}
          <div
            ref={assetsRef}
            data-component="ApprovalCenter/DetailPanel/AssetSection"
            className="flex flex-col gap-3 p-5"
          >
            {/* Filter Row - with batch action buttons */}
            <div
              data-component="ApprovalCenter/DetailPanel/AssetSection/FilterRow"
              className="flex items-center justify-between h-8"
            >
              {/* Count Breadcrumb */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">全部 80 项</span>
              </div>

              {/* Filter Buttons - Reject All & Approve All */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/FilterRow/FilterButtons"
                className="flex items-center gap-3"
              >
                <Button
                  data-component="ApprovalCenter/DetailPanel/AssetSection/FilterRow/RejectAllButton"
                  variant="danger"
                  size="sm"
                  className="h-8 px-3 text-sm rounded-[6px]"
                  onClick={() => openBatchActionDialog("reject")}
                >
                  全部标记为拒绝
                </Button>
                <Button
                  data-component="ApprovalCenter/DetailPanel/AssetSection/FilterRow/ApproveAllButton"
                  variant="default"
                  size="sm"
                  className="h-8 px-3 text-sm bg-primary-6 text-white rounded-[6px]"
                  onClick={() => openBatchActionDialog("approve")}
                >
                  全部标记为通过
                </Button>
              </div>
            </div>

            {/* Sub Header - GroupBy + View Toggle */}
            <div
              data-component="ApprovalCenter/DetailPanel/AssetSection/SubHeader"
              className="flex items-center justify-between h-6"
            >
              {/* Group By Selector - placeholder */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/SubHeader/GroupBySelector"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-text-secondary">分组</span>
                <Icon name="CaretDown" size={12} className="text-text-secondary" />
              </div>

              {/* View Actions */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/SubHeader/ViewActions"
                className="flex items-center gap-2"
              >
                {/* Size Slider (Grid Columns) */}
                <div className="flex items-center gap-2">
                  <Slider.Root
                    aria-label="Grid 列数"
                    min={2}
                    max={8}
                    step={1}
                    value={[gridColumns]}
                    disabled={viewMode !== "grid"}
                    onValueChange={(v) => setGridColumns(v[0] ?? 4)}
                    className={cn(
                      "relative flex items-center select-none touch-none",
                      "w-[96px] h-4",
                      viewMode !== "grid" && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <Slider.Track className="relative grow h-1.5 rounded-full bg-border overflow-hidden">
                      <Slider.Range className="absolute h-full bg-primary-6" />
                    </Slider.Track>
                    <Slider.Thumb
                      className={cn(
                        "block w-3 h-3 rounded-full",
                        "bg-primary-6",
                        "transition-transform duration-150",
                        "hover:scale-110 active:scale-95",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(89,139,255,0.2)]"
                      )}
                    />
                  </Slider.Root>
                </div>

                {/* Divider */}
                <Separator orientation="vertical" className="h-4 mx-1" />

                {/* View Toggle */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6 p-0",
                      viewMode === "grid" && "bg-page"
                    )}
                    onClick={() => setViewMode("grid")}
                  >
                    <Icon
                      name="Grid"
                      size={14}
                      className={cn(
                        viewMode === "grid"
                          ? "text-primary-6"
                          : "text-text-secondary"
                      )}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-6 w-6 p-0",
                      viewMode === "list" && "bg-page"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List
                      size={14}
                      className={cn(
                        viewMode === "list"
                          ? "text-primary-6"
                          : "text-text-secondary"
                      )}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Asset Grid/List View */}
            {viewMode === "grid" ? (
              /* Grid View */
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/AssetGrid"
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${isMobile ? Math.min(gridColumns, 2) : gridColumns}, minmax(0, 1fr))`,
                }}
              >
                {assetData.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAssets.has(asset.id)}
                    onToggle={() => toggleAssetSelection(asset.id)}
                  />
                ))}
              </div>
            ) : (
              /* List View (Table) */
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/AssetTable"
                className="rounded-[8px] border border-border overflow-hidden"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border bg-page h-10">
                      <TableHead className="w-12 px-2">
                        <Checkbox
                          checked={selectedAssets.size === assetData.length}
                          onCheckedChange={(checked) => {
                            if (checked) selectAllAssets();
                            else clearSelection();
                          }}
                        />
                      </TableHead>
                      <TableHead className="px-2 text-sm font-medium text-text-primary">名称</TableHead>
                      <TableHead className="px-2 text-sm font-medium text-text-primary">状态</TableHead>
                      <TableHead className="px-2 text-sm font-medium text-text-primary">格式</TableHead>
                      <TableHead className="px-2 text-sm font-medium text-text-primary">尺寸</TableHead>
                      <TableHead className="px-2 text-sm font-medium text-text-primary">大小</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetData.map((asset) => (
                      <TableRow key={asset.id} className="border-border hover:bg-muted/50">
                        <TableCell className="py-3 px-2">
                          <Checkbox
                            checked={selectedAssets.has(asset.id)}
                            onCheckedChange={() => toggleAssetSelection(asset.id)}
                          />
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded bg-page flex items-center justify-center overflow-hidden">
                              <ImageIcon size={20} className="text-text-secondary" />
                            </div>
                            <span className="text-sm text-text-primary">{asset.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-2">
                          <span className={cn(
                            "text-sm",
                            asset.status === AssetStatus.APPROVED && "text-success-6",
                            asset.status === AssetStatus.REJECTED && "text-danger-6",
                            asset.status === AssetStatus.PENDING && "text-text-secondary"
                          )}>
                            {asset.status}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 px-2 text-sm text-text-primary">{asset.type}</TableCell>
                        <TableCell className="py-3 px-2 text-sm text-text-primary">{asset.size}</TableCell>
                        <TableCell className="py-3 px-2 text-sm text-text-primary">{asset.fileSize}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
              {/* Page input */}
              <Input
                placeholder={`输入页数，按回车跳转`}
                min={1}
                max={totalPages}
                onKeyDown={handlePageInputSubmit}
                className="rounded-[6px] max-w-[200px] flex-1 h-9"
              />

              {/* Pagination navigation */}
              <div className="flex items-center gap-2">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            handlePageChange(currentPage - 1);
                          }
                        }}
                        disabled={currentPage <= 1}
                        ariaLabel="上一页"
                      />
                    </PaginationItem>

                    {/* Page numbers */}
                    {totalPages > 0 && (
                      <>
                        {/* First page */}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(1);
                            }}
                            isActive={currentPage === 1}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>

                        {/* Left ellipsis */}
                        {currentPage > 3 && totalPages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Middle pages */}
                        {(() => {
                          const pages = [];
                          let start = Math.max(2, currentPage - 1);
                          let end = Math.min(totalPages - 1, currentPage + 1);

                          if (currentPage <= 3) {
                            end = Math.min(totalPages - 1, 4);
                          } else if (currentPage >= totalPages - 2) {
                            start = Math.max(2, totalPages - 3);
                          }

                          for (let i = start; i <= end; i++) {
                            pages.push(
                              <PaginationItem key={i}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(i);
                                  }}
                                  isActive={currentPage === i}
                                >
                                  {i}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                          return pages;
                        })()}

                        {/* Right ellipsis */}
                        {currentPage < totalPages - 2 && totalPages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        {/* Last page */}
                        {totalPages > 1 && (
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(totalPages);
                              }}
                              isActive={currentPage === totalPages}
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            handlePageChange(currentPage + 1);
                          }
                        }}
                        disabled={currentPage >= totalPages}
                        ariaLabel="下一页"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* Page size selector */}
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="h-8 w-[90px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 40, 50, 100].map((item) => (
                        <SelectItem key={item} value={item.toString()}>
                          {item}条/页
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Records Section */}
          <div
            ref={recordsRef}
            data-component="ApprovalCenter/DetailPanel/RecordsSection"
            className="flex flex-col gap-4 p-5"
          >
            <h3 className="text-base font-semibold text-text-primary">审批记录</h3>
            <div className="rounded-[8px] border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border bg-page h-10">
                    <TableHead className="px-4 py-2.5 text-14 font-medium text-text-primary">节点名称</TableHead>
                    <TableHead className="px-4 py-2.5 text-14 font-medium text-text-primary">审批人</TableHead>
                    <TableHead className="px-4 py-2.5 text-14 font-medium text-text-primary">审批结果</TableHead>
                    <TableHead className="px-4 py-2.5 text-14 font-medium text-text-primary">审批意见</TableHead>
                    <TableHead className="px-4 py-2.5 text-14 font-medium text-text-primary">审批时间</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recordData.map((record) => (
                    <TableRow
                      key={record.id}
                      className={cn(
                        "border-border hover:bg-transparent",
                        record.status === "自动抄送" && "bg-page"
                      )}
                    >
                      <TableCell className="px-4 py-3 text-sm text-text-primary">{record.action}</TableCell>
                      <TableCell className="px-4 py-3">
                        {record.status === "自动抄送" ? (
                          <div className="flex items-center gap-1.5">
                            {/* System Avatar - 30px blue background with document icon */}
                            <Icon name="SystemDocument" size={30} className="shrink-0 text-primary-6" />
                            {/* Info Container */}
                            <div className="flex flex-col gap-1">
                              <span className="text-sm text-text-primary leading-tight">系统</span>
                              <span className="text-xs text-text-secondary leading-tight">
                                自动超送给
                                <span className="text-primary-6">姓名(昵称)</span>
                              </span>
                              <div className="flex items-center gap-1">
                                <Icon name="CheckCircle" size={14} className="text-text-secondary" />
                                <span className="text-xs text-text-secondary">1个月前已读</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <UserAvatar userInfo={{ realName: record.operator.name }} size={24} />
                            <span className="text-sm text-text-primary">{record.operator.name}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {record.status === "自动抄送" ? (
                          <span className="text-[13px] text-text-secondary">自动抄送</span>
                        ) : (
                          <Tag
                            variant="outline"
                            className={cn(
                              "px-2 py-0.5 text-xs rounded-tag font-normal",
                              record.status === "已通过" && "bg-success-1 border-success-6 text-success-6",
                              record.status === "已提交" && "bg-basic-1 border-border-strong text-text-secondary",
                              record.status === "已自动入库" && "bg-transparent border-none text-text-secondary text-[13px]"
                            )}
                          >
                            {record.status}
                          </Tag>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-text-secondary max-w-[300px] leading-body break-all">
                        {record.status === "自动抄送" ? "-" : (record.comment || record.result)}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex flex-col gap-0.5 text-sm">
                          <span className="text-text-primary">{record.time.split("\n")[0]}</span>
                          <span className="text-text-secondary">{record.time.split("\n")[1]}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Comments Section */}
          <div
            ref={commentsRef}
            data-component="ApprovalCenter/DetailPanel/CommentSection"
            className="flex flex-col gap-3 p-5"
          >
            <h3 className="text-base font-semibold text-text-primary">评论</h3>
            <div
              data-component="ApprovalCenter/DetailPanel/CommentSection/CommentInput"
              className="relative"
            >
              <Input
                data-component="ApprovalCenter/DetailPanel/CommentSection/CommentInput/InputField"
                placeholder="整体评论，可@相关成员"
                className="h-10 pr-20 rounded-[8px]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Icon name="PaperClip" size={16} className="text-text-secondary" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ImageIcon size={16} className="text-text-secondary" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Action Confirm Dialog */}
      <AlertDialog open={batchActionDialogOpen} onOpenChange={setBatchActionDialogOpen}>
        <AlertDialogContent
          data-component="ApprovalCenter/DetailPanel/BatchActionDialog"
          className="w-[400px]"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-text-primary">
              {batchActionType === "approve" ? "确认全部通过" : "确认全部拒绝"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-text-secondary leading-[22px]">
              {batchActionType === "approve"
                ? "确定要将所有待审批的素材标记为通过吗？此操作将影响全部未审批的素材。"
                : "确定要将所有待审批的素材标记为拒绝吗？此操作将影响全部未审批的素材。"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel
              data-component="ApprovalCenter/DetailPanel/BatchActionDialog/CancelButton"
              className="h-8 px-3 text-sm rounded-[6px] border-basic-4 text-text-primary hover:border-primary-5 hover:text-primary-5"
            >
              取消
            </AlertDialogCancel>
            <AlertDialogAction
              data-component="ApprovalCenter/DetailPanel/BatchActionDialog/ConfirmButton"
              variant={batchActionType === "approve" ? "default" : "dialogDanger"}
              className="h-8 px-3 text-sm rounded-[6px]"
              onClick={handleBatchActionConfirm}
            >
              {batchActionType === "approve" ? "确认通过" : "确认拒绝"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Result Dialog */}
      <Dialog open={submitResultDialogOpen} onOpenChange={setSubmitResultDialogOpen}>
        <DialogContent
          data-component="ApprovalCenter/DetailPanel/SubmitResultDialog"
          className="w-[480px]  p-0 gap-0"
        >
          {/* Header */}
          <DialogHeader
            data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Header"
            className="flex flex-row items-center justify-between gap-4 border-b-0"
          >
            <DialogTitle className="text-base font-semibold text-text-primary">
              提交审批结果
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <div
            data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Body"
            className="flex flex-col gap-4 pb-1"

          >
            {/* Notice Row */}
            <div
              data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Body/NoticeRow"
              className="flex gap-2 items-start"
            >
              {/* Icon */}
              <div className="flex items-center pt-[3px] shrink-0">
                {(() => {
                  const approvedCount = assetData.filter(a => a.status === AssetStatus.APPROVED).length;
                  const rejectedCount = assetData.filter(a => a.status === AssetStatus.REJECTED).length;
                  const pendingCount = assetData.filter(a => a.status === AssetStatus.PENDING).length;

                  // 全部通过
                  const isAllApproved = approvedCount > 0 && pendingCount === 0 && rejectedCount === 0;
                  // 全部拒绝
                  const isAllRejected = rejectedCount > 0 && pendingCount === 0 && approvedCount === 0;

                  if (isAllApproved) {
                    return <Icon name="CheckCircle" size={16} className="text-success-6" />;
                  } else if (isAllRejected) {
                    return <Icon name="ExclamationCircle" size={16} className="text-warning-6" />;
                  } else {
                    // 混合状态，显示成功图标
                    return <Icon name="CheckCircle" size={16} className="text-success-6" />;
                  }
                })()}
              </div>
              {/* Text - 完全匹配设计稿文案 */}
              <div className="flex-1 text-sm leading-[22px] text-text-primary">
                {(() => {
                  const approvedCount = assetData.filter(a => a.status === AssetStatus.APPROVED).length;
                  const rejectedCount = assetData.filter(a => a.status === AssetStatus.REJECTED).length;
                  const pendingCount = assetData.filter(a => a.status === AssetStatus.PENDING).length;
                  const totalCount = assetData.length;

                  // 全部通过
                  const isAllApproved = approvedCount > 0 && pendingCount === 0 && rejectedCount === 0;
                  // 全部拒绝
                  const isAllRejected = rejectedCount > 0 && pendingCount === 0 && approvedCount === 0;

                  if (isAllApproved) {
                    return (
                      <>
                        <p className="mb-0">已通过全部 {totalCount} 个素材，确认提交审批结果？</p>
                        <p>确认后将流转至下一审批节点。</p>
                      </>
                    );
                  } else if (isAllRejected) {
                    return (
                      <>
                        <p className="mb-0">已拒绝全部 {totalCount} 个素材，确认完成本节点审批？</p>
                        <p>确认后将退回提交者修改。</p>
                      </>
                    );
                  } else {
                    // 混合状态 - 以通过为主
                    return (
                      <>
                        <p className="mb-0">已通过全部 {totalCount} 个素材，确认提交审批结果？</p>
                        <p>确认后将流转至下一审批节点。</p>
                      </>
                    );
                  }
                })()}
              </div>
            </div>

            {/* Comment Field */}
            <div
              data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Body/CommentField"
              className="bg-page rounded-[8px] p-5 flex flex-col gap-2"
            >
              {/* Label */}
              <div className="flex items-center w-full">
                <span className="text-[13px] font-medium text-text-primary">审批意见</span>
              </div>
              {/* Textarea */}
              <Textarea
                data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Body/CommentField/TextareaInput"
                placeholder="选填"
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                className="h-20 rounded-[6px] border-basic-4 resize-none text-sm"
              />
            </div>
          </div>

          {/* Footer */}
          <DialogFooter
            data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Footer"
            className="flex justify-end gap-2 px-5 py-4"
          >
            <Button
              data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Footer/CancelButton"
              variant="outline"
              size="sm"
              className="h-8 px-3 text-sm rounded-[6px] border-basic-4 text-text-primary hover:border-primary-5 hover:text-primary-5"
              onClick={() => setSubmitResultDialogOpen(false)}
            >
              暂不提交
            </Button>
            <Button
              data-component="ApprovalCenter/DetailPanel/SubmitResultDialog/Footer/ConfirmButton"
              variant="default"
              size="sm"
              className="h-8 px-3 text-sm bg-primary-6 text-white rounded-[6px]"
              onClick={handleSubmitApprovalResult}
            >
              确认提交
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
