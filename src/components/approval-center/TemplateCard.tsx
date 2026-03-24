"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/modal-dialog";
import { CreateTemplateModal } from "./CreateTemplateModal";
import { MusedamUser } from "@/types/musedam";

/**
 * 审批节点类型
 */
export interface WorkflowNode {
  id: string;
  type: "start" | "approval" | "end";
  name: string;
  description?: string;
  assignee?: MusedamUser | { name: string; avatar?: string };
  timeLimit?: string;
  timeoutAction?: string;
  timeoutAssignees?: MusedamUser[];
  ccUsers?: MusedamUser[];
}

/**
 * 审批模板数据类型
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  usageCount: number;
  workflow: WorkflowNode[];
  targetFolder?: string;
  autoArchive: boolean;
}

interface TemplateCardProps {
  template: Template;
  onEdit?: (template: Template) => void;
  onCopy?: (template: Template) => void;
  onDelete?: (template: Template) => void;
}

/**
 * TemplateCard
 * Figma: ApprovalCenter/ApprovalTemplate/TemplateCard
 * 审批模板卡片组件
 */
export function TemplateCard({ template, onEdit, onCopy, onDelete }: TemplateCardProps) {
  // 弹窗状态
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 处理复制确认
  const handleCopyConfirm = () => {
    onCopy?.(template);
    setIsCopyDialogOpen(false);
  };

  // 处理删除确认
  const handleDeleteConfirm = () => {
    onDelete?.(template);
    setIsDeleteDialogOpen(false);
  };

  // 处理编辑提交
  const handleEditSubmit = (updatedTemplate: Partial<Template>) => {
    onEdit?.({ ...template, ...updatedTemplate } as Template);
    setIsEditModalOpen(false);
  };

  return (
    <div
      data-component="ApprovalCenter/ApprovalTemplate/TemplateCard"
      className="flex flex-col justify-between gap-4 rounded-[10px] border border-border bg-card p-4 pb-5"
    >
      <div className="flex flex-col flex-1 gap-4 "
      >
        {/* Header - 模板信息 */}
        <div
          data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Header"
          className="flex flex-col gap-1"
        >
          <h3
            data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Name"
            className="text-lg font-semibold leading-6 text-foreground"
          >
            {template.name}
          </h3>
          <p
            data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Description"
            className="text-sm leading-[22px] text-basic-5"
          >
            {template.description}
          </p>
          <div
            data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Usage"
            className="flex items-center gap-1.5"
          >
            <Icon name="FileText" size={14} className="text-basic-5" />
            <span className="text-xs leading-[18px] text-basic-5">
              使用次数: {template.usageCount}次
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Workflow Preview - 审批流程预览 */}
        <div
          data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Workflow"
          className="flex flex-col gap-2"
        >
          <p className="text-xs leading-4 text-basic-5">审批流程预览</p>
          <div className="flex flex-col gap-3">
            {template.workflow.map((node, index) => (
              <WorkflowNodeItem
                key={node.id}
                node={node}
                index={index}
                targetFolder={template.targetFolder}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4"
      >
        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Actions - 操作按钮 */}
        <div
          data-component="ApprovalCenter/ApprovalTemplate/TemplateCard/Actions"
          className="flex items-center justify-end gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Icon name="Edit" size={14} />
            编辑
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCopyDialogOpen(true)}
          >
            <Icon name="Copy" size={14} />
            复制
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Icon name="Delete" size={14} />
            删除
          </Button>
        </div>
      </div>

      {/* 复制确认弹窗 */}
      <ConfirmDialog
        open={isCopyDialogOpen}
        onOpenChange={setIsCopyDialogOpen}
        title="复制模板"
        content={`是否确认复制审批模板「${template.name}」？`}
        confirmText="确认"
        cancelText="取消"
        onConfirm={handleCopyConfirm}
      />

      {/* 删除确认弹窗 */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="删除模板"
        confirmType="danger"
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        content={`是否确认删除审批模板「${template.name}」？已使用该模板的审批不受影响。`}
      />

      {/* 编辑模板弹窗 */}
      <CreateTemplateModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditSubmit}
        mode="edit"
        initialData={template}
      />
    </div>
  );
}

/**
 * WorkflowNodeItem
 * 审批流程节点项
 */
function WorkflowNodeItem({
  node,
  index,
  targetFolder,
}: {
  node: WorkflowNode;
  index: number;
  targetFolder?: string;
}) {
  // 节点图标和样式
  const getNodeIcon = () => {
    switch (node.type) {
      case "start":
        return (
          <div className="flex size-5 items-center justify-center rounded-full bg-success-1">
            <Icon name="SquarePen" size={12} className="text-success-6" />
          </div>
        );
      case "end":
        return (
          <div className="flex size-5 items-center justify-center rounded-full bg-success-1">
            <Icon name="CircleCheckBig" size={12} className="text-success-6" />
          </div>
        );
      default:
        return (
          <div className="flex size-5 items-center justify-center rounded-full bg-primary-1">
            <span className="text-xs font-medium text-primary-6">{index}</span>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center gap-3">
      {getNodeIcon()}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium leading-[22px] text-basic-8">
          {node.name}
        </span>
        <div className="flex items-center gap-1.5">
          {/* 交付方/审批人信息 */}
          {node.type === "start" && (
            <>
              <div className="flex items-center gap-1">
                <Icon name="User2" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">交付方</span>
              </div>
              <span className="text-xs leading-4 text-basic-5">•</span>
              <div className="flex items-center gap-1">
                <Icon name="CircleCheckBig" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">上传文件并提交</span>
              </div>
            </>
          )}
          {/* 审批节点信息 */}
          {node.type === "approval" && (
            <>
              {node.timeLimit && (
                <div className="flex items-center gap-1">
                  <Icon name="ClockCircle" size={12} className="text-basic-5" />
                  <span className="text-xs leading-4 text-basic-5">{node.timeLimit}</span>
                </div>
              )}
              {node.timeoutAction && (
                <>
                  <span className="text-xs leading-4 text-basic-5">•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Bell2" size={12} className="text-basic-5" />
                    <span className="text-xs leading-4 text-basic-5">{node.timeoutAction}</span>
                  </div>
                </>
              )}
              {node.assignee && (
                <>
                  <span className="text-xs leading-4 text-basic-5">•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium leading-4 text-basic-6">
                      {(node.assignee as MusedamUser)?.orgRealName ||
                       (node.assignee as MusedamUser)?.realName ||
                       (node.assignee as MusedamUser)?.nickName ||
                       (node.assignee as { name: string })?.name}
                    </span>
                  </div>
                </>
              )}
            </>
          )}
          {/* 完成节点信息 */}
          {node.type === "end" && (
            <>
              <div className="flex items-center gap-1">
                <Icon name="CircleCheckBig" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">自动入库</span>
              </div>
              <span className="text-xs leading-4 text-basic-5">•</span>
              <div className="flex items-center gap-1">
                <Icon name="Folder" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">
                  目标位置「{targetFolder || "未设置"}」
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
