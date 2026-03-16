/**
 * 通用拖拽组件导出
 * 基于 board > list > card 的 Trello 风格架构
 */

// 组件
export { SortableBoard } from "./SortableBoard";
export { SortableCard } from "./SortableCard";
export { SortableList } from "./SortableList";

// 类型
export type {
  SortableBoard as ISortableBoard,
  SortableCard as ISortableCard,
  SortableList as ISortableList,
  SortableBoardProps,
  SortableCardProps,
  SortableDndEventHandlers,
  SortableDndMoveResult,
  SortableDndOptions,
  SortableDndRenderFunctions,
  SortableListProps,
} from "./types";

// 工具函数
export {
  DND_PREFIXES,
  DND_TYPES,
  createDndId,
  extractMoveResult,
  getActiveElements,
  handleCardMove,
  handleCardReorder,
  handleListReorder,
  isDndId,
  parseDndId,
} from "./utils";
