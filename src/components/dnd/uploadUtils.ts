import { dispatchMuseDAMClientAction } from "@/embed/message";
import { assetsCreateDirAction } from "@/Explorer/query/actions";

/**
 * 文件项接口，包含文件对象和相对路径信息
 */
export interface FileItem {
  file: File;
  relativePath: string; // 相对于根目录的路径，如 "folder1/subfolder/file.jpg"
  folderPath: string; // 文件夹路径，如 "folder1/subfolder/"
  fileName: string; // 文件名，如 "file.jpg"
}

/**
 * 文件夹结构接口
 */
export interface FolderStructure {
  path: string; // 文件夹路径，如 "folder1/subfolder/"
  name: string; // 文件夹名称，如 "subfolder"
  parentPath: string; // 父文件夹路径，如 "folder1/"
}

/**
 * 解析 FileList 或 File[]，提取文件和文件夹结构
 * @param files - 文件列表
 * @param basePath - 基础路径（可选，用于处理文件夹上传）
 * @returns 包含文件项和文件夹结构的对象
 */
export function parseFilesAndFolders(
  files: FileList | File[],
  basePath: string = "",
): {
  fileItems: FileItem[];
  folderStructures: FolderStructure[];
} {
  const fileArray = Array.from(files);
  const fileItems: FileItem[] = [];
  const folderPaths = new Set<string>();

  // 判断路径是否包含隐藏段（任一层级以 . 开头）
  const hasHiddenSegment = (path: string): boolean => {
    return path
      .split("/")
      .filter(Boolean)
      .some((seg) => seg.startsWith("."));
  };

  // 处理每个文件
  fileArray.forEach((file) => {
    // 获取相对路径（webkitRelativePath 用于文件夹上传）
    const relativePath =
      (file as any).path ||
      (file as any).webkitRelativePath ||
      (file as any).relativePath ||
      file.name;

    // 标准化路径分隔符
    const normalizedPath = relativePath.replace(/\\/g, "/");

    // 处理空文件夹（type === 'application/x-empty-folder'）
    if (file.type === "application/x-empty-folder") {
      // 空文件夹路径应该以 / 结尾
      const dirPath = normalizedPath.endsWith("/") ? normalizedPath : normalizedPath + "/";

      // 过滤隐藏目录
      if (hasHiddenSegment(dirPath)) {
        return;
      }

      // 添加所有父文件夹路径
      const pathParts = dirPath.split("/").filter(Boolean);
      let currentPath = "";
      pathParts.forEach((part: string) => {
        if (part.startsWith(".")) return; // 隐藏目录不创建
        currentPath += part + "/";
        folderPaths.add(currentPath);
      });
      return; // 空文件夹不添加到 fileItems
    }

    // 跳过可能的"目录占位符"（拖拽目录时部分浏览器可能给到 size=0 且 type="" 的占位）
    if (file.type === "" && file.size === 0) {
      return;
    }

    // 跳过以 / 结尾的路径（目录）
    if (normalizedPath.endsWith("/")) {
      return;
    }

    // 过滤隐藏文件或位于隐藏目录下的文件
    if (hasHiddenSegment(normalizedPath)) {
      return;
    }

    // 提取文件夹路径和文件名
    const lastSlashIndex = normalizedPath.lastIndexOf("/");
    const folderPath = lastSlashIndex >= 0 ? normalizedPath.substring(0, lastSlashIndex + 1) : "";
    const fileName =
      lastSlashIndex >= 0 ? normalizedPath.substring(lastSlashIndex + 1) : normalizedPath;

    // 跳过没有文件名的项（可能是目录）
    if (!fileName || fileName.trim() === "") {
      return;
    }

    fileItems.push({
      file,
      relativePath: normalizedPath,
      folderPath,
      fileName,
    });

    // 收集所有文件夹路径
    if (folderPath) {
      // 添加所有父文件夹路径
      const pathParts = folderPath.split("/").filter(Boolean);
      let currentPath = "";
      pathParts.forEach((part: string) => {
        if (part.startsWith(".")) return; // 隐藏目录不创建
        currentPath += part + "/";
        folderPaths.add(currentPath);
      });
    }
  });

  // 构建文件夹结构（按层级排序）
  const folderStructures: FolderStructure[] = Array.from(folderPaths)
    .map((path) => {
      const pathParts = path.split("/").filter(Boolean);
      const name = pathParts[pathParts.length - 1] || "";
      const parentPath = pathParts.length > 1 ? pathParts.slice(0, -1).join("/") + "/" : "";

      return {
        path,
        name,
        parentPath,
      };
    })
    .sort((a, b) => {
      // 按层级深度排序，确保先创建父文件夹
      const depthA = a.path.split("/").filter(Boolean).length;
      const depthB = b.path.split("/").filter(Boolean).length;
      return depthA - depthB;
    });

  return {
    fileItems,
    folderStructures,
  };
}

