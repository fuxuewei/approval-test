"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

interface ApprovalHeaderProps {
  onCreateClick?: () => void;
}

/**
 * ApprovalHeader
 * Figma: ApprovalCenter/Header
 * 审批中心头部组件
 */
export function ApprovalHeader({ onCreateClick }: ApprovalHeaderProps) {
  return (
    <header
      data-component="ApprovalCenter/Header"
      className="flex flex-col self-stretch"
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
            className="text-xl leading-7 font-semibold text-foreground"
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
              className="flex h-9 items-center justify-center gap-1 rounded-md bg-primary px-3 text-sm leading-[22px] font-normal text-primary-foreground hover:bg-primary-5"
              onClick={onCreateClick}
            >
              <Icon name="Plus" size={14} />
              <span>新建模板</span>
            </Button>
          </div>
        </div>

        {/* UserProfile - 用户头像 */}
        {/* <div
          data-component="ApprovalCenter/Header/UserProfile"
          className="relative flex items-center"
        >
          <div className="h-8 w-[90px] rounded-full bg-gradient-to-r from-[#E6F8FF] via-[#CDF5FE] via-[#DFE1FF] via-[#E8E5FF] via-[#F0F0FF] to-[#F9F9FF] shadow-sm" />
          <div className="absolute left-3 top-1/2 size-10 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-2 to-primary shadow-md">
            <Icon name="UserOutlined" size={20} className="m-2.5 text-primary-foreground" />
          </div>
        </div> */}
      </div>
    </header>
  );
}
