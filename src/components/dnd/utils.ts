/**
 * 通用拖拽工具函数
 * 基于 board > list > card 的 Trello 风格架构
 * 处理拖拽 ID 生成、解析和状态变更逻辑
 */

import { arrayMove } from "@dnd-kit/sortable";
import { SortableCard, SortableDndMoveResult, SortableList } from "./types";

// DND ID 前缀常量
export const DND_PREFIXES = {
  CARD: "dnd-card-",
  LIST: "dnd-list-",
  DROPPABLE: "dnd-droppable-",
} as const;

// DND 类型常量
export const DND_TYPES = {
  CARD: "card",
  LIST: "list",
  DROPPABLE: "droppable",
} as const;

// ID 生成工具函数
export const createDndId = {
  card: (id: string) => `${DND_PREFIXES.CARD}${id}`,
  list: (id: string) => `${DND_PREFIXES.LIST}${id}`,
  droppable: (id: string) => `${DND_PREFIXES.DROPPABLE}${id}`,
} as const;

// ID 解析工具函数
export const parseDndId = {
  card: (id: string) => id.replace(DND_PREFIXES.CARD, ""),
  list: (id: string) => id.replace(DND_PREFIXES.LIST, ""),
  droppable: (id: string) => id.replace(DND_PREFIXES.DROPPABLE, ""),
} as const;

// ID 类型检查工具函数
export const isDndId = {
  card: (id: string) => id.startsWith(DND_PREFIXES.CARD),
  list: (id: string) => id.startsWith(DND_PREFIXES.LIST),
  droppable: (id: string) => id.startsWith(DND_PREFIXES.DROPPABLE),
} as const;

/**
 * 处理 card 在同一 list 内的重新排序
 */
export function handleCardReorder<TCard extends SortableCard>(
  cards: TCard[],
  activeCardId: string,
  overCardId: string,
): TCard[] {
  const activeIndex = cards.findIndex((card) => card.id === activeCardId);
  const overIndex = cards.findIndex((card) => card.id === overCardId);

  if (activeIndex === -1 || overIndex === -1) return cards;

  return arrayMove(cards, activeIndex, overIndex);
}

/**
 * 处理 card 跨 list 移动
 */
export function handleCardMove<TList extends SortableList>(
  lists: TList[],
  activeCardId: string,
  sourceListId: string,
  targetListId: string,
  targetIndex?: number,
): TList[] {
  const sourceList = lists.find((l) => l.id === sourceListId);
  const targetList = lists.find((l) => l.id === targetListId);

  if (!sourceList || !targetList) return lists;

  const activeCard = sourceList.cards.find((card) => card.id === activeCardId);
  if (!activeCard) return lists;

  return lists.map((list) => {
    if (list.id === sourceListId) {
      // 从源 list 移除 card
      return {
        ...list,
        cards: list.cards.filter((card) => card.id !== activeCardId),
      };
    } else if (list.id === targetListId) {
      // 添加到目标 list
      const newCards = [...list.cards];
      const insertIndex = targetIndex !== undefined ? targetIndex : newCards.length;
      newCards.splice(insertIndex, 0, activeCard);
      return {
        ...list,
        cards: newCards,
      };
    }
    return list;
  });
}

/**
 * 处理 list 重新排序
 */
export function handleListReorder<TList extends SortableList>(
  lists: TList[],
  activeListId: string,
  overListId: string,
): TList[] {
  const activeIndex = lists.findIndex((l) => l.id === activeListId);
  const overIndex = lists.findIndex((l) => l.id === overListId);

  if (activeIndex === -1 || overIndex === -1) return lists;

  return arrayMove(lists, activeIndex, overIndex);
}

/**
 * 从拖拽事件中提取移动结果
 */
export function extractMoveResult<TCard extends SortableCard>(
  event: {
    active: { id: string | number; data: { current?: Record<string, unknown> } };
    over: { id: string | number; data: { current?: Record<string, unknown> } } | null;
  },
  lists: SortableList[],
): SortableDndMoveResult<TCard> | null {
  const { active, over } = event;
  if (!over) return null;

  const activeId = active.id as string;
  const overId = over.id as string;

  const activeData = active.data.current;
  const overData = over.data.current;

  // Card 重新排序或移动
  if (isDndId.card(activeId)) {
    const activeCardId = parseDndId.card(activeId);

    // 从 SortableContext 中获取 containerId
    const activeListId = activeData?.sortable
      ? ((activeData.sortable as Record<string, unknown>).containerId as string)
      : null;

    let overListId: string | null = null;

    if (isDndId.card(overId)) {
      // 拖拽到另一个 card 上
      overListId = overData?.sortable
        ? ((overData.sortable as Record<string, unknown>).containerId as string)
        : null;
    } else if (isDndId.droppable(overId)) {
      // 拖拽到 list 的可放置区域
      overListId = parseDndId.droppable(overId);
    } else if (isDndId.list(overId)) {
      // 拖拽到 list 本身（可能是空列表）
      overListId = parseDndId.list(overId);
    }

    if (!activeListId || !overListId) {
      return null;
    }

    const sourceList = lists.find((l) => l.id === activeListId);
    if (!sourceList) return null;

    const activeCard = sourceList.cards.find((card) => card.id === activeCardId);
    if (!activeCard) return null;

    if (activeListId === overListId) {
      // 同 list 内重新排序
      if (isDndId.card(overId)) {
        const overCardId = parseDndId.card(overId);
        const sourceIndex = sourceList.cards.findIndex((card) => card.id === activeCardId);
        const targetIndex = sourceList.cards.findIndex((card) => card.id === overCardId);

        return {
          type: "card-reorder",
          sourceListId: activeListId,
          card: activeCard as TCard,
          sourceIndex,
          targetIndex,
        };
      }
    } else {
      // 跨 list 移动
      return {
        type: "card-move",
        sourceListId: activeListId,
        targetListId: overListId,
        card: activeCard as TCard,
      };
    }
  }

  // List 重新排序
  if (isDndId.list(activeId) && isDndId.list(overId)) {
    const activeListId = parseDndId.list(activeId);
    const overListId = parseDndId.list(overId);

    return {
      type: "list-reorder",
      sourceListId: activeListId,
      targetListId: overListId,
    };
  }

  return null;
}

/**
 * 获取拖拽中的 card 和 list
 */
export function getActiveElements<TCard extends SortableCard, TList extends SortableList>(
  activeId: string,
  lists: TList[],
): { activeCard?: TCard; activeList?: TList } {
  if (isDndId.card(activeId)) {
    const cardId = parseDndId.card(activeId);
    for (const list of lists) {
      const card = list.cards.find((card) => card.id === cardId);
      if (card) {
        return { activeCard: card as TCard, activeList: list };
      }
    }
  } else if (isDndId.list(activeId)) {
    const listId = parseDndId.list(activeId);
    const list = lists.find((l) => l.id === listId);
    if (list) {
      return { activeList: list };
    }
  }

  return {};
}
