"use client";

import { useState } from "react";
import { ApprovalHeader } from "@/components/approval-center/ApprovalHeader";
import { ApprovalEmptyState } from "@/components/approval-center/ApprovalEmptyState";
import { TemplateCard } from "@/components/approval-center/TemplateCard";
import { CreateTemplateModal } from "@/components/approval-center/CreateTemplateModal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import type { Template } from "@/components/approval-center/TemplateCard";

/**
 * Mock 数据 - 审批模板列表
 */
const mockTemplates: Template[] = [
  {
    id: "1",
    name: "日常物料审批",
    description: "适合日常常规物料审批流程",
    usageCount: 234,
    autoArchive: true,
    targetFolder: "日常物料",
    workflow: [
      {
        id: "start",
        type: "start",
        name: "提交审批",
        description: "上传文件并提交",
      },
      {
        id: "1",
        type: "approval",
        name: "设计负责人审批",
        assignee: { name: "张三" },
        timeLimit: "24小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "2",
        type: "approval",
        name: "品牌负责人审批",
        assignee: { name: "李四" },
        timeLimit: "24小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "end",
        type: "end",
        name: "审批完成",
        description: "自动入库",
      },
    ],
  },
  {
    id: "2",
    name: "紧急物料审批",
    description: "适用于紧急物料的快速审批流程",
    usageCount: 56,
    autoArchive: true,
    targetFolder: "紧急物料",
    workflow: [
      {
        id: "start",
        type: "start",
        name: "提交审批",
        description: "上传文件并提交",
      },
      {
        id: "1",
        type: "approval",
        name: "直属领导审批",
        assignee: { name: "王五" },
        timeLimit: "4小时内审批",
        timeoutAction: "自动通过",
      },
      {
        id: "end",
        type: "end",
        name: "审批完成",
        description: "自动入库",
      },
    ],
  },
  {
    id: "3",
    name: "大型项目审批",
    description: "适用于大型项目物料的多级审批",
    usageCount: 12,
    autoArchive: false,
    workflow: [
      {
        id: "start",
        type: "start",
        name: "提交审批",
        description: "上传文件并提交",
      },
      {
        id: "1",
        type: "approval",
        name: "项目经理审批",
        assignee: { name: "赵六" },
        timeLimit: "48小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "2",
        type: "approval",
        name: "部门总监审批",
        assignee: { name: "钱七" },
        timeLimit: "48小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "3",
        type: "approval",
        name: "品牌总监审批",
        assignee: { name: "孙八" },
        timeLimit: "48小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "end",
        type: "end",
        name: "审批完成",
        description: "手动入库",
      },
    ],
  },
  {
    id: "4",
    name: "外包物料审批",
    description: "适用于外包供应商物料审批",
    usageCount: 89,
    autoArchive: true,
    targetFolder: "外包物料",
    workflow: [
      {
        id: "start",
        type: "start",
        name: "提交审批",
        description: "上传文件并提交",
      },
      {
        id: "1",
        type: "approval",
        name: "采购负责人审批",
        assignee: { name: "周九" },
        timeLimit: "24小时内审批",
        timeoutAction: "超时转交",
      },
      {
        id: "2",
        type: "approval",
        name: "法务审核",
        assignee: { name: "吴十" },
        timeLimit: "48小时内审批",
        timeoutAction: "超时提醒",
      },
      {
        id: "end",
        type: "end",
        name: "审批完成",
        description: "自动入库",
      },
    ],
  },
];

/**
 * ApprovalTemplatePage
 * Figma: ApprovalCenter/ApprovalTemplate
 * 审批模板页面
 */
