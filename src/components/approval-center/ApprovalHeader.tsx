"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "./icons";

/**
 * ApprovalHeader
 * Figma: ApprovalCenter/Header
 * 审批中心头部组件
 */
export function ApprovalHeader() {
  return (
    <header
      data-component="ApprovalCenter/Header"
      className="flex flex-col self-stretch p-5"
    >
      <div
        data-component="ApprovalCenter/Header/Inner"
        className="flex items-center gap-3 self-stretch"
      >
        {/* Breadcrumb - 面包屑 */}
        <div
          data-component="ApprovalCenter/Header/Breadcrumb"
          className="flex flex-1 items-center gap-1"
        >
          <h1
            data-component="ApprovalCenter/Header/Breadcrumb/CurrentLevel"
            className="text-[22px] leading-[32px] font-semibold text-foreground"
          >
            审批模板
          </h1>
        </div>

        {/* ActionBar - 操作栏 */}
        <div
          data-component="ApprovalCenter/Header/ActionBar"
          className="flex items-center gap-3"
        >
          <div
            data-component="ApprovalCenter/Header/ActionBar/Container"
            className="flex items-center gap-1.5"
          >
            {/* CreateButton - 新建模板按钮 */}
            <Button
              data-component="ApprovalCenter/Header/ActionBar/CreateButton"
              className="flex h-9 items-center justify-center gap-1 rounded-[6px] bg-primary px-3 text-[14px] leading-[22px] font-normal text-primary-foreground hover:bg-[var(--ant-primary-5)]"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>新建模板</span>
            </Button>
          </div>
        </div>

        {/* UserProfile - 用户头像 */}
        <div
          data-component="ApprovalCenter/Header/UserProfile"
          className="h-9 w-9 rounded-full bg-primary shadow-md"
        />
      </div>
    </header>
  );
}
