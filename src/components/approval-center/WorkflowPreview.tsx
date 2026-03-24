"use client";

import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { WorkflowNode } from "./TemplateCard";
import { UserAvatar } from "@/components/UserAvatar";
import { formatMemberName } from "@/utils/formatMemberName";
import { MusedamUser } from "@/types/musedam";

interface WorkflowPreviewProps {
  nodes: WorkflowNode[];
  targetFolder?: string;
  className?: string;
}

/**
 * WorkflowPreview
 * Figma: ApprovalCenter/WorkflowPreview
 * 审批流程预览组件（只读）
 */
export function WorkflowPreview({
  nodes,
  targetFolder,
  className,
}: WorkflowPreviewProps) {
  // 过滤掉 start 和 end 节点，只显示审批节点
  const approvalNodes = nodes.filter((node) => node.type === "approval");

  return (
    <div
      data-component="ApprovalCenter/WorkflowPreview"
      className={cn("flex flex-col gap-4", className)}
    >
      {/* Start Node */}
      <WorkflowPreviewItem
        node={nodes.find((n) => n.type === "start")}
        index={0}
        isStart
      />

      {/* Approval Nodes */}
      {approvalNodes.map((node, index) => (
        <WorkflowPreviewItem
          key={node.id}
          node={node}
          index={index + 1}
          isLast={index === approvalNodes.length - 1 && !targetFolder}
        />
      ))}

      {/* End Node */}
      <WorkflowPreviewItem
        node={nodes.find((n) => n.type === "end")}
        index={approvalNodes.length + 1}
        isEnd
        targetFolder={targetFolder}
      />
    </div>
  );
}

/**
 * WorkflowPreviewItem
 * 单个流程节点预览
 */
function WorkflowPreviewItem({
  node,
  index,
  isStart,
  isEnd,
  isLast,
  targetFolder,
}: {
  node?: WorkflowNode;
  index: number;
  isStart?: boolean;
  isEnd?: boolean;
  isLast?: boolean;
  targetFolder?: string;
}) {
  if (!node) return null;

  return (
    <div
      data-component="ApprovalCenter/WorkflowPreview/Item"
      className="flex gap-3"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            isStart || isEnd ? "bg-success-1" : "bg-primary-1"
          )}
        >
          {isStart && (
            <Icon name="SquarePen" size={16} className="text-success-6" />
          )}
          {isEnd && (
            <Icon name="CircleCheckBig" size={16} className="text-success-6" />
          )}
          {!isStart && !isEnd && (
            <span className="text-sm font-medium text-primary-6">{index}</span>
          )}
        </div>
        {/* Connector Line */}
        {!isLast && !isEnd && (
          <div className="mt-2 h-full w-px bg-border min-h-[24px]" />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-1 pb-4", isEnd && "pb-0")}>
        <span className="text-sm font-medium leading-5 text-foreground">
          {node.name}
        </span>
        <div className="flex flex-col gap-1">
          {/* Start Node Info */}
          {isStart && (
            <div className="flex items-center gap-1.5">
              <Icon name="User2" size={12} className="text-basic-5" />
              <span className="text-xs leading-4 text-basic-5">交付方</span>
              <span className="text-xs leading-4 text-basic-5">•</span>
              <span className="text-xs leading-4 text-basic-5">
                {node.description || "上传文件并提交"}
              </span>
            </div>
          )}

          {/* Approval Node Info */}
          {!isStart && !isEnd && (
            <>
              {/* Assignee */}
              {node.assignee && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-basic-5">审批人:</span>
                  <div className="flex items-center gap-1">
                    <UserAvatar
                      userInfo={node.assignee as MusedamUser}
                      size={14}
                      fontSize={9}
                    />
                    <span className="text-xs font-medium text-basic-6">
                      {formatMemberName(node.assignee as MusedamUser)}
                    </span>
                  </div>
                </div>
              )}
              {/* Time Limit */}
              {node.timeLimit && (
                <div className="flex items-center gap-1.5">
                  <Icon name="ClockCircle" size={12} className="text-basic-5" />
                  <span className="text-xs leading-4 text-basic-5">
                    {node.timeLimit}
                  </span>
                </div>
              )}
              {/* Timeout Action */}
              {node.timeoutAction && (
                <div className="flex items-center gap-1.5">
                  <Icon name="Bell2" size={12} className="text-basic-5" />
                  <span className="text-xs leading-4 text-basic-5">
                    {node.timeoutAction}
                  </span>
                </div>
              )}
            </>
          )}

          {/* End Node Info */}
          {isEnd && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Icon name="CircleCheckBig" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">
                  {node.description || "自动入库"}
                </span>
              </div>
              {targetFolder && (
                <div className="flex items-center gap-1.5">
                  <Icon name="folder" size={12} className="text-basic-5" />
                  <span className="text-xs leading-4 text-basic-5">
                    目标位置「{targetFolder}」
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