export default function ApprovalTemplatePage() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTemplate = (templateData: Partial<Template>) => {
    const newTemplate: Template = {
      id: String(templates.length + 1),
      name: templateData.name || "未命名模板",
      description: templateData.description || "",
      usageCount: 0,
      autoArchive: templateData.autoArchive ?? true,
      targetFolder: templateData.targetFolder,
      workflow: templateData.workflow || [],
    };
    setTemplates([...templates, newTemplate]);
  };

  const handleEdit = (template: Template) => {
    console.log("编辑模板:", template);
  };

  const handleCopy = (template: Template) => {
    const copiedTemplate: Template = {
      ...template,
      id: String(templates.length + 1),
      name: `${template.name} (副本)`,
      usageCount: 0,
    };
    setTemplates([...templates, copiedTemplate]);
  };

  const handleDelete = (template: Template) => {
    setTemplates(templates.filter((t) => t.id !== template.id));
  };

  const hasTemplates = templates.length > 0;

  return (
    <div
      data-component="ApprovalCenter/ApprovalTemplate"
      className="flex h-full w-full flex-col  overflow-scroll"
    >
      {/* Header - 头部区域 */}
      <ApprovalHeader onCreateClick={() => setIsModalOpen(true)} />

      {/* ContentArea - 内容区域 */}
      <div
        data-component="ApprovalCenter/ContentArea"
        className="flex flex-1 flex-col"
      >
        <div
          data-component="ApprovalCenter/ContentArea/Container"
          className="flex flex-1 flex-col rounded-lg bg-page pt-5"
        >
          {hasTemplates ? (
            /* TemplateGrid - 模板列表（2列布局） */
            <div
              data-component="ApprovalCenter/ApprovalTemplate/TemplateGrid"
              className="grid grid-cols-2 gap-4"
            >
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEdit}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            /* EmptyState - 空状态 */
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-6">
                {/* Empty Illustration */}
                <EmptyStateIllustration />
                {/* Text */}
                <div className="flex w-[400px] flex-col items-center gap-1 text-center">
                  <h3 className="text-lg font-semibold leading-6 text-foreground">
                    暂无审批模板
                  </h3>
                  <p className="text-sm leading-[22px] text-basic-5">
                    立即创建审批模板，标准化资产审批流程~
                  </p>
                </div>
                {/* Button */}
                <Button
                  variant="outline"
                  className="h-9 gap-1.5 rounded-md border-border px-3 text-sm font-normal text-foreground shadow-sm hover:bg-background"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Icon name="Plus" size={14} />
                  新建模板
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CreateTemplateModal - 新建模板弹窗 */}
      <CreateTemplateModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateTemplate}
      />
    </div>
  );
}

/**
 * EmptyStateIllustration
 * 空状态插图
 */
function EmptyStateIllustration() {
  return (
    <svg
      viewBox="0 0 170 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[118px] w-[170px]"
    >
      {/* 背景云 */}
      <g opacity="0.3">
        <ellipse cx="85" cy="70" rx="60" ry="30" fill="var(--color-basic-3)" />
      </g>

      {/* 主文档图标 */}
      <g transform="translate(55, 25)">
        {/* 文档底座 */}
        <rect
          x="10"
          y="5"
          width="50"
          height="65"
          rx="4"
          fill="var(--color-basic-0)"
          stroke="var(--color-basic-3)"
          strokeWidth="2"
        />

        {/* 文档折角 */}
        <path
          d="M50 5L50 20L60 20L50 5Z"
          fill="var(--color-basic-1)"
          stroke="var(--color-basic-3)"
          strokeWidth="1"
        />

        {/* 文档内部线条 */}
        <line x1="20" y1="30" x2="50" y2="30" stroke="var(--color-basic-3)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="40" x2="50" y2="40" stroke="var(--color-basic-3)" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="50" x2="40" y2="50" stroke="var(--color-basic-3)" strokeWidth="2" strokeLinecap="round" />

        {/* 印章图标 */}
        <circle cx="45" cy="50" r="12" fill="var(--color-primary-1)" stroke="var(--color-primary-6)" strokeWidth="1.5" />
        <text x="45" y="54" textAnchor="middle" fill="var(--color-primary-6)" fontSize="8" fontWeight="bold">
          审
        </text>
      </g>

      {/* 装饰性元素 - 小圆点 */}
      <circle cx="30" cy="40" r="4" fill="var(--color-primary-1)" />
      <circle cx="140" cy="35" r="3" fill="var(--color-primary-1)" />
      <circle cx="145" cy="60" r="2" fill="var(--color-basic-3)" />

      {/* 搜索图标装饰 */}
      <g transform="translate(125, 75)" opacity="0.5">
        <circle cx="8" cy="8" r="6" stroke="var(--color-basic-4)" strokeWidth="1.5" />
        <path d="M12 12L16 16" stroke="var(--color-basic-4)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}
