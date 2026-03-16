"use client";

import { useTranslations } from "next-intl";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { SortableList } from "./SortableList";
import { SortableList as ISortableList, SortableCard, SortableDndOptions } from "./types";
import { createDndId, getActiveElements } from "./utils";
import type { ExplorerItem } from "@/Explorer/types";
import { useProjectSpaceContext } from "@/app/project/spaces/[token]/contexts/ProjectSpaceContext";
import { dispatchMuseDAMClientAction, registerUploadCompleteCallback, unregisterUploadCompleteCallback, type UploadCompleteCallback } from "@/embed/message";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { Spin } from "../ui/spin";
interface SortableBoardProps<TCard extends SortableCard, TList extends ISortableList> {
  lists: (TList & {
    cards: TCard[];
  })[];
  renderCard: (card: TCard, isDragOverlay?: boolean) => React.ReactNode;
  renderList?: (list: TList, isDragOverlay?: boolean) => React.ReactNode;
  renderHeader?: (list: ISortableList & {
    cards: SortableCard[];
  }, dragHandleProps?: Record<string, unknown>) => React.ReactNode;
  renderEmptyList?: (list: ISortableList & {
    cards: SortableCard[];
  }, isOver?: boolean) => React.ReactNode;
  renderAddCardButton?: (list: ISortableList & {
    cards: SortableCard[];
  }, onAdd: () => void) => React.ReactNode;
  onDragStart?: (event: DragStartEvent, card?: TCard, list?: TList) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onAddCard?: (listId: string) => void;
  onDropFromExplorer?: (listId: string, items: Array<{
    type: "folder" | "material";
    folderId?: number;
    assetObjectId?: number;
    title: string;
    path?: string;
    url?: string;
  }>) => void;
  onAddList?: () => Promise<void> | void;
  options?: SortableDndOptions;
  className?: string;
  loading?: boolean;
  cardDragDisabled?: boolean;
  enableFileUpload?: boolean; // 是否允许文件拖拽上传
}
export function SortableBoard<TCard extends SortableCard, TList extends ISortableList>({
  lists,
  renderCard,
  renderList,
  renderHeader,
  renderEmptyList,
  renderAddCardButton,
  onDragStart,
  onDragOver,
  onDragEnd,
  onAddCard,
  onDropFromExplorer,
  onAddList,
  options = {},
  className = "",
  loading = false,
  cardDragDisabled = false,
  enableFileUpload = true
}: SortableBoardProps<TCard, TList>) {
  const tProject = useTranslations("project");
  const [activeCard, setActiveCard] = useState<TCard | null>(null);
  const [activeList, setActiveList] = useState<TList | null>(null);
  const [creatingList, setCreatingList] = useState(false);
  // 优先从 ProjectSpaceContext 获取（项目看板场景）
  const projectSpaceContext = useProjectSpaceContext();
  // 获取创建卡片的回调（项目看板场景）
  const onCreateCard = projectSpaceContext?.onCreateCard;
  const refreshTaskBoard = projectSpaceContext?.onRefreshTaskBoard;
  const {
    enableListSorting = true,
    activationConstraint = {
      distance: 10
    }
  } = options;

  // Sensors configuration
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: activationConstraint.distance ? {
      distance: activationConstraint.distance
    } : undefined
  }), useSensor(MouseSensor, {
    activationConstraint: activationConstraint.distance ? {
      distance: activationConstraint.distance
    } : undefined
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: activationConstraint.delay || 250,
      tolerance: activationConstraint.tolerance || 5
    }
  }));
  const handleAddList = useCallback(async () => {
    if (!onAddList || creatingList) {
      return;
    }
    setCreatingList(true);
    try {
      await onAddList();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("[SortableBoard] 新增看板失败", error);
    } finally {
      setCreatingList(false);
    }
  }, [onAddList, creatingList]);
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const {
      activeCard,
      activeList
    } = getActiveElements<TCard, TList>(event.active.id as string, lists);
    setActiveCard(activeCard || null);
    setActiveList(activeList || null);
    onDragStart?.(event, activeCard, activeList);
  }, [lists, onDragStart]);
  const handleDragOver = useCallback((event: DragOverEvent) => {
    onDragOver?.(event);
  }, [onDragOver]);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const {
      active,
      over
    } = event;
    // 优先处理从资源库拖拽过来的文件夹/素材
    if (over && onDropFromExplorer) {
      const activeData = active.data.current;
      if (activeData && typeof activeData === "object") {
        // 检查是否是 ExplorerItem 类型（从资源库拖拽过来的）
        const explorerItem = activeData as ExplorerItem;
        // console.log("[SortableBoard] 检查 ExplorerItem:", explorerItem);
        if (explorerItem.type === "FilePathDir" || explorerItem.type === "FilePathWithAssetObject") {
          // 检查是否拖拽到了某个 list 的 droppable 区域
          const overId = over.id as string;
          const targetList = lists.find(list => {
            const droppableId = createDndId.droppable(list.id);
            return overId === droppableId || overId === createDndId.list(list.id);
          });

          // console.log("[SortableBoard] 目标列表:", targetList?.id, "overId:", overId);

          if (targetList) {
            // 构建拖拽项数据
            const items: Array<{
              type: "folder" | "material";
              folderId?: number;
              assetObjectId?: number;
              title: string;
              path?: string;
              url?: string;
            }> = [];
            if (explorerItem.type === "FilePathDir") {
              items.push({
                type: "folder",
                folderId: explorerItem.filePath.id,
                title: explorerItem.filePath.name,
                path: explorerItem.filePath.materializedPath + explorerItem.filePath.name
              });
            } else if (explorerItem.type === "FilePathWithAssetObject") {
              items.push({
                type: "material",
                assetObjectId: explorerItem.assetObject.id,
                title: explorerItem.filePath.name,
                path: explorerItem.filePath.materializedPath + explorerItem.filePath.name,
                url: explorerItem.assetObject.objectUrl || undefined
              });
            }
            if (items.length > 0) {
              // console.log("[SortableBoard] 检测到从资源库拖拽:", items);
              onDropFromExplorer(targetList.id, items);
              // 阻止继续处理其他拖拽逻辑
              setActiveCard(null);
              setActiveList(null);
              return;
            }
          }
        }
      }
    }

    // 处理常规的卡片拖拽逻辑
    setActiveCard(null);
    setActiveList(null);
    onDragEnd?.(event);
  }, [onDragEnd, onDropFromExplorer, lists]);

  // 注册上传完成回调
  useEffect(() => {
    const callbackId = "sortable-board";
    const callback: UploadCompleteCallback = {
      onCreateCard: onCreateCard ? async params => {
        await onCreateCard(params);
      } : undefined,
      onRefresh: refreshTaskBoard ? async () => {
        await refreshTaskBoard();
      } : undefined
    };
    registerUploadCompleteCallback(callbackId, callback);
    return () => {
      unregisterUploadCompleteCallback(callbackId);
    };
  }, [onCreateCard, refreshTaskBoard]);
  if (loading) {
    return <div className="min-h-screen w-full flex items-center justify-center">
      <Spin variant="dots" />
    </div>;
  }
  const listRender = () => {
    return <div className="flex items-start gap-4 overflow-x-auto pb-6">
      {lists.map(list => <SortableList key={list.id} list={list} renderCard={renderCard} renderHeader={renderHeader} renderEmptyList={renderEmptyList} renderAddButton={renderAddCardButton} onAddCard={onAddCard} onDropFromExplorer={onDropFromExplorer} enableListSorting={enableListSorting} cardDragDisabled={cardDragDisabled} enableFileUpload={enableFileUpload} />)}
      <Button className="bg-[#F2F3F6] dark:bg-card text-current dark:text-gray-200 px-4 h-[48px] w-80 justify-start" variant="ghost" onClick={handleAddList} disabled={!onAddList || creatingList}>
        {creatingList ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}{tProject("SortableBoard.addBoard")}</Button>
    </div>;
  };
  return <DndContext sensors={sensors} collisionDetection={rectIntersection} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
    <div className={className}>
      {enableListSorting ? <SortableContext items={lists.map(list => createDndId.list(list.id))} strategy={horizontalListSortingStrategy}>
        {listRender()}
      </SortableContext> : listRender()}
    </div>

    {/* Drag Overlay */}
    <DragOverlay dropAnimation={null}>
      {activeCard && renderCard(activeCard, true)}
      {activeList && renderList && renderList(activeList, true)}
    </DragOverlay>
  </DndContext>;
}