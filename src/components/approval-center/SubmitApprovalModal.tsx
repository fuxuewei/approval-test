"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ModalDialog, ConfirmDialog } from "@/components/ui/modal-dialog";
import { TemplateSelectorModal } from "./TemplateSelectorModal";
import type { Template } from "./TemplateCard";
import type { MusedamUser } from "@/types/musedam";

interface SubmitApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: Template[];
  onSubmit?: (data: {
    template: Template;
    remark: string;
  }) => void;
}

/**
 * SubmitApprovalModal
 * Figma: ApprovalCenter/SubmitApproval
 * 提交审批弹窗
 *
 * 三种状态：
 * 1. 未选择审批模板
 * 2. 点击选择审批模板（弹出选择弹窗）
 * 3. 选择审批模板后
 */
export function SubmitApprovalModal({
  open,
  onOpenChange,
  templates,
  onSubmit,
}: SubmitApprovalModalProps) {
  // 选中的模板
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  // 选择弹窗状态
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  // 留言
  const [remark, setRemark] = useState("");
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 清除模板确认弹窗状态
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);

  // 处理模板选择
  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
  };

  // 打开清除确认弹窗
  const handleClearTemplateClick = () => {
    setIsClearConfirmOpen(true);
  };

  // 确认清除已选模板
  const handleClearTemplateConfirm = () => {
    setSelectedTemplate(null);
    setIsClearConfirmOpen(false);
  };

  // 处理提交
  const handleSubmit = async () => {
    if (!selectedTemplate) return;

    setIsSubmitting(true);
    await onSubmit?.({
      template: selectedTemplate,
      remark,
    });
    setIsSubmitting(false);
    onOpenChange(false);
    // 重置状态
    setSelectedTemplate(null);
    setRemark("");
  };

  // 处理取消/关闭
  const handleCancel = () => {
    onOpenChange(false);
    // 延迟重置状态，等待动画完成
    setTimeout(() => {
      setSelectedTemplate(null);
      setRemark("");
    }, 200);
  };

  // 弹窗内容
  const modalContent = (
    <div
      data-component="ApprovalCenter/SubmitApprovalModal/Body"
      className="flex flex-col gap-5"
    >
      {/* 审批模板选择区域 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm leading-5 text-foreground">
          审批模板
        </label>
        {selectedTemplate ? (
          /* 已选择模板 - 显示模板卡片 */
          <SelectedTemplateCard
            template={selectedTemplate}
            onClear={handleClearTemplateClick}
          />
        ) : (
          /* 未选择模板 - 显示选择按钮 */
          <Button
            variant="outline"
            onClick={() => setIsSelectorOpen(true)}
            className="h-10 justify-start gap-2 rounded-md border-border bg-card px-3 text-sm font-normal text-foreground hover:bg-basic-1"
          >
            <Icon name="SystemDocument" size={16} className="text-basic-5" />
            选择对应审批模板
          </Button>
        )}
      </div>

      {/* 留言输入区域 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm  leading-5 text-foreground">
          留言
        </label>
        <textarea
          placeholder="请输入给审批人的留言"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className={cn(
            "min-h-[60px] resize-none rounded-md border border-border bg-card px-3 py-2 text-sm",
            "placeholder:text-basic-5 common-transition",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          )}
        />
      </div>

      {/* 提交前确认提示 */}
      <div className="text-sm flex flex-col gap-2 text-basic-7">
        <span>
          提交前，请确认：
        </span>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-basic-5" />
          <span >
            所有交付物已上传完成
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-basic-5" />
          <span>
            审批期间素材将被锁定，无法修改
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 提交审批弹窗 - 使用 ModalDialog */}
      <ModalDialog
        open={open}
        onOpenChange={onOpenChange}
        title="提交审批"
        content={modalContent}
        width={520}
        showCloseButton={true}
        onCancel={handleCancel}
        onOk={handleSubmit}
        cancelButton={{
          text: "取消",
          type: "outline",
        }}
        okButton={{
          text: isSubmitting ? "提交中..." : "确认",
          type: "default",
          disabled: !selectedTemplate || isSubmitting,
          loading: isSubmitting,
        }}
        className="overflow-hidden rounded-xl border-border bg-card p-0"
      />

      {/* 模板选择弹窗 */}
      <TemplateSelectorModal
        open={isSelectorOpen}
        onOpenChange={setIsSelectorOpen}
        templates={templates}
        onSelect={handleTemplateSelect}
      />

      {/* 清除模板确认弹窗 */}
      <ConfirmDialog
        open={isClearConfirmOpen}
        onOpenChange={setIsClearConfirmOpen}
        title="确认清除"
        content={
          selectedTemplate
            ? `是否确认清除已选择的审批模板「${selectedTemplate.name}」？`
            : "是否确认清除已选择的审批模板？"
        }
        confirmType="danger"
        confirmText="清除"
        cancelText="取消"
        onConfirm={handleClearTemplateConfirm}
      />
    </>
  );
}

/**
 * SelectedTemplateCard
 * 已选择的模板卡片
 */
function SelectedTemplateCard({
  template,
  onClear,
}: {
  template: Template;
  onClear: () => void;
}) {
  // 提取审批人姓名列表
  const approverNames = template.workflow
    .filter((node) => node.type === "approval")
    .map((node) => {
      const assignee = node.assignee;
      if (!assignee) return "未知";
      // 优先使用简单 name 属性
      if ("name" in assignee && assignee.name) {
        return assignee.name;
      }
      // 否则尝试 MusedamUser 的属性
      const musedamUser = assignee as MusedamUser;
      return (
        musedamUser.orgRealName ||
        musedamUser.realName ||
        musedamUser.nickName ||
        "未知"
      );
    });

  const approverText =
    approverNames.length > 0
      ? `${approverNames.join(" · ")} 审批`
      : "暂无审批人";

  return (
    <div
      data-component="ApprovalCenter/SelectedTemplateCard"
      className="flex items-center justify-between gap-3 rounded-md border border-basic-4 bg-card p-3"
    >
      <div className="flex items-center gap-3">
        {/* 模板图标 */}
        <div className="flex size-[30px] items-center justify-center rounded-md bg-warning-1">
          <Icon name="SystemDocument" size={16} className="text-warning-6" />
        </div>
        {/* 模板信息 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium leading-5 text-foreground">
            {template.name}
          </span>
          <span className="text-xs leading-4 text-basic-5">{approverText}</span>
        </div>
      </div>
      {/* 删除按钮 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="h-[22px] w-[22px] p-0 text-basic-5 hover:text-danger-6 hover:bg-transparent"
      >
        <Icon name="Delete" size={14} />
      </Button>
    </div>
  );
}
