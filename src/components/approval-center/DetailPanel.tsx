"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "@/components/UserAvatar";
import { AssetThumbnail } from "@/components/AssetThumbnail";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MessageSquare,
  FolderOpen,
  ChevronDown,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";

interface DetailPanelProps {
  taskId?: string;
}

// Mock asset data
const assetData = [
  { id: 1, name: "image_001.jpg", type: "image", size: "2.4 MB", creator: "张三", date: "2025-04-29" },
  { id: 2, name: "design_v2.fig", type: "design", size: "15.2 MB", creator: "李四", date: "2025-04-29" },
  { id: 3, name: "banner_v1.png", type: "image", size: "1.8 MB", creator: "王五", date: "2025-04-28" },
];

// Mock approval records
const recordData = [
  { id: 1, action: "提交审批", operator: "张三", time: "2025-04-29 16:53", comment: "提交设计素材审批" },
  { id: 2, action: "转交审批", operator: "李四", time: "2025-04-29 17:20", comment: "转交给部门负责人" },
];

export const DetailPanel = ({ taskId }: DetailPanelProps) => {
  if (!taskId) {
    return (
      <div
        data-component="ApprovalCenter/DetailPanel"
        className={cn(
          "flex flex-col items-center justify-center",
          "flex-1 min-h-[400px]",
          "bg-[var(--ant-basic-0)] rounded-[8px] border border-[var(--ant-basic-3)]"
        )}
      >
        <div className="flex flex-col items-center gap-4 text-[var(--ant-basic-5)]">
          <FolderOpen size={48} />
          <p className="text-sm">请选择一个审批任务查看详情</p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-component="ApprovalCenter/DetailPanel"
      className={cn(
        "flex flex-col flex-1",
        "bg-[var(--ant-basic-0)] rounded-[8px] border border-[var(--ant-basic-3)]",
        "min-w-0 overflow-hidden"
      )}
    >
      {/* Header */}
      <div
        data-component="ApprovalCenter/DetailPanel/Header"
        className={cn(
          "flex items-center justify-between gap-3",
          "px-5 py-3 border-b border-[var(--ant-basic-3)]"
        )}
      >
        {/* Task ID Input */}
        <Input
          data-component="ApprovalCenter/DetailPanel/Header/TaskIdInput"
          placeholder="编号: 202504290001"
          className="w-[200px] h-8 text-sm rounded-[4px]"
          readOnly
        />

        {/* Action Buttons */}
        <div
          data-component="ApprovalCenter/DetailPanel/Header/ActionButtons"
          className="flex items-center gap-4"
        >
          <Button
            data-component="ApprovalCenter/DetailPanel/Header/ActionButtons/SubmitResultButton"
            variant="default"
            size="sm"
            disabled
            className="bg-[var(--ant-basic-2)] text-[var(--ant-basic-5)] border border-[var(--ant-basic-4)]"
          >
            提交审批结果
          </Button>
        </div>
      </div>

      {/* Task Info */}
      <div
        data-component="ApprovalCenter/DetailPanel/TaskInfo"
        className={cn(
          "flex flex-col gap-2.5",
          "px-5 py-4"
        )}
      >
        {/* Title + Status */}
        <div className="flex items-center gap-2.5">
          <h2
            data-component="ApprovalCenter/DetailPanel/TaskInfo/TitleText"
            className="text-[22px] leading-[32px] font-semibold text-[var(--ant-basic-8)]"
          >
            审批任务名称
          </h2>
          <Badge
            data-component="ApprovalCenter/DetailPanel/TaskInfo/StatusTag"
            variant="outline"
            className={cn(
              "px-1.5 py-0.5 text-xs font-medium rounded-[4px]",
              "bg-[var(--sunset-orange-1)] border-[var(--sunset-orange-3)] text-[var(--ant-warning-6)]"
            )}
          >
            待审批
          </Badge>
        </div>

        {/* Meta Row */}
        <div
          data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow"
          className="flex items-center gap-2.5 flex-wrap"
        >
          {/* Submitter Info */}
          <div
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/SubmitterInfo"
            className="flex items-center gap-1"
          >
            <UserAvatar
              userInfo={{ realName: "张三" }}
              size={20}
            />
            <span className="text-sm text-[var(--ant-basic-6)]">张三</span>
          </div>

          <Separator orientation="vertical" className="h-4 bg-[var(--ant-basic-3)]" />

          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/DepartmentName"
            className="text-sm text-[var(--ant-basic-5)]"
          >
            部门名称
          </span>

          <Separator orientation="vertical" className="h-4 bg-[var(--ant-basic-3)]" />

          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/TargetLocation"
            className="text-sm text-[var(--ant-basic-5)]"
          >
            目标位置: 全部素材
          </span>

          <Separator orientation="vertical" className="h-4 bg-[var(--ant-basic-3)]" />

          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/MetaRow/SubmitTime"
            className="text-sm text-[var(--ant-basic-5)]"
          >
            提交时间: 2025-04-29 16:53
          </span>
        </div>

        {/* Submitter Note */}
        <div
          data-component="ApprovalCenter/DetailPanel/TaskInfo/SubmitterNote"
          className={cn(
            "flex items-center gap-2.5",
            "p-2.5 rounded-[8px] bg-[var(--ant-basic-1)]"
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--ant-primary-1)]">
            <MessageSquare size={14} className="text-[var(--ant-primary-6)]" />
          </div>
          <span
            data-component="ApprovalCenter/DetailPanel/TaskInfo/SubmitterNote/NoteText"
            className="text-sm text-[var(--ant-basic-10)]"
          >
            留言：这里是提交审批者的留言，如果用户填写了的话，没填写则不显示这个板块~
          </span>
        </div>
      </div>

      {/* Content Tabs */}
      <div
        data-component="ApprovalCenter/DetailPanel/ContentTabs"
        className="flex flex-col flex-1 min-h-0"
      >
        {/* Tab Bar */}
        <div
          data-component="ApprovalCenter/DetailPanel/ContentTabs/TabBar"
          className="border-b border-[var(--ant-basic-3)]"
        >
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="bg-transparent h-10 px-5">
              <TabsTrigger
                value="assets"
                className="text-sm data-[state=active]:text-[var(--ant-primary-6)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--ant-primary-6)] rounded-none"
              >
                素材清单
              </TabsTrigger>
              <TabsTrigger
                value="records"
                className="text-sm data-[state=active]:text-[var(--ant-primary-6)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--ant-primary-6)] rounded-none"
              >
                审批记录
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="text-sm data-[state=active]:text-[var(--ant-primary-6)] data-[state=active]:border-b-2 data-[state=active]:border-[var(--ant-primary-6)] rounded-none"
              >
                评论
              </TabsTrigger>
            </TabsList>

            {/* Asset Section */}
            <div
              data-component="ApprovalCenter/DetailPanel/AssetSection"
              value="assets"
              className="flex flex-col gap-3 p-5"
            >
              {/* Filter Row */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/FilterRow"
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--ant-basic-8)]">共 3 项</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <Filter size={14} />
                    <span>筛选</span>
                  </Button>
                </div>
              </div>

              {/* SubHeader */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/SubHeader"
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--ant-basic-5)]">分组方式</span>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-sm">
                    无
                    <ChevronDown size={14} />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <LayoutGrid size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <List size={16} />
                  </Button>
                </div>
              </div>

              {/* Asset Table */}
              <div
                data-component="ApprovalCenter/DetailPanel/AssetSection/AssetTable"
                className="rounded-[8px] border border-[var(--ant-basic-3)]"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-[var(--ant-basic-3)]">
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">素材</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">类型</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">大小</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">创建者</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">创建时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetData.map((asset) => (
                      <TableRow key={asset.id} className="border-[var(--ant-basic-3)]">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-[var(--ant-basic-1)] flex items-center justify-center">
                              <AssetThumbnail
                                asset={{ extension: asset.type === "image" ? "jpg" : "fig" }}
                                maxWidth={20}
                                maxHeight={20}
                              />
                            </div>
                            <span className="text-sm text-[var(--ant-basic-8)]">{asset.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{asset.type}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{asset.size}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{asset.creator}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{asset.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 p-4 border-t border-[var(--ant-basic-3)]">
                  <Button variant="outline" size="sm" disabled>上一页</Button>
                  <span className="text-sm text-[var(--ant-basic-5)]">1 / 1</span>
                  <Button variant="outline" size="sm" disabled>下一页</Button>
                </div>
              </div>
            </div>

            {/* Records Section */}
            <div
              data-component="ApprovalCenter/DetailPanel/RecordsSection"
              value="records"
              className="flex flex-col gap-3 p-5"
            >
              <h3 className="text-base font-semibold text-[var(--ant-basic-8)]">审批记录</h3>
              <div className="rounded-[8px] border border-[var(--ant-basic-3)]">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-[var(--ant-basic-3)]">
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">操作</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">操作人</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">时间</TableHead>
                      <TableHead className="text-sm font-medium text-[var(--ant-basic-8)]">备注</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recordData.map((record) => (
                      <TableRow key={record.id} className="border-[var(--ant-basic-3)]">
                        <TableCell className="text-sm text-[var(--ant-basic-8)]">{record.action}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{record.operator}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{record.time}</TableCell>
                        <TableCell className="text-sm text-[var(--ant-basic-5)]">{record.comment}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Comment Section */}
      <div
        data-component="ApprovalCenter/DetailPanel/CommentSection"
        className={cn(
          "flex flex-col gap-3",
          "px-5 pt-4 pb-14 border-t border-[var(--ant-basic-3)]"
        )}
      >
        <h3 className="text-base font-semibold text-[var(--ant-basic-8)]">评论</h3>
        <div
          data-component="ApprovalCenter/DetailPanel/CommentSection/CommentInput"
          className="relative"
        >
          <Input
            data-component="ApprovalCenter/DetailPanel/CommentSection/CommentInput/InputField"
            placeholder="整体评论，可@相关成员"
            className="h-12 pr-20 rounded-[8px]"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7">取消</Button>
            <Button variant="default" size="sm" className="h-7">发送</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
