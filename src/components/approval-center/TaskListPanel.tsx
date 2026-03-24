"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import type { TaskType } from "@/app/approval/types";
import { Tag, TagProps } from "../ui";

type TaskStatus = "pending" | "processing" | "completed" | "approved" | "rejected";

interface TaskCardProps {
  id: string;
  status: TaskStatus;
  statusText: string;
  title: string;
  submitter: {
    name: string;
    avatarUrl?: string;
    department: string;
  };
  targetLocation?: string;
  assetCount?: number;
  submitTime?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const statusVariantMap: Record<TaskStatus, TagProps['variant']> = {
  pending: "warning",
  processing: "default",
  completed: "success",
  approved: "success",
  rejected: "destructive"
};

const TaskCard = ({
  status,
  statusText,
  title,
  submitter,
  targetLocation,
  assetCount,
  submitTime,
  selected,
  onClick,
}: TaskCardProps) => {
  const variant = statusVariantMap[status];

  return (
    <div
      data-component="ApprovalCenter/TaskListPanel/TaskCard"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-2.5 p-3 rounded-[8px] cursor-pointer",
        "bg-basic-0",
        selected
          ? "border-2 border-primary-6"
          : "border border-basic-3"
      )}
    >
      {/* Status Badge + Title */}
      <div className="flex flex-col gap-2">
        <Tag
          variant={variant ?? "outline"}

          className={cn(
            "px-1.5 py-0.5 text-xs font-medium rounded-[4px] w-fit"
          )}
        >
          {statusText}
        </Tag>
        <h3 className="text-[14px] leading-[22px] font-semibold text-basic-8">
          {title}
        </h3>
      </div>

      {/* Task Details */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-basic-5">目标位置</span>
          <span className="text-xs text-basic-8">{targetLocation || submitter.department}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-basic-5">素材数量</span>
          <span className="text-xs text-basic-8">{assetCount || 20}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-basic-5">提交时间</span>
          <span className="text-xs text-basic-8">{submitTime || "2025-04-29 16:53"}</span>
        </div>
      </div>

      {/* Submitter Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <UserAvatar
            userInfo={{
              realName: submitter.name,
              avatarUrl: submitter.avatarUrl,
            }}
            size={20}
          />
          <span className="text-xs font-medium text-basic-8">
            {submitter.name}
          </span>
        </div>
        <span className="text-xs text-primary-6 cursor-pointer hover:underline">
          查看详情
        </span>
      </div>
    </div>
  );
};

interface TaskListPanelProps {
  selectedTaskId?: string;
  onTaskSelect?: (taskId: string) => void;
  pageType?: TaskType;
}

// Mock data generators for different page types
const getMockTasks = (pageType: TaskType = "pending", selectedTaskId?: string): TaskCardProps[] => {
  const baseTasks: Record<TaskType, TaskCardProps[]> = {
    pending: [
      {
        id: "1",
        status: "pending",
        statusText: "待审批",
        title: "设计素材审批申请",
        submitter: { name: "张三", department: "设计部" },
        selected: selectedTaskId === "1",
      },
      {
        id: "2",
        status: "pending",
        statusText: "待审批",
        title: "营销素材入库审批",
        submitter: { name: "李四", department: "市场部" },
        selected: selectedTaskId === "2",
      },
      {
        id: "3",
        status: "pending",
        statusText: "待审批",
        title: "产品图片更新审批",
        submitter: { name: "王五", department: "产品部" },
        selected: selectedTaskId === "3",
      },
      {
        id: "4",
        status: "pending",
        statusText: "待审批",
        title: "活动海报素材审批",
        submitter: { name: "赵六", department: "运营部" },
        selected: selectedTaskId === "4",
      },
      {
        id: "5",
        status: "pending",
        statusText: "待审批",
        title: "品牌VI素材审批",
        submitter: { name: "钱七", department: "品牌部" },
        selected: selectedTaskId === "5",
      },
    ],
    completed: [
      {
        id: "1",
        status: "approved",
        statusText: "已通过",
        title: "设计素材审批申请",
        submitter: { name: "张三", department: "设计部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "1",
      },
      {
        id: "2",
        status: "rejected",
        statusText: "已退回",
        title: "营销素材入库审批",
        submitter: { name: "李四", department: "市场部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "2",
      },
      {
        id: "3",
        status: "approved",
        statusText: "已通过",
        title: "产品图片更新审批",
        submitter: { name: "王五", department: "产品部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "3",
      },
      {
        id: "4",
        status: "approved",
        statusText: "已通过",
        title: "活动海报素材审批",
        submitter: { name: "赵六", department: "运营部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "4",
      },
    ],
    initiated: [
      {
        id: "1",
        status: "pending",
        statusText: "待审批",
        title: "设计素材审批申请",
        submitter: { name: "张三", department: "设计部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "1",
      },
      {
        id: "2",
        status: "approved",
        statusText: "已通过",
        title: "营销素材入库审批",
        submitter: { name: "李四", department: "市场部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "2",
      },
      {
        id: "3",
        status: "pending",
        statusText: "待审批",
        title: "产品图片更新审批",
        submitter: { name: "王五", department: "产品部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "3",
      },
      {
        id: "4",
        status: "pending",
        statusText: "待审批",
        title: "活动海报素材审批",
        submitter: { name: "赵六", department: "运营部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "4",
      },
    ],
    cc: [
      {
        id: "1",
        status: "approved",
        statusText: "已通过",
        title: "设计素材审批申请",
        submitter: { name: "张三", department: "设计部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "1",
      },
      {
        id: "2",
        status: "approved",
        statusText: "已通过",
        title: "营销素材入库审批",
        submitter: { name: "李四", department: "市场部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "2",
      },
      {
        id: "3",
        status: "rejected",
        statusText: "已退回",
        title: "产品图片更新审批",
        submitter: { name: "王五", department: "产品部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "3",
      },
      {
        id: "4",
        status: "approved",
        statusText: "已通过",
        title: "活动海报素材审批",
        submitter: { name: "赵六", department: "运营部" },
        targetLocation: "全部素材",
        assetCount: 20,
        submitTime: "2025-04-29 16:53",
        selected: selectedTaskId === "4",
      },
    ],
  };

  return baseTasks[pageType];
};

export const TaskListPanel = ({
  selectedTaskId,
  onTaskSelect,
  pageType = "pending",
}: TaskListPanelProps) => {
  // Get mock data based on page type
  const tasks = getMockTasks(pageType, selectedTaskId);

  return (
    <div
      data-component="ApprovalCenter/TaskListPanel"
      className={cn(
        "flex flex-col gap-2.5 min-h-0",
        "w-full h-full overflow-hidden"
      )}
    >
      {/* Date Filter */}
      <div
        data-component="ApprovalCenter/TaskListPanel/DateFilter"
        className={cn(
          "flex items-center gap-1 px-1 py-0.5 rounded-[4px]",
          "text-sm text-basic-10",
          "cursor-pointer hover:bg-basic-1"
        )}
      >
        <span>全部时间</span>
        <Icon name="CaretDown" size={10} className="text-basic-5" />
      </div>

      {/* Task Cards - Scrollable */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-2.5 pr-1">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onClick={() => onTaskSelect?.(task.id)}
              selected={selectedTaskId === task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
