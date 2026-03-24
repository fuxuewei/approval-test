"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Template, WorkflowNode } from "./TemplateCard";
import { MemberCombobox } from "./MemberCombobox";
import { MusedamUser } from "@/types/musedam";
import { UserAvatar } from "@/components/UserAvatar";
import { formatMemberName } from "@/utils/formatMemberName";

interface CreateTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (template: Partial<Template>) => void;
  mode?: "create" | "edit";
  initialData?: Template;
}

const TIME_LIMIT_OPTIONS = [
  "收到审批任务 24 小时内",
  "收到审批任务 48 小时内",
  "收到审批任务 72 小时内",
];

/**
 * CreateTemplateModal
 * Figma: ApprovalCenter/ApprovalTemplate/CreateTemplateModal
 * 新建审批模板弹窗
 */
export function CreateTemplateModal({
  open,
  onOpenChange,
  onSubmit,
  mode = "create",
  initialData,
}: CreateTemplateModalProps) {
  const isEdit = mode === "edit";

  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [autoArchive, setAutoArchive] = useState(initialData?.autoArchive ?? true);
  const [targetFolder, setTargetFolder] = useState(initialData?.targetFolder ?? "");
  const [workflow, setWorkflow] = useState<WorkflowNode[]>(
    initialData?.workflow ?? [
      {
        id: "1",
        type: "approval",
        name: "审批节点1",
        assignee: undefined,
        timeLimit: "收到审批任务 48 小时内",
        timeoutAction: "自动转交指定人员",
        timeoutAssignees: [],
        ccUsers: [],
      },
    ]
  );

  // Reset form when open changes or initialData changes
  useEffect(() => {
    if (open) {
      setName(initialData?.name ?? "");
      setDescription(initialData?.description ?? "");
      setAutoArchive(initialData?.autoArchive ?? true);
      setTargetFolder(initialData?.targetFolder ?? "");
      setWorkflow(
        initialData?.workflow ?? [
          {
            id: "1",
            type: "approval",
            name: "审批节点1",
            assignee: undefined,
            timeLimit: "收到审批任务 48 小时内",
            timeoutAction: "自动转交指定人员",
            timeoutAssignees: [],
            ccUsers: [],
          },
        ]
      );
    }
  }, [open, initialData]);

  const handleSubmit = () => {
    onSubmit?.({
      ...(isEdit && initialData ? { id: initialData.id } : {}),
      name,
      description,
      autoArchive,
      targetFolder,
      workflow,
    });
    onOpenChange(false);
  };

  const handleAddNode = () => {
    const newNode: WorkflowNode = {
      id: String(workflow.length + 1),
      type: "approval",
      name: `审批节点${workflow.length + 1}`,
      timeLimit: "收到审批任务 48 小时内",
      timeoutAction: "自动转交指定人员",
      timeoutAssignees: [],
      ccUsers: [],
    };
    setWorkflow([...workflow, newNode]);
  };

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-component="ApprovalCenter/CreateTemplateModal"
        className="max-h-[85vh] w-[480px] overflow-hidden rounded-2xl border border-border bg-card p-0"
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader
          data-component="ApprovalCenter/CreateTemplateModal/Header"
          className="flex flex-row items-center justify-between"
        >
          <DialogTitle
            data-component="ApprovalCenter/CreateTemplateModal/Title"
          >
            {isEdit ? "编辑审批模板" : "新建审批模板"}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            <Icon name="Close" size={16} />
          </Button>
        </DialogHeader>

        {/* Body */}
        <div
          data-component="ApprovalCenter/CreateTemplateModal/Body"
          className="flex max-h-[calc(85vh-140px)] flex-col gap-4 overflow-y-auto"
        >
          {/* 基本信息 */}
          <div className="flex flex-col gap-3">
            {/* 模板名称 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm leading-[22px] text-basic-7">模板名称</label>
              <Input
                placeholder="请输入名称"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 rounded-md border-border px-3 text-sm"
              />
            </div>

            {/* 模板说明 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm leading-[22px] text-basic-7">模板说明</label>
              <Input
                placeholder="请输入说明"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9 rounded-md border-border px-3 text-sm"
              />
            </div>

            {/* 自动入库开关 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm leading-[22px] text-basic-7">审批完成后自动入库</label>
                <Switch checked={autoArchive} onCheckedChange={setAutoArchive} />
              </div>
              {autoArchive && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-fit "
                >
                  <Icon name="FolderMove" size={14} />
                  选择目标文件夹
                </Button>
              )}
            </div>
          </div>

          {/* 审批流程设置 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm leading-[22px] text-basic-7">设置审批流程</label>

            {/* 审批节点列表 */}
            <div className="flex flex-col gap-3">
              {workflow.map((node, index) => (
                <ApprovalNodeCard
                  key={node.id}
                  node={node}
                  index={index}
                  onChange={(updatedNode) => {
                    const newWorkflow = [...workflow];
                    newWorkflow[index] = updatedNode;
                    setWorkflow(newWorkflow);
                  }}
                />
              ))}
            </div>

            {/* 添加审批节点按钮 */}
            <Button
              variant="outline"
              className="h-10 gap-1.5 rounded-md border-dashed border-border text-sm font-normal bg-basic-1"
              onClick={handleAddNode}
            >
              <Icon name="Plus" size={14} />
              添加审批节点
            </Button>

            {/* 提示信息 */}
            <span className="text-sm  text-basic-5">
              💡 提示：若审批人账号被移除，将由管理员重新分配审批人
            </span>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter
          data-component="ApprovalCenter/CreateTemplateModal/Footer"
          className="flex items-center justify-end gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-20 rounded-md border-border text-sm font-normal shadow-sm"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button
            size="sm"
            className={cn(
              "h-8 w-20 rounded-md text-sm font-normal",
              isValid
                ? "bg-primary text-primary-foreground hover:bg-primary-5"
                : "cursor-not-allowed bg-basic-2 text-basic-5"
            )}
            disabled={!isValid}
            onClick={handleSubmit}
          >
            {isEdit ? "保存" : "确认"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Switch 开关组件
 */
function Switch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-basic-3"
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow-md transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

/**
 * ApprovalNodeCard 审批节点卡片
 */
function ApprovalNodeCard({
  node,
  index,
  onChange,
}: {
  node: WorkflowNode;
  index: number;
  onChange: (node: WorkflowNode) => void;
}) {
  const selectedTimeLimit = node.timeLimit ?? TIME_LIMIT_OPTIONS[0];

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-page p-3">
      {/* 节点标题 */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-basic-8">{node.name}</span>
      </div>

      {/* 审批人 */}
      <div className="flex items-center gap-4">
        <span className="w-14 text-sm text-basic-5">审批人</span>
        {node.assignee ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-basic-3 bg-basic-2">
              <UserAvatar userInfo={node.assignee as MusedamUser} size={16} fontSize={10} />
              <span className="text-[13px] leading-[18px] text-basic-10">
                {formatMemberName(node.assignee as MusedamUser)}
              </span>
              <button
                onClick={() => onChange({ ...node, assignee: undefined })}
                className="flex items-center justify-center ml-1"
              >
                <Icon
                  name="Close"
                  size={14}
                  className="text-basic-5 hover:text-basic-10 cursor-pointer"
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 max-w-[200px]">
            <MemberCombobox
              placeholder="选择审批人"
              onSelect={(user) => {
                if (user) {
                  onChange({ ...node, assignee: user });
                }
              }}
            />
          </div>
        )}
      </div>

      {/* 审批时限 */}
      <div className="flex items-center gap-4">
        <span className="w-14 text-sm text-basic-5">审批时限</span>
        <Select
          value={selectedTimeLimit}
          onValueChange={(value) => onChange({ ...node, timeLimit: value })}
        >
          <SelectTrigger
            showIcon={false}
            className="h-8 min-w-[220px] border-0 px-2 text-sm text-basic-7 shadow-none hover:border-0 data-[state=open]:border-0 data-[state=open]:shadow-none"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIME_LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 超时处理 */}
      <div className="flex items-start gap-4">
        <span className="w-14 text-sm text-basic-5 shrink-0">超时处理</span>
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-sm text-basic-7">{node.timeoutAction}</span>
          <div className="flex-1 max-w-[280px]">
            <MemberCombobox
              multiple
              placeholder="选择转交人员"
              values={node.timeoutAssignees || []}
              onSelectMultiple={(users) => onChange({ ...node, timeoutAssignees: users })}
            />
          </div>
        </div>
      </div>

      {/* 抄送 */}
      <div className="flex items-start gap-4">
        <span className="w-14 text-sm text-basic-5 shrink-0">抄送</span>
        <div className="flex-1 max-w-[280px]">
          <MemberCombobox
            multiple
            placeholder="添加抄送人"
            values={node.ccUsers || []}
            onSelectMultiple={(users) => onChange({ ...node, ccUsers: users })}
          />
        </div>
      </div>
    </div>
  );
}
