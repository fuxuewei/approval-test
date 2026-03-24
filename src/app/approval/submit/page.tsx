"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { SubmitApprovalModal } from "@/components/approval-center";
import type { Template } from "@/components/approval-center";

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
 * SubmitApprovalDemoPage
 * 提交审批弹窗示例页面
 *
 * 实际使用时，SubmitApprovalModal 应该由其他项目中的
 * "提交审批"按钮触发打开。
 */
export default function SubmitApprovalDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: { template: Template; remark: string }) => {
    console.log("提交审批:", data);
    // TODO: 调用 API 提交审批
    alert(`已提交审批：${data.template.name}\n留言：${data.remark || "无"}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
      <div className="text-center">
        <h1 className="mb-2 text-xl font-semibold text-foreground">
          提交审批弹窗演示
        </h1>
        <p className="text-sm text-basic-5">
          点击下方按钮打开提交审批弹窗
        </p>
      </div>

      <Button
        onClick={() => setIsModalOpen(true)}
        className="h-10 gap-2 rounded-md bg-primary px-4 text-sm font-normal text-primary-foreground hover:bg-primary-5"
      >
        <Icon name="SquarePen" size={16} />
        提交审批
      </Button>

      {/* 提交审批弹窗 */}
      <SubmitApprovalModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        templates={mockTemplates}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
