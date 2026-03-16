"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useDroppable, useDndMonitor, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode, useCallback, useContext, useRef, useState } from "react";
import type { ExplorerItem } from "@/Explorer/types";
import { SortableCard } from "./SortableCard";
import { SortableCard as ISortableCard, SortableList as ISortableList } from "./types";
import { createDndId, DND_TYPES } from "./utils";
import { dispatchMuseDAMClientAction } from "@/embed/message";
import { uploadFilesWithFolders, buildMaterializedPath, type UploadPathInfo } from "./uploadUtils";
import { verifyEpubFile } from "@/lib/verifyEpub";
import { getEpubZip, getEpubBySubFiles, traverseFileTree as epubTraverseFileTree, FileWithPath } from "@/lib/epubFile";
// 直接导入 context 以避免在没有 Provider 时抛出错误
import { AssetLibraryContext } from "@/Explorer/hooks/useAssetLibrary";
import { useProjectSpaceContext } from "@/app/project/spaces/[token]/contexts/ProjectSpaceContext";
import { openAssetDetail } from "@/utils/openAssetDetail";
interface SortableListProps<TCard extends ISortableCard> {
  list: ISortableList & {
    cards: TCard[];
  };
  renderCard: (card: TCard, isDragOverlay?: boolean) => ReactNode;
  renderEmptyList?: (list: ISortableList & {
    cards: ISortableCard[];
  }, isOver?: boolean) => ReactNode;
  renderAddButton?: (list: ISortableList & {
    cards: ISortableCard[];
  }, onAdd: () => void, onUploadFiles?: () => void, onUploadFolder?: () => void) => ReactNode;
  renderHeader?: (list: ISortableList & {
    cards: TCard[];
  }, dragHandleProps?: Record<string, unknown>) => ReactNode;
  onAddCard?: (listId: string) => void;
  // 处理从资源库拖拽文件夹/素材到看板的回调
  onDropFromExplorer?: (listId: string, items: Array<{
    type: "folder" | "material";
    folderId?: number;
    assetObjectId?: number;
    title: string;
    path?: string;
    url?: string;
  }>) => void;
  isDragOverlay?: boolean;
  className?: string;
  enableListSorting?: boolean;
  cardDragDisabled?: boolean;
  enableFileUpload?: boolean; // 是否允许文件拖拽上传
}
export function SortableList<TCard extends ISortableCard>({
  list,
  renderCard,
  renderEmptyList,
  renderAddButton,
  renderHeader,
  onAddCard,
  onDropFromExplorer,
  isDragOverlay = false,
  className,
  enableListSorting = true,
  cardDragDisabled = false,
  enableFileUpload = true
}: SortableListProps<TCard>) {
  const tProject = useTranslations("project");
  const {
    attributes: listAttributes,
    listeners: listListeners,
    setNodeRef: setListSortableRef,
    transform: listTransform,
    transition: listTransition,
    isDragging: isListDragging
  } = useSortable({
    id: createDndId.list(list.id),
    data: {
      type: DND_TYPES.LIST,
      list
    },
    disabled: !enableListSorting || isDragOverlay
  });
  // Droppable for cards
  const {
    setNodeRef: setDroppableRef,
    isOver
  } = useDroppable({
    id: createDndId.droppable(list.id),
    data: {
      type: DND_TYPES.DROPPABLE,
      listId: list.id
    }
  });
  const listStyle = enableListSorting ? {
    transform: CSS.Transform.toString(listTransform),
    transition: listTransition,
    opacity: isListDragging ? 0.5 : 1
  } : {};
  const handleAddCard = () => {
    onAddCard?.(list.id);
  };

  // ===== 获取 libraryToken =====
  // 优先从 ProjectSpaceContext 获取（项目看板场景）
  const projectSpaceContext = useProjectSpaceContext();
  // 其次从 AssetLibraryContext 获取（资源库场景）
  const assetLibraryContext = useContext(AssetLibraryContext);

  // libraryToken 应该是 AssetLibrary 的 token 字段值
  // 在项目看板场景中，通过 ProjectSpace -> Team -> AssetLibrary 关联获取
  // 在资源库场景中，直接从 AssetLibraryContext 获取
  const libraryToken = projectSpaceContext?.libraryToken || assetLibraryContext?.libraryToken || null;

  // 获取创建卡片的回调（项目看板场景）
  const onCreateCard = projectSpaceContext?.onCreateCard;
  // 获取当前 list 的 fieldId 和 groupBy（如果是 ProjectSortableList）
  const listFieldId = (list as any).fieldId as number | undefined;
  const listGroupBy = (list as any).groupBy as "status" | "priority" | undefined;

  // ===== 监听从资源库拖拽文件夹/素材到看板 =====
  useDndMonitor({
    onDragEnd: useCallback((event: DragEndEvent) => {
      // 检查是否有 onDropFromExplorer 回调
      if (!onDropFromExplorer) return;
      const {
        active,
        over
      } = event;
      if (!over) return;

      // 检查是否拖拽到了当前 list 的 droppable 区域
      const overId = over.id as string;
      const currentDroppableId = createDndId.droppable(list.id);
      if (overId !== currentDroppableId) return;

      // 检查拖拽的数据是否是 ExplorerItem（从资源库拖拽过来的）
      const activeData = active.data.current;
      if (!activeData || typeof activeData !== "object") return;

      // 检查是否是 ExplorerItem 类型
      const explorerItem = activeData as ExplorerItem;
      if (explorerItem.type !== "FilePathDir" && explorerItem.type !== "FilePathWithAssetObject") {
        return;
      }

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
        onDropFromExplorer(list.id, items);
      }
    }, [list.id, onDropFromExplorer])
  });

  // ===== 文件上传相关 =====
  const [isFileDragOver, setIsFileDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const createdFolderCardPathRef = useRef<Set<string>>(new Set());
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // 允许放置文件
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    e.preventDefault();
  }, []);
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // 只有启用文件上传时才显示拖拽悬停效果
    if (enableFileUpload) {
      setIsFileDragOver(true);
    }
  }, [enableFileUpload]);
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // 使用 relatedTarget 检查鼠标是否真的离开了容器
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    const currentTarget = e.currentTarget as HTMLElement;

    // 如果 relatedTarget 不在容器内（或为 null），说明真的离开了
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      setIsFileDragOver(false);
    }
  }, []);

  // 处理文件上传（支持文件夹结构）
  const handleUploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (!fileArray.length) return;
    const createRootFolderCards = async (pathInfo: UploadPathInfo) => {
      const hasFolderData = pathInfo.folderStructures && pathInfo.folderStructures.length > 0 || pathInfo.folderIdMap && Object.keys(pathInfo.folderIdMap).length > 0;
      if (!hasFolderData) return;
      const rootFolderStructures = (pathInfo.folderStructures || []).filter(f => f.parentPath === "");
      if (!rootFolderStructures.length || !onCreateCard) return;
      for (const folderStructure of rootFolderStructures) {
        const folderPath = folderStructure.path;
        const folderId = pathInfo.folderIdMap?.[folderPath];
        const normalizedFolderPath = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
        const pathSegments = normalizedFolderPath.split("/").filter(Boolean);
        const folderName = pathSegments[pathSegments.length - 1];
        if (!folderName) continue;
        const materializedPath = buildMaterializedPath(folderPath, pathInfo.folderIdMap, pathInfo.materializedPathCache, pathInfo.baseMaterializedPath);
        const ensuredMaterializedPath = materializedPath.endsWith("/") ? materializedPath : `${materializedPath}/`;
        if (createdFolderCardPathRef.current.has(ensuredMaterializedPath)) {
          continue;
        }
        try {
          await onCreateCard({
            title: folderName,
            cardType: "folder",
            relatedData: {
              filePathId: folderId,
              filePath: ensuredMaterializedPath
            },
            currentFieldId: listFieldId,
            groupBy: listGroupBy
          });
          createdFolderCardPathRef.current.add(ensuredMaterializedPath);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`[SortableList] 创建文件夹卡片失败: ${folderName}`, error);
        }
      }
    };
    const subProjectId = "project-library";
    let pathInfo: UploadPathInfo | null = null;
    try {
      // 使用新的上传工具函数，支持文件夹结构
      // 步骤1：创建文件夹（如果有）
      // 步骤2：通过父窗口上传文件
      pathInfo = await uploadFilesWithFolders({
        files: fileArray,
        folderId: list.id,
        subProjectId,
        libraryToken: libraryToken || undefined,
        taskFieldId: listFieldId
      });
    } catch (error) {
      // 父窗口如未就绪/未嵌入会抛错
      // 仅调试输出，不中断看板交互
      // eslint-disable-next-line no-console
      if (error && typeof error === "object" && "pathInfo" in error) {
        pathInfo = (error as {
          pathInfo?: UploadPathInfo;
        }).pathInfo ?? null;
      }
    }
    // 保存文件路径信息，用于后续收到上传完成通知后进行入库
    if (pathInfo) {
      try {
        // 创建根文件夹卡片
        await createRootFolderCards(pathInfo);
      } catch (error) { }
    }
  }, [list.id, libraryToken, onCreateCard, listFieldId, listGroupBy]);
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFileDragOver(false);

    // 如果禁用了文件上传，直接返回
    if (!enableFileUpload) {
      return;
    }
    try {
      // 参考 BizDropUpload/functions.ts 的实现方式
      const items = e.dataTransfer?.items;
      if (!items || items.length === 0) return;
      const allFiles: File[] = [];
      const dirsPathSet = new Set<string>();
      const promises: Promise<void>[] = [];

      // 递归遍历目录树（参考 traverseFileTree，支持 epub 目录）
      async function traverseFileTree(entry: any, basePath: string, files: File[], dirsPathSet: Set<string>): Promise<void> {
        if (!entry) return;
        if (entry.isFile) {
          const file: File = await new Promise((res, rej) => entry.file(res, rej));
          const path = basePath + file.name;
          Object.defineProperties(file, {
            path: {
              value: path,
              writable: true,
              configurable: true
            },
            _webkitRelativePath: {
              value: path,
              writable: true,
              configurable: true
            }
          });
          files.push(file);
        } else if (entry.isDirectory) {
          const dirPath = basePath + entry.name + "/";
          const isEpub = entry.name.endsWith(".epub");

          // EPUB 目录特殊处理：打包成 epub 文件
          if (isEpub) {
            const dirReader = entry.createReader();
            const entries: any[] = [];
            // readEntries 可能分批返回，需循环直到空数组
            await new Promise<void>((resolve, reject) => {
              const readBatch = () => {
                dirReader.readEntries((batch: any[]) => {
                  if (batch.length === 0) {
                    resolve();
                  } else {
                    entries.push(...batch);
                    readBatch();
                  }
                }, reject);
              };
              readBatch();
            });

            // 递归收集 .epub 目录下所有文件，打包成zip并重命名为.epub
            const epubSubFiles: FileWithPath[] = [];
            for (const nestedEntry of entries) {
              // 传递 isSingle: true 避免嵌套 epub 目录再次被打包
              await epubTraverseFileTree(nestedEntry, dirPath, epubSubFiles, undefined, true);
            }
            const epubFile = await getEpubBySubFiles(epubSubFiles, basePath, entry.name);
            files.push(epubFile);
          } else {
            // 普通目录：记录路径并递归遍历
            dirsPathSet.add(dirPath);
            const reader = entry.createReader();
            const entries: any[] = [];

            // readEntries 可能分批返回，需循环直到空数组
            await new Promise<void>((resolve, reject) => {
              const readBatch = () => {
                reader.readEntries((batch: any[]) => {
                  if (batch.length === 0) {
                    resolve();
                  } else {
                    entries.push(...batch);
                    readBatch();
                  }
                }, reject);
              };
              readBatch();
            });
            for (const nestedEntry of entries) {
              await traverseFileTree(nestedEntry, dirPath, files, dirsPathSet);
            }
          }
        }
      }

      // 处理每个拖拽项（参考 BizDropUpload/functions.ts）
      for (let i = 0; i < items.length; i++) {
        const item = items[i] as any;

        // 如果无法使用webkitGetAsEntry，再尝试getAsFile
        const file = item.getAsFile ? item.getAsFile() : item;
        if (!file) continue;

        // 检查是否为 epub 文件（异步）
        const isEpubPromise = verifyEpubFile(file);

        // Epub 特殊处理：也推入 promises 数组，确保所有文件统一异步处理
        promises.push((async () => {
          const isEpub = await isEpubPromise;
          if (isEpub) {
            const entry = item.webkitGetAsEntry?.();
            if (entry) {
              const fileToAdd = await getEpubZip(file, entry, true);
              allFiles.push(fileToAdd);
            } else {
              // 如果没有 entry，直接添加文件
              Object.defineProperties(file, {
                path: {
                  value: "/" + file.name,
                  writable: true,
                  configurable: true
                },
                _webkitRelativePath: {
                  value: "/" + file.name,
                  writable: true,
                  configurable: true
                }
              });
              allFiles.push(file);
            }
          } else {
            // 优先使用webkitGetAsEntry
            if ("webkitGetAsEntry" in item) {
              const entry = item.webkitGetAsEntry();
              if (entry) {
                await traverseFileTree(entry, "/", allFiles, dirsPathSet);
              }
            } else {
              // 回退：尝试 getAsFile
              if (file) {
                Object.defineProperties(file, {
                  path: {
                    value: "/" + file.name,
                    writable: true,
                    configurable: true
                  },
                  _webkitRelativePath: {
                    value: "/" + file.name,
                    writable: true,
                    configurable: true
                  }
                });
                allFiles.push(file);
              }
            }
          }
        })());
      }

      // 等待所有文件和文件夹处理完成
      await Promise.all(promises);

      // 空文件夹处理（参考 functions.ts 的逻辑）
      const isEmptyOrOnlyHiddenFiles = (dirPath: string): boolean => {
        return !allFiles.some(file => {
          const filePath = (file as any).path;
          if (filePath?.startsWith(dirPath)) {
            const relativePath = filePath.slice(dirPath.length);
            const fileName = relativePath.split("/")[0];
            return !fileName.startsWith(".") && fileName !== "";
          }
          return false;
        });
      };

      // 添加空文件夹或只包含隐藏文件的文件夹作为特殊的 File 对象
      Array.from(dirsPathSet).sort((a, b) => b.length - a.length).forEach(dirPath => {
        if (isEmptyOrOnlyHiddenFiles(dirPath)) {
          const emptyFolderFile = new File([], dirPath, {
            type: "application/x-empty-folder"
          });
          Object.defineProperties(emptyFolderFile, {
            path: {
              value: dirPath,
              writable: true,
              configurable: true
            },
            _webkitRelativePath: {
              value: dirPath,
              writable: true,
              configurable: true
            }
          });
          allFiles.push(emptyFolderFile);
        }
      });
      if (allFiles.length === 0) return;
      await handleUploadFiles(allFiles);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[SortableList] 拖拽上传失败:", err);
      // 回退：使用原生 FileList（某些环境可能没有 DataTransferItem API）
      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;
      await handleUploadFiles(files);
    }
  }, [handleUploadFiles, enableFileUpload]);

  // 处理点击上传文件
  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUploadFiles(files);
    }
    // 重置 input，允许重复选择同一文件
    e.target.value = "";
  }, [handleUploadFiles]);

  // 处理点击上传文件夹
  const handleFolderInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUploadFiles(files);
    }
    // 重置 input，允许重复选择同一文件夹
    e.target.value = "";
  }, [handleUploadFiles]);

  // 触发文件选择
  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 触发文件夹选择
  const triggerFolderUpload = useCallback(() => {
    folderInputRef.current?.click();
  }, []);
  return <SortableContext id={list.id} items={list.cards.map(card => createDndId.card(card.id))} strategy={verticalListSortingStrategy}>
    <div ref={setListSortableRef} style={listStyle} className={cn("flex-shrink-0 w-80 bg-[#F2F3F6] dark:bg-card rounded-md overflow-hidden relative", enableListSorting && "cursor-grab active:cursor-grabbing", isDragOverlay && "rotate-2 scale-105", isListDragging && "opacity-50", className)} onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
      <div className={cn("common-transition pointer-events-none", "opacity-0 absolute top-0 left-0 w-full h-full border-2 border-dashed border-primary-6 text-primary rounded-xl bg-[rgba(51,102,255,0.2)]", isFileDragOver && "opacity-100")}>
      </div>
      {/* List Header - only draggable if list sorting is enabled */}
      {renderHeader && renderHeader(list, enableListSorting ? {
        ...listAttributes,
        ...listListeners
      } : {})}

      <div ref={setDroppableRef} className={cn("min-h-[80px] transition-colors", isOver && "bg-[#F2F3F6] dark:bg-[#262626]", list.cards.length === 0 ? "py-3 px-3" : "p-3 space-y-3")}>
        {list.cards.length === 0 ? renderEmptyList ? renderEmptyList(list as ISortableList & {
          cards: ISortableCard[];
        }, isOver) : <div className={cn("text-sm text-zinc-500 flex items-center gap-2")}>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-blue-600">
            +
          </span>{tProject("SortableList.dragAndDropFilesOrFoldersHereT")}
        </div> : list.cards.map(card =>
          <SortableCard
            key={card.id}
            id={card.id}
            disabled={cardDragDisabled}
            isDragOverlay={isDragOverlay}
            data={{
              card: card // 传递完整的 card 数据
            }}>
            <div onClick={async e => {
              const anyCard: any = card as any;
              if (anyCard?.cardType !== "material") return;
              const assetObject = anyCard?.relatedData?.assetObject;
              if (!assetObject) return;

              // 尝试获取完整的 FilePath 对象（如果存在）
              const relatedFilePath = anyCard?.relatedFilePath;
              let file: any;
              if (relatedFilePath) {
                // 如果有完整的 FilePath 对象，直接使用（包含 rating 和 link）
                file = relatedFilePath;
              } else {
                // 否则构造 file 对象，补充 rating 和 link
                file = {
                  id: anyCard.relatedData?.assetObjectId ?? assetObject.id,
                  name: anyCard.title || assetObject.originalName || tProject("SortableList.untitledAssets"),
                  materializedPath: anyCard.relatedData?.folderPath || "/",
                  description: anyCard.description || null,
                  rating: anyCard?.rating ?? relatedFilePath?.rating ?? null,
                  link: anyCard?.link ?? relatedFilePath?.link ?? null
                };
              }
              openAssetDetail({
                ...file,
                assetObject
              } as any, {
                libraryToken: libraryToken || undefined
              });
            }}>
              {renderCard(card as TCard)}
            </div>
          </SortableCard>)}

        {/* 隐藏的文件输入框 */}
        <input ref={fileInputRef} type="file" multiple onChange={handleFileInputChange} className="hidden" aria-label={tProject("SortableList.uploadFile")} />
        <input ref={folderInputRef} type="file" multiple onChange={handleFolderInputChange} className="hidden" {...{
          webkitdirectory: ""
        } as any} aria-label={tProject("SortableList.uploadFolder")} />
      </div>

      {/* Add Button */}
      {renderAddButton && renderAddButton(list as ISortableList & {
        cards: ISortableCard[];
      }, handleAddCard, triggerFileUpload, triggerFolderUpload)}
    </div>
  </SortableContext>;
}