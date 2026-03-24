"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ModalDialog } from "@/components/ui/modal-dialog";
import type { Template, WorkflowNode } from "./TemplateCard";
import { UserAvatar } from "@/components/UserAvatar";
import { formatMemberName } from "@/utils/formatMemberName";
import { MusedamUser } from "@/types/musedam";

interface TemplateSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: Template[];
  onSelect: (template: Template) => void;
}

/**
 * TemplateSelectorModal
 * Figma: ApprovalCenter/SubmitApproval/TemplateSelector
 * 审批模板选择弹窗 - 两列布局
 */
export function TemplateSelectorModal({
  open,
  onOpenChange,
  templates,
  onSelect,
}: TemplateSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 过滤模板列表
  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return templates;
    const query = searchQuery.toLowerCase();
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }, [templates, searchQuery]);

  // 处理模板选择
  const handleSelect = (template: Template) => {
    setSelectedId(template.id);
  };

  // 确认选择
  const handleConfirm = () => {
    const selected = templates.find((t) => t.id === selectedId);
    if (selected) {
      onSelect(selected);
      onOpenChange(false);
      setSearchQuery("");
      setSelectedId(null);
    }
  };

  // 取消/关闭
  const handleCancel = () => {
    onOpenChange(false);
    setSearchQuery("");
    setSelectedId(null);
  };

  // 弹窗内容
  const modalContent = (
    <div className="flex flex-col gap-4">
      {/* Template List - 两列布局 */}
      <div className="grid grid-cols-2 h-[500px] gap-4 overflow-y-auto">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <SelectableTemplateCard
              key={template.id}
              template={template}
              isSelected={selectedId === template.id}
              onSelect={() => handleSelect(template)}
            />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center gap-2 py-12">
            <Icon name="Search" size={48} className="text-basic-3" />
            <p className="text-sm text-basic-5">未找到匹配的模板</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="选择审批模板"
      content={modalContent}
      width={1024}
      showCloseButton={true}
      onCancel={handleCancel}
      onOk={handleConfirm}
      cancelButton={{
        text: "取消",
        type: "outline",
      }}
      okButton={{
        text: "确认",
        type: "default",
        disabled: !selectedId,
      }}
      className="max-h-[85vh] overflow-hidden rounded-xl border-border bg-card p-0"
    />
  );
}

/**
 * SelectableTemplateCard
 * 可选择模式的模板卡片 - 带完整流程预览
 */
function SelectableTemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      data-component="ApprovalCenter/SelectableTemplateCard"
      onClick={onSelect}
      className={cn(
        "m-[1px] flex cursor-pointer flex-col gap-3 rounded-lg border p-4 transition-all",
        isSelected
          ? "border-primary ring-1 ring-primary-6"
          : "border-border bg-card hover:bg-primary-1"
      )}
    >
      {/* Header - 模板名称和描述 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium leading-5 text-foreground">
            {template.name}
          </h3>
          {/* Radio Indicator */}
          {/* <div
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
              isSelected
                ? "border-primary bg-primary"
                : "border-basic-3 bg-transparent"
            )}
          >
            {isSelected && <Icon name="Check" size={12} className="text-white" />}
          </div> */}
        </div>
        <p className="text-sm leading-[22px] text-basic-5 line-clamp-1">
          {template.description}
        </p>
        <div className="flex items-center gap-1.5">
          <Icon name="FileText" size={14} className="text-basic-5" />
          <span className="text-xs leading-4 text-basic-5">
            使用次数: {template.usageCount}次
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Workflow Preview - 完整流程预览 */}
      <div className="flex flex-col gap-2">
        <p className="text-xs leading-4 text-basic-5">审批流程预览</p>
        <div className="flex flex-col gap-2">
          {template.workflow.map((node, index) => (
            <WorkflowPreviewItem
              key={node.id}
              node={node}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * WorkflowPreviewItem
 * 流程预览节点项（简化版）
 */
function WorkflowPreviewItem({
  node,
  index,
}: {
  node: WorkflowNode;
  index: number;
}) {
  const isStart = node.type === "start";
  const isEnd = node.type === "end";
  const isApproval = node.type === "approval";

  return (
    <div className="flex gap-2">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div
          className={cn(
            "flex size-5 items-center justify-center rounded-full",
            isStart || isEnd ? "bg-success-1" : "bg-primary-1"
          )}
        >
          {isStart && (
            <Icon name="SquarePen" size={12} className="text-success-6" />
          )}
          {isEnd && (
            <Icon name="CircleCheckBig" size={12} className="text-success-6" />
          )}
          {isApproval && (
            <span className="text-xs font-medium text-primary-6">{index}</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium leading-5 text-basic-8">
          {node.name}
        </span>

        {/* Details */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          {isStart && (
            <>
              <div className="flex items-center gap-1">
                <Icon name="User2" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">交付方</span>
              </div>
              <span className="text-xs leading-4 text-basic-5">•</span>
              <span className="text-xs leading-4 text-basic-5">
                {node.description || "上传文件并提交"}
              </span>
            </>
          )}

          {isApproval && (
            <>
              {node.timeLimit && (
                <div className="flex items-center gap-1">
                  <Icon name="ClockCircle" size={12} className="text-basic-5" />
                  <span className="text-xs leading-4 text-basic-5">
                    {node.timeLimit}
                  </span>
                </div>
              )}
              {node.timeoutAction && (
                <>
                  <span className="text-xs leading-4 text-basic-5">•</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Bell2" size={12} className="text-basic-5" />
                    <span className="text-xs leading-4 text-basic-5">
                      {node.timeoutAction}
                    </span>
                  </div>
                </>
              )}
              {node.assignee && (
                <>
                  <span className="text-xs leading-4 text-basic-5">•</span>
                  <div className="flex items-center gap-1">
                    <UserAvatar
                      userInfo={node.assignee as MusedamUser}
                      size={14}
                      fontSize={9}
                    />
                    <span className="text-xs font-medium leading-4 text-basic-6">
                      {formatMemberName(node.assignee as MusedamUser)}
                    </span>
                  </div>
                </>
              )}
            </>
          )}

          {isEnd && (
            <>
              <div className="flex items-center gap-1">
                <Icon name="CircleCheckBig" size={12} className="text-basic-5" />
                <span className="text-xs leading-4 text-basic-5">
                  {node.description || "自动入库"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
