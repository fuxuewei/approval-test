"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TaskListPanel } from "@/components/approval-center/TaskListPanel";
import { DetailPanel } from "@/components/approval-center/DetailPanel";

/**
 * Approval Center - Pending List Page
 * Page Type: Approval Center Dashboard - Pending Tasks List View
 */
export default function ApprovalCenterPendingPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("1");

  return (
    <div
      data-component="ApprovalCenter/Page/Pending/ListView"
      className={cn(
        "flex flex-col",
        "w-full h-full",
        "gap-4"
      )}
    >
      {/* Header */}
      <div
        data-component="ApprovalCenter/ContentArea/Header"
        className={cn(
          "flex flex-col",
          "px-5 py-5",
          "bg-[var(--ant-basic-0)] rounded-lg"
        )}
      >
        <div
          data-component="ApprovalCenter/ContentArea/Header/Inner"
          className="flex items-center gap-3"
        >
          <h1 className="text-[22px] leading-[32px] font-semibold text-[var(--ant-basic-8)]">
            待办
          </h1>
          <span className="text-sm text-[var(--ant-basic-5)]">
            共 5 个待办任务
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div
        data-component="ApprovalCenter/ContentArea/Main"
        className={cn(
          "flex flex-row flex-1",
          "gap-2.5",
          "min-h-0 overflow-hidden"
        )}
      >
        {/* Task List Panel */}
        <TaskListPanel
          selectedTaskId={selectedTaskId}
          onTaskSelect={setSelectedTaskId}
        />

        {/* Detail Panel */}
        <DetailPanel taskId={selectedTaskId} />
      </div>
    </div>
  );
}
