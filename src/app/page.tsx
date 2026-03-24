"use client";

import { useState } from "react";
import {
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  Search,
  Download,
  Plus,
  Package,
  ArrowUpDown,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Icon } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/* Mode B 布局：侧边栏通高，与内容区有明显分割 */

export default function HomePage() {
  const [selectAll, setSelectAll] = useState<boolean | "indeterminate">(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const rowCount = 3;

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    setSelectAll(checked);
    setSelectedRows(
      checked === true ? new Set([0, 1, 2]) : new Set()
    );
  };

  const handleRowSelect = (i: number, checked: boolean) => {
    const next = new Set(selectedRows);
    if (checked) next.add(i);
    else next.delete(i);
    setSelectedRows(next);
    setSelectAll(
      next.size === 0 ? false : next.size === rowCount ? true : "indeterminate"
    );
  };

  return (
    <main className="h-screen flex overflow-hidden bg-page text-text-primary font-sans">
      {/* Icon Sidebar - 56px */}
      <aside className="flex flex-col items-center gap-6 py-4 w-[56px] shrink-0 h-full bg-surface border-r border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 text-white [&_svg]:w-5 [&_svg]:h-5">
          <Icon name="logo" />
        </div>
        <nav className="flex flex-col gap-8">
          <button type="button" className="flex items-center justify-center w-10 h-10 rounded-lg text-text-primary hover:bg-primary-100 [&_svg]:w-5 [&_svg]:h-5">
            <LayoutGrid />
          </button>
        </nav>
        <div className="flex flex-col gap-8 flex-1 justify-end">
          <button type="button" className="flex items-center justify-center w-10 h-10 rounded-lg text-text-primary [&_svg]:w-5 [&_svg]:h-5">
            <LayoutGrid />
          </button>
          <button type="button" className="flex items-center justify-center w-10 h-10 rounded-lg text-text-primary [&_svg]:w-5 [&_svg]:h-5">
            <LayoutGrid />
          </button>
          <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-primary-600 text-white text-12 font-semibold">
            M
          </div>
        </div>
      </aside>

      {/* Nav Sidebar - 240px */}
      <aside className="flex flex-col w-60 shrink-0 h-full min-h-0 bg-surface border-r border-border overflow-y-auto">
        <div className="flex flex-col gap-6 py-4 px-5">
          <h2 className="text-14 font-semibold text-text-primary px-5">
            AI 自动打标引擎
          </h2>
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>控制面板</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>AI 打标审核</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>AI 匹配测试</span>
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-8 py-8 px-5">
          <h3 className="text-12 font-semibold text-text-secondary tracking-wide px-5">
            特征库管理
          </h3>
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>人物特征库</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 font-medium text-primary-600 bg-primary-100"
            >
              <LayoutGrid />
              <span>商品特征库</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>品牌特征库</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>场景特征库</span>
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-8 py-8 px-5">
          <h3 className="text-12 font-semibold text-text-secondary tracking-wide px-5">
            系统设置
          </h3>
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>打标设置</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-button text-14 text-text-primary hover:bg-primary-100"
            >
              <LayoutGrid />
              <span>成员设置</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex justify-end items-center h-12 px-8 shrink-0 bg-page">
          <div className="flex items-center gap-3">
            <span className="text-14 text-text-primary">Admin</span>
            <div className="flex items-center justify-center w-7 h-7 rounded-2xl bg-primary-600 text-white text-12 font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex flex-col gap-6 p-8 flex-1 min-h-0 overflow-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4">
            <span className="text-14 text-text-secondary">特征库管理</span>
            <ChevronRight className="w-3.5 h-3.5 text-text-secondary shrink-0" />
            <span className="text-14 font-medium text-text-primary">
              商品特征库
            </span>
          </div>

          {/* Page Header */}
          <div className="flex justify-between items-start gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-card bg-warning-100 text-warning-600 shrink-0 [&_svg]:w-6 [&_svg]:h-6">
                <Package />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-22 font-semibold text-text-primary leading-[var(--line-height-heading-tight)]">
                  商品特征库
                </h1>
                <p className="text-14 text-text-secondary leading-[1.5] max-w-lg">
                  关联商品库中的商品，上传视觉参考图训练 AI 识别能力，实现素材中的商品自动识别与打标
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 px-6 border-border bg-surface text-14 font-medium text-text-primary hover:bg-primary-100 [&_svg]:w-4 [&_svg]:h-4"
              >
                <Download />
                导出
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="h-9 px-6 bg-primary-600 text-white text-14 font-medium hover:bg-primary-600/90 [&_svg]:w-4 [&_svg]:h-4"
              >
                <Plus />
                添加商品特征
              </Button>
            </div>
          </div>

          {/* Stat Pills */}
          <div className="flex gap-6">
            {[
              { value: "86", label: "已关联商品", icon: "primary" },
              { value: "72", label: "训练完成", icon: "success" },
              { value: "96.2%", label: "平均置信度", icon: "primary" },
              { value: "8,430", label: "累计命中素材", icon: "primary" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-6 py-4 rounded-card border border-border shrink-0"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-card shrink-0 [&_svg]:w-5 [&_svg]:h-5 ${item.icon === "success"
                      ? "bg-success-100 text-success-600"
                      : "bg-primary-100 text-primary-600"
                    }`}
                >
                  <LayoutGrid />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-20 font-semibold text-text-primary leading-tight">
                    {item.value}
                  </span>
                  <span className="text-13 text-text-secondary">{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 border-b border-border">
            {[
              { label: "全部", count: "86", active: true },
              { label: "已完成", count: "72", active: false },
              { label: "训练中", count: "8", active: false },
              { label: "待上传", count: "4", active: false },
              { label: "失败", count: "2", active: false },
            ].map((tab) => (
              <button
                key={tab.label}
                type="button"
                className={`flex items-center gap-8 px-5 py-3 text-14 font-medium border-b-2 translate-y-px ${tab.active
                    ? "text-primary-600 border-primary-600"
                    : "text-text-secondary border-transparent hover:text-text-primary"
                  }`}
              >
                {tab.label}
                <span
                  className={`inline-flex items-center justify-center px-2 py-1 rounded-card text-12 ${tab.active
                      ? "bg-primary-100 text-primary-600"
                      : "bg-page text-text-secondary"
                    }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-8 px-4 py-2 rounded-button bg-surface border border-border w-64 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 [&_svg]:text-text-secondary">
                <Search />
                <span className="text-14 text-text-secondary">
                  搜索商品名称…
                </span>
              </div>
              <div className="flex items-center gap-8 px-4 py-2 rounded-button bg-surface border border-border text-14 text-text-primary [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:shrink-0">
                <span>关联标签</span>
                <ChevronDown />
              </div>
              <div className="flex items-center gap-8 px-4 py-2 rounded-button bg-surface border border-border text-14 text-text-primary [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:shrink-0">
                <span>置信度</span>
                <ChevronDown />
              </div>
            </div>
            <span className="text-14 text-text-secondary">共 86 项</span>
          </div>

          {/* Table */}
          <div className="flex flex-col rounded-card bg-surface border border-border shadow-[0_5px_10px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="flex items-center gap-6 px-6 py-3 bg-primary-100 rounded-t-card">
              <div className="w-8 shrink-0 flex items-center justify-center">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  className="size-4 rounded-tag border-border data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 data-[state=indeterminate]:bg-primary-600 data-[state=indeterminate]:border-primary-600 text-white"
                />
              </div>
              <div className="w-[200px] shrink-0 text-13 font-semibold text-text-primary">
                关联商品
              </div>
              <div className="w-[110px] shrink-0 text-13 font-semibold text-text-primary">
                参考图
              </div>
              <div className="w-[120px] shrink-0 text-13 font-semibold text-text-primary">
                训练状态
              </div>
              <div className="flex items-center gap-4 w-[130px] shrink-0 text-13 font-semibold text-text-primary [&_svg]:w-3 [&_svg]:h-3">
                置信度
                <ArrowUpDown />
              </div>
              <div className="flex items-center gap-4 w-[110px] shrink-0 text-13 font-semibold text-text-primary [&_svg]:w-3 [&_svg]:h-3">
                命中素材
                <ArrowUpDown />
              </div>
              <div className="flex-1 min-w-0 text-13 font-semibold text-text-primary">
                关联标签
              </div>
              <div className="w-[100px] shrink-0 text-right text-13 font-semibold text-text-primary">
                操作
              </div>
            </div>
            {[
              {
                name: "极光水精华 50ml",
                refImgs: "6张",
                status: "已完成",
                confidence: "97.2%",
                hits: "1,240",
                tags: ["精华液", "新品"],
                thumbBg: "bg-danger-100",
              },
              {
                name: "丝绒唇釉 #208",
                refImgs: "5张",
                status: "已完成",
                confidence: "95.1%",
                hits: "982",
                tags: ["唇釉", "明星单品"],
                thumbBg: "bg-danger-100",
              },
              {
                name: "气泡果茶 · 蜜桃味",
                refImgs: "4张",
                status: "已完成",
                confidence: "82.4%",
                hits: "756",
                tags: ["饮料", "夏季主推"],
                thumbBg: "bg-success-100",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-6 py-3 border-t border-border min-h-[48px]"
              >
                <div className="w-8 shrink-0 flex items-center justify-center">
                  <Checkbox
                    checked={selectedRows.has(i)}
                    onCheckedChange={(checked) =>
                      handleRowSelect(i, checked === true)
                    }
                    className="size-4 rounded-tag border-border data-[state=checked]:bg-primary-600 data-[state=checked]:border-primary-600 text-white"
                  />
                </div>
                <div className="flex items-center gap-4 w-[200px] shrink-0">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-button shrink-0 ${row.thumbBg} text-text-primary text-22`}
                  >
                    {i === 0 ? "🧴" : i === 1 ? "💄" : "🥤"}
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <span className="text-14 font-medium text-text-primary truncate">
                      {row.name}
                    </span>
                    <a
                      href="#"
                      className="text-14 text-primary-600 hover:underline"
                    >
                      ← 查看商品详情
                    </a>
                  </div>
                </div>
                <div className="w-[110px] shrink-0 flex items-center gap-6">
                  <div className="flex -space-x-2 [&>*]:ring-2 [&>*]:ring-surface">
                    <div className="w-7 h-7 rounded bg-primary-100" />
                    <div className="w-7 h-7 rounded bg-primary-100" />
                    <div className="w-7 h-7 rounded bg-primary-100" />
                  </div>
                  <span className="text-14 text-text-secondary">{row.refImgs}</span>
                </div>
                <div className="w-[120px] shrink-0">
                  <span className="inline-flex items-center gap-4 px-2 py-0.5 rounded-tag bg-success-100 text-success-600 text-13 [&_svg]:w-3 [&_svg]:h-3">
                    <Check />
                    {row.status}
                  </span>
                </div>
                <div className="flex items-center gap-8 w-[130px] shrink-0">
                  <div className="flex-1 h-1.5 rounded-sm bg-border overflow-hidden">
                    <div
                      className="h-full bg-success-600 rounded-sm"
                      style={{
                        width:
                          row.confidence === "97.2%"
                            ? "97%"
                            : row.confidence === "95.1%"
                              ? "95%"
                              : "82%",
                      }}
                    />
                  </div>
                  <span
                    className={`text-14 font-medium shrink-0 ${parseFloat(row.confidence) >= 95
                        ? "text-success-600"
                        : "text-warning-600"
                      }`}
                  >
                    {row.confidence}
                  </span>
                </div>
                <div className="w-[110px] shrink-0 text-14 font-medium text-text-primary">
                  {row.hits}
                </div>
                <div className="flex-1 min-w-0 flex flex-wrap gap-4">
                  {row.tags.map((tag, j) => (
                    <span
                      key={j}
                      className={`inline-flex px-2 py-0.5 rounded-tag text-13 ${j === 0
                          ? "bg-primary-100 text-primary-600"
                          : "bg-warning-100 text-warning-600"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-[100px] shrink-0 flex justify-end text-text-secondary">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="更多操作"
                        className="text-text-secondary hover:bg-primary-100 hover:text-text-primary [&_svg]:w-4 [&_svg]:h-4"
                      >
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="min-w-[9rem] rounded-button border-border bg-surface"
                    >
                      <DropdownMenuItem className="text-14 text-text-primary focus:bg-primary-100 focus:text-text-primary">
                        管理参考图
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-14 text-text-primary focus:bg-primary-100 focus:text-text-primary">
                        查看训练详情
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-14 text-text-primary focus:bg-primary-100 focus:text-text-primary">
                        在素材库中查看命中
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-14 text-text-primary focus:bg-primary-100 focus:text-text-primary">
                        重新训练
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        className="text-14 text-danger-600 focus:bg-danger-100"
                      >
                        移除商品特征
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