/**
 * 创建文件夹路径映射
 * @param folderStructures - 文件夹结构数组
 * @param baseMaterializedPath - 基础 materializedPath（如 "/"）
 * @returns 文件夹路径到文件夹 ID 的映射
 */
export interface FolderIdMap {
  [folderPath: string]: number; // folderPath -> folderId
}

/**
 * 创建文件夹的结果
 */
export interface CreateFoldersResult {
  folderIdMap: FolderIdMap;
  materializedPathCache: { [path: string]: string };
  resolvedFolderPathMap: { [originalPath: string]: string };
}

/**
 * 创建文件夹并返回路径映射
 * @param folderStructures - 文件夹结构数组
 * @param libraryToken - 资产库 token（可选，如果不提供则跳过文件夹创建）
 * @param baseMaterializedPath - 基础 materializedPath（如 "/"）
 * @param targetFolderId - 目标文件夹 ID（用于创建文件夹）
 * @returns 文件夹路径到文件夹 ID 的映射和 materializedPath 缓存
 */
export async function createFolders(
  folderStructures: FolderStructure[],
  libraryToken: string | undefined,
  baseMaterializedPath: string = "/",
  targetFolderId?: string | number,
): Promise<CreateFoldersResult> {
  const folderIdMap: FolderIdMap = {};
  const materializedPathCache: { [path: string]: string } = {};
  const resolvedFolderPathMap: { [path: string]: string } = {};

  // 如果没有 libraryToken，无法创建文件夹，返回空映射
  if (!libraryToken) {
    // eslint-disable-next-line no-console
    console.warn("[uploadUtils] 未提供 libraryToken，无法创建文件夹结构");
    return {
      folderIdMap,
      materializedPathCache,
      resolvedFolderPathMap,
    };
  }

  // 确保基础路径以 / 结尾
  const normalizedBasePath =
    baseMaterializedPath === "/"
      ? "/"
      : baseMaterializedPath.endsWith("/")
        ? baseMaterializedPath
        : baseMaterializedPath + "/";
    // console.log("folderStructures",folderStructures)
  // 处理每个文件夹
  for (const folder of folderStructures) {
    // 构建 materializedPath
    let materializedPath: string;
    if (folder.parentPath === "") {
      // 根目录下的文件夹
      materializedPath = normalizedBasePath;
    } else {
      // 查找父文件夹的 materializedPath
      const parentMaterializedPath = materializedPathCache[folder.parentPath] || normalizedBasePath;
      materializedPath = parentMaterializedPath;
    }
    
    // 创建文件夹
    try {
      const result = await assetsCreateDirAction({
        libraryToken,
        materializedPath,
        name: folder.name,
      });

      if (result.success && result.data) {
        const actualFolderPath = `${result.data.materializedPath}${result.data.name}/`;
        // 缓存 materializedPath（基于数据库返回的数据）
        folderIdMap[folder.path] = result.data.id;
        materializedPathCache[folder.path] = actualFolderPath;
        const relativeFolderPath =
          normalizedBasePath === "/"
            ? actualFolderPath.slice(1)
            : actualFolderPath.startsWith(normalizedBasePath)
              ? actualFolderPath.slice(normalizedBasePath.length)
              : actualFolderPath;

        const ensuredRelativeFolderPath = relativeFolderPath.endsWith("/")
          ? relativeFolderPath
          : `${relativeFolderPath}/`;

        if (ensuredRelativeFolderPath !== folder.path) {
          resolvedFolderPathMap[folder.path] = ensuredRelativeFolderPath;
          materializedPathCache[ensuredRelativeFolderPath] = actualFolderPath;
          folderIdMap[ensuredRelativeFolderPath] = result.data.id;
        }
      } else if (!result.success) {
        // 如果创建失败，使用目标文件夹 ID 作为回退
        // eslint-disable-next-line no-console
        console.warn(`[uploadUtils] 创建文件夹失败: ${folder.path}`, result.message);
        if (targetFolderId) {
          folderIdMap[folder.path] = Number(targetFolderId);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[uploadUtils] 创建文件夹失败: ${folder.path}`, error);
      // 如果创建失败，使用目标文件夹 ID 作为回退
      if (targetFolderId) {
        folderIdMap[folder.path] = Number(targetFolderId);
      }
    }
  }

  return {
    folderIdMap,
    materializedPathCache,
    resolvedFolderPathMap,
  };
}

/**
 * 上传文件并处理文件夹结构
 * @param files - 文件列表
 * @param options - 上传选项
 * @returns Promise<void>
 */
export interface UploadOptions {
  files: FileList | File[];
  taskFieldId?: number; // 任务状态id
  folderId: string | number; // 目标文件夹 ID（任务列表对应的文件夹，保留用于兼容性）
  subProjectId: string; // 子项目 ID（保留用于兼容性）
  libraryToken?: string; // 资产库 token（必需，用于创建文件夹和上传文件）
  baseMaterializedPath?: string; // 基础 materializedPath（默认 "/"）
  onProgress?: (progress: number) => void; // 上传进度回调
}

/**
 * 上传文件后的路径信息，用于后续入库时匹配文件路径
 */
export interface UploadPathInfo {
  fileItems: FileItem[];
  folderIdMap: FolderIdMap;
  materializedPathCache: { [path: string]: string };
  baseMaterializedPath: string;
  folderStructures?: FolderStructure[]; // 用于在无 libraryToken 时也能创建“文件夹卡片”
}

/**
 * 根据相对路径构建 materializedPath
 */
export function buildMaterializedPath(
  folderPath: string,
  folderIdMap: FolderIdMap,
  materializedPathCache: { [path: string]: string },
  baseMaterializedPath: string,
): string {
  if (folderPath === "") {
    return baseMaterializedPath;
  }

  // 查找缓存的 materializedPath
  if (materializedPathCache[folderPath]) {
    return materializedPathCache[folderPath];
  }

  // 递归构建父路径的 materializedPath
  const pathParts = folderPath.split("/").filter(Boolean);
  let currentPath = "";
  let materializedPath = baseMaterializedPath;

  for (const part of pathParts) {
    currentPath += part + "/";
    if (materializedPathCache[currentPath]) {
      materializedPath = materializedPathCache[currentPath];
    } else {
      // 如果缓存中没有，说明这是新创建的文件夹，直接构建路径
      materializedPath = materializedPath + part + "/";
      materializedPathCache[currentPath] = materializedPath;
    }
  }

  return materializedPath;
}

/**
 * 上传文件（支持文件夹结构）
 * 步骤1：创建文件夹（如果有）
 * 步骤2：通过父窗口上传文件
 * 入库操作在收到父窗口的上传完成通知后进行
 * @param options - 上传选项
 * @returns Promise<UploadPathInfo | null> - 返回文件路径信息，用于后续入库时匹配文件路径
 */
export async function uploadFilesWithFolders(
  options: UploadOptions,
): Promise<UploadPathInfo | null> {
  const {
    files,
    folderId,
    subProjectId,
    libraryToken,
    baseMaterializedPath = "/",
    onProgress,
  } = options;

  const normalizedBasePath =
    baseMaterializedPath === "/"
      ? "/"
      : baseMaterializedPath.endsWith("/")
        ? baseMaterializedPath
        : baseMaterializedPath + "/";

  const fileArray = Array.from(files);

  // 解析文件和文件夹结构
  const { fileItems, folderStructures } = parseFilesAndFolders(files);

  // 校验是否存在重复的文件路径（相同的相对路径视为重复）
  const seenFilePaths = new Set<string>();
  const duplicatedPaths: string[] = [];
  for (const item of fileItems) {
    const normalizedRelativePath = item.relativePath;
    if (seenFilePaths.has(normalizedRelativePath)) {
      duplicatedPaths.push(normalizedRelativePath);
    } else {
      seenFilePaths.add(normalizedRelativePath);
    }
  }

  if (duplicatedPaths.length > 0) {
    throw new Error(
      `[uploadUtils] 检测到重复的文件路径: ${Array.from(new Set(duplicatedPaths)).join(", ")}`,
    );
  }

  const foldersToCreate = folderStructures.map((f) => f.path);
  // eslint-disable-next-line no-console
  // console.log("[uploadUtils] 需要创建的文件夹:", foldersToCreate.length, foldersToCreate);

  // eslint-disable-next-line no-console

  // 步骤 1: 创建所有文件夹（如果有）
  // 文件夹创建只在当前项目中，不需要通过父窗口
  let folderIdMap: FolderIdMap = {};
  let materializedPathCache: { [path: string]: string } = {};
  let resolvedFolderPathMap: { [path: string]: string } = {};

  if (folderStructures.length > 0 && libraryToken) {
    const createResult = await createFolders(
      folderStructures,
      libraryToken,
      normalizedBasePath,
      folderId,
    );
    folderIdMap = createResult.folderIdMap;
    materializedPathCache = createResult.materializedPathCache;
    resolvedFolderPathMap = createResult.resolvedFolderPathMap;
  }

  const resolveFolderPath = (path: string): string => {
    if (!path) return path;
    let currentPath = path;
    const visited = new Set<string>();
    while (resolvedFolderPathMap[currentPath] && !visited.has(currentPath)) {
      visited.add(currentPath);
      currentPath = resolvedFolderPathMap[currentPath];
    }
    return currentPath;
  };

  if (Object.keys(resolvedFolderPathMap).length > 0) {
    const updatedFolderIdMap: FolderIdMap = {};
    Object.entries(folderIdMap).forEach(([path, id]) => {
      const resolvedPath = resolveFolderPath(path);
      updatedFolderIdMap[path] = id;
      if (resolvedPath !== path) {
        updatedFolderIdMap[resolvedPath] = id;
      }
    });
    folderIdMap = updatedFolderIdMap;

    fileItems.forEach((item) => {
      if (item.folderPath) {
        const resolvedPath = resolveFolderPath(item.folderPath);
        if (resolvedPath !== item.folderPath) {
          item.folderPath = resolvedPath;
        }
      }
      item.relativePath = item.folderPath ? `${item.folderPath}${item.fileName}` : item.fileName;
    });

    folderStructures.forEach((folder) => {
      const resolvedPath = resolveFolderPath(folder.path);
      if (resolvedPath !== folder.path) {
        folder.path = resolvedPath;
      }
      if (folder.parentPath) {
        const resolvedParentPath = resolveFolderPath(folder.parentPath);
        if (resolvedParentPath !== folder.parentPath) {
          folder.parentPath = resolvedParentPath;
        }
      }
      const nameSegments = folder.path.split("/").filter(Boolean);
      folder.name = nameSegments[nameSegments.length - 1] || folder.name;
    });
  }

  // 如果没有文件，只创建文件夹，返回路径信息
  if (fileItems.length === 0) {
    // eslint-disable-next-line no-console
    // console.log("[uploadUtils] 只有文件夹结构，无需上传文件");
    return {
      fileItems: [],
      folderIdMap,
      materializedPathCache,
      baseMaterializedPath: normalizedBasePath,
      folderStructures,
    };
  }

  const pathInfo = {
    fileItems,
    folderIdMap,
    materializedPathCache,
    baseMaterializedPath: normalizedBasePath,
    folderStructures,
  };

  try {
    const uploadArgs = {
      files: fileArray.filter((file) => file.type !== "application/x-empty-folder"),
      folderId,
      subProjectId,
      taskFieldId: options.taskFieldId,
      pathInfo: pathInfo,
      libraryToken: libraryToken,
    };
    // console.log('[uploadUtils] 发送 upload-files 消息，libraryToken:', libraryToken, '完整 args:', uploadArgs);
    dispatchMuseDAMClientAction("upload-files", uploadArgs);
  } catch (error) {
    // 无论上传是否成功，都附带路径信息，便于调用方后续处理
    if (error && typeof error === "object") {
      (error as any).pathInfo = pathInfo;
    }
    throw error;
  }

  // 返回文件路径信息，用于后续入库时匹配文件路径
  return pathInfo;
}
