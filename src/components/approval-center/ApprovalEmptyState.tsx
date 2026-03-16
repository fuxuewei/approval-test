"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "./icons";

/**
 * ApprovalEmptyState
 * Figma: ApprovalCenter/EmptyState/ApprovalTemplate
 * 审批模板空状态组件
 */
export function ApprovalEmptyState() {
  return (
    <div
      data-component="ApprovalCenter/EmptyState/ApprovalTemplate"
      className="flex flex-col items-center gap-6"
    >
      {/* Empty - 空状态插图 */}
      <div
        data-component="ApprovalCenter/EmptyState/ApprovalTemplate/Empty"
        className="relative h-[118px] w-[170px]"
      >
        <EmptyStateIllustration />
      </div>

      {/* Text - 文字区域 */}
      <div
        data-component="ApprovalCenter/EmptyState/ApprovalTemplate/Text"
        className="flex w-[400px] flex-col items-center gap-1"
      >
        {/* Title - 标题 */}
        <h3
          data-component="ApprovalCenter/EmptyState/ApprovalTemplate/Text/Title"
          className="text-[18px] leading-[24px] font-semibold text-foreground"
        >
          暂无审批模板
        </h3>

        {/* Subtitle - 副标题 */}
        <p
          data-component="ApprovalCenter/EmptyState/ApprovalTemplate/Text/Subtitle"
          className="text-[14px] leading-[22px] text-muted-foreground"
        >
          立即创建审批模板，标准化资产审批流程~
        </p>
      </div>

      {/* ButtonGroup - 按钮组 */}
      <div
        data-component="ApprovalCenter/EmptyState/ApprovalTemplate/ButtonGroup"
        className="flex items-center gap-2"
      >
        <Button
          data-component="ApprovalCenter/EmptyState/ApprovalTemplate/ButtonGroup/CreateButton"
          variant="outline"
          className="flex h-9 items-center gap-1.5 rounded-[6px] border-border bg-card px-3 text-[14px] leading-[22px] text-foreground shadow-sm hover:bg-background"
        >
          <Plus className="h-3.5 w-3.5 text-foreground" />
          <span>新建模板</span>
        </Button>
      </div>
    </div>
  );
}

/**
 * EmptyStateIllustration
 * Figma: Empty 组件中的插图
 * 空状态插图 SVG - 使用 MuseDAM 设计系统颜色
 */
function EmptyStateIllustration() {
  return (
    <svg
      viewBox="0 0 170 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      {/* 背景云 */}
      <g opacity="0.3">
        <ellipse cx="85" cy="70" rx="60" ry="30" fill="var(--ant-basic-3)" />
      </g>

      {/* 主文档图标 */}
      <g transform="translate(55, 25)">
        {/* 文档底座 */}
        <rect
          x="10"
          y="5"
          width="50"
          height="65"
          rx="4"
          fill="var(--ant-basic-0)"
          stroke="var(--ant-basic-3)"
          strokeWidth="2"
        />

        {/* 文档折角 */}
        <path
          d="M50 5L50 20L60 20L50 5Z"
          fill="var(--ant-basic-1)"
          stroke="var(--ant-basic-3)"
          strokeWidth="1"
        />

        {/* 文档内部线条 */}
        <line x1="20" y1="30" x2="50" y2="30" stroke="var(--ant-basic-3)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="40" x2="50" y2="40" stroke="var(--ant-basic-3)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="50" x2="40" y2="50" stroke="var(--ant-basic-3)" strokeWidth="2" strokeLinecap="round" />

        {/* 印章图标 */}
        <circle cx="45" cy="50" r="12" fill="var(--ant-primary-1)" stroke="var(--ant-primary-6)" strokeWidth="1.5" />
        <text x="45" y="54" textAnchor="middle" fill="var(--ant-primary-6)" fontSize="8" fontWeight="bold">
          审
        </text>
      </g>

      {/* 装饰性元素 - 小圆点 */}
      <circle cx="30" cy="40" r="4" fill="var(--ant-primary-1)" />
      <circle cx="140" cy="35" r="3" fill="var(--ant-primary-1)" />
      <circle cx="145" cy="60" r="2" fill="var(--ant-basic-3)" />

      {/* 搜索图标装饰 */}
      <g transform="translate(125, 75)" opacity="0.5">
        <circle cx="8" cy="8" r="6" stroke="var(--ant-basic-4)" strokeWidth="1.5" />
        <path d="M12 12L16 16" stroke="var(--ant-basic-4)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
