"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";

interface TaskCardProps {
  id: string;
  status: "pending" | "processing" | "completed";
  statusText: string;
  title: string;
  submitter: {
    name: string;
    avatarUrl?: string;
    department: string;
  };
  selected?: boolean;
  onClick?: () => void;
}

const TaskCard = ({
  status,
  statusText,
  title,
  submitter,
  selected,
  onClick,
}: TaskCardProps) => {
  const statusVariantMap = {
    pending: {
      bg: "bg-[var(--sunset-orange-1)]",
      border: "border-[var(--sunset-orange-3)]",
      text: "text-[var(--ant-warning-6)]",
    },
    processing: {
      bg: "bg-[var(--ant-primary-1)]",
      border: "border-[var(--ant-primary-2)]",
      text: "text-[var(--ant-primary-6)]",
    },
    completed: {
      bg: "bg-[var(--ant-success-1)]",
      border: "border-[var(--ant-success-6)]",
      text: "text-[var(--ant-success-6)]",
    },
  };

  const variant = statusVariantMap[status];

  return (
    <div
      data-component="ApprovalCenter/TaskListPanel/TaskCard"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-3 p-4 rounded-[8px] cursor-pointer",
        "bg-[var(--ant-basic-0)]",
        selected
          ? "border-2 border-[var(--ant-primary-6)]"
          : "border border-[var(--ant-basic-3)]"
      )}
    >
      {/* Status Badge + Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "px-1.5 py-0.5 text-xs font-medium rounded-[4px]",
              variant.bg,
              variant.border,
              variant.text
            )}
          >
            {statusText}
          </Badge>
          <h3 className="text-[16px] leading-[24px] font-semibold text-[var(--ant-basic-8)] truncate">
            {title}
          </h3>
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
          <span className="text-xs font-medium text-[var(--ant-basic-5)]">
            {submitter.name}
          </span>
        </div>
        <span className="text-xs text-[var(--ant-basic-5)]">
          {submitter.department}
        </span>
      </div>
    </div>
  );
};

interface TaskListPanelProps {
  selectedTaskId?: string;
  onTaskSelect?: (taskId: string) => void;
}

export const TaskListPanel = ({
  selectedTaskId,
  onTaskSelect,
}: TaskListPanelProps) => {
  // Mock data - replace with actual API data
  const tasks: TaskCardProps[] = [
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
  ];

  return (
    <div
      data-component="ApprovalCenter/TaskListPanel"
      className={cn(
        "flex flex-col gap-2.5",
        "w-[280px] min-w-[280px]"
      )}
    >
      {/* Date Filter */}
      <div
        data-component="ApprovalCenter/TaskListPanel/DateFilter"
        className={cn(
          "flex items-center gap-1 px-1 py-0.5 rounded-[4px]",
          "text-sm text-[var(--ant-basic-10)]",
          "cursor-pointer hover:bg-[var(--ant-basic-1)]"
        )}
      >
        <span>全部时间</span>
        <ChevronDown size={10} className="text-[var(--ant-basic-5)]" />
      </div>

      {/* Task Cards */}
      <div className="flex flex-col gap-2.5">
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
  );
};
