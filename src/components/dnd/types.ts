/**
 * 通用拖拽组件类型定义
 * 基于 board > list > card 的 Trello 风格架构
 * 抽象业务无关的拖拽功能类型
 */

import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { ReactNode } from "react";

// 通用 Card 接口
export interface SortableCard {
  id: string;
  [key: string]: unknown;
}

// 通用 List 接口
export interface SortableList {
  id: string;
  title: string;
  cards: SortableCard[];
  [key: string]: unknown;
}

// 通用 Board 接口
export interface SortableBoard {
  id: string;
  lists: SortableList[];
  [key: string]: unknown;
}

// 拖拽事件处理器类型
export interface SortableDndEventHandlers<TCard extends SortableCard, TList extends SortableList> {
  onDragStart?: (event: DragStartEvent, card?: TCard, list?: TList) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
}

// 拖拽结果数据类型
export interface SortableDndMoveResult<TCard extends SortableCard> {
  type: "card-reorder" | "card-move" | "list-reorder";
  sourceListId?: string;
  targetListId?: string;
  card?: TCard;
  sourceIndex?: number;
  targetIndex?: number;
}

// 渲染函数类型
export interface SortableDndRenderFunctions<
  TCard extends SortableCard,
  TList extends SortableList,
> {
  renderCard: (card: TCard, isDragOverlay?: boolean) => ReactNode;
  renderList: (list: TList, isDragOverlay?: boolean) => ReactNode;
  renderEmptyList?: (list: TList, isOver?: boolean) => ReactNode;
  renderAddCardButton?: (list: TList, onAdd: () => void) => ReactNode;
}

// 拖拽配置选项
export interface SortableDndOptions {
  // 激活约束
  activationConstraint?: {
    distance?: number;
    delay?: number;
    tolerance?: number;
  };

  // 是否支持 list 排序
  enableListSorting?: boolean;

  // 是否支持 card 跨 list 移动
  enableCrossListMove?: boolean;

  // List 方向 (水平排列)
  listDirection?: "horizontal";

  // Card 方向 (垂直排列)
  cardDirection?: "vertical";
}

// 组件 Props 类型
export interface SortableBoardProps<TCard extends SortableCard, TList extends SortableList> {
  lists: TList[];
  renderFunctions: SortableDndRenderFunctions<TCard, TList>;
  eventHandlers: SortableDndEventHandlers<TCard, TList>;
  options?: SortableDndOptions;
  className?: string;
  loading?: boolean;
}

export interface SortableListProps<TCard extends SortableCard, TList extends SortableList> {
  list: TList;
  renderCard: (card: TCard, isDragOverlay?: boolean) => ReactNode;
  renderEmptyList?: (list: TList, isOver?: boolean) => ReactNode;
  renderAddCardButton?: (list: TList, onAdd: () => void) => ReactNode;
  onAddCard?: (listId: string) => void;
  isDragOverlay?: boolean;
  className?: string;
}

export interface SortableCardProps<TCard extends SortableCard> {
  card: TCard;
  children: ReactNode;
  isDragOverlay?: boolean;
  className?: string;
}
