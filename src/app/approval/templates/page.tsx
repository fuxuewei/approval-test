"use client";

import { ApprovalHeader } from "@/components/approval-center/ApprovalHeader";
import { ApprovalEmptyState } from "@/components/approval-center/ApprovalEmptyState";

/**
 * ApprovalTemplatePage
 * Figma: 1 审批模板（ApprovalCenter/ApprovalTemplate/EmptyState）
 * 审批模板页面 - 空状态展示
 */
export default function ApprovalTemplatePage() {
  return (
    <div
      data-component="ApprovalCenter/ApprovalTemplate/EmptyState"
      className="flex flex-col h-full w-full bg-background"
    >
      {/* Header - 头部区域 */}
      <ApprovalHeader />

      {/* ContentArea - 内容区域 */}
      <div
        data-component="ApprovalCenter/ContentArea"
        className="flex flex-1 flex-col px-5"
      >
        <div
          data-component="ApprovalCenter/ContentArea/Container"
          className="flex flex-1 items-center justify-center rounded-[8px]"
        >
          {/* EmptyState - 空状态 */}
          <ApprovalEmptyState />
        </div>
      </div>
    </div>
  );
}
