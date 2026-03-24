"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TaskListPanel } from "@/components/approval-center/TaskListPanel";
import { DetailPanel } from "@/components/approval-center/DetailPanel";
import { LayoutHeader } from "../LayoutHeader";

/**
 * Approval Center - Pending List Page
 * Page Type: Approval Center Dashboard - Pending Tasks List View
 */
export default function ApprovalCenterPendingPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("1");

  return (
    <>
      <LayoutHeader />
      <div
        data-component="ApprovalCenter"
        className={cn(
          "flex flex-row items-stretch flex-1 min-h-0",
          "w-full gap-2.5 overflow-hidden"
        )}
      >
        {/* Task List Panel */}
        <div className="w-[280px] min-w-[280px] min-h-0 overflow-hidden">
          <TaskListPanel
            selectedTaskId={selectedTaskId}
            onTaskSelect={setSelectedTaskId}
          />
        </div>

        {/* Detail Panel */}
        <div className="flex-1 min-w-0 min-h-0 overflow-hidden">
          <DetailPanel taskId={selectedTaskId} />
        </div>
      </div>
    </>
  );
}
