// Asset type for Grid/List views
export enum AssetStatus {
  PENDING = '待标记',
  APPROVED = '已通过',
  REJECTED = '已拒绝',
}

export interface Asset {
  id: number;
  name: string;
  status: AssetStatus;
  type: string;
  size: string;
  fileSize: string;
  thumbnail: string;
  extension?: string;
}

// Task status for approval center
export type TaskStatus = 'pending' | 'approved' | 'rejected' | 'processing';
export type TaskType = 'pending' | 'completed' | 'initiated' | 'cc';

export interface Task {
  id: string;
  status: TaskStatus;
  statusText: string;
  title: string;
  submitter: {
    name: string;
    avatarUrl?: string;
    department: string;
  };
  targetLocation?: string;
  assetCount?: number;
  submitTime?: string;
}

// Detail panel props
export interface DetailPanelProps {
  taskId?: string;
  pageType?: TaskType;
  showSubmitButton?: boolean;
}
