export interface IDepartmentItem {
  id: number;
  name: string;
  children: IDepartmentItem[];
}
export class MuseDAMID {
  private value: string;

  constructor(id: string | number | bigint) {
    this.value = String(id);
  }

  toString(): string {
    return this.value;
  }

  toJSON(): string {
    return this.value;
  }

  valueOf(): string {
    return this.value;
  }

  [Symbol.toPrimitive](): string {
    return this.value;
  }

  static from(id: string | number | bigint): MuseDAMID {
    return new MuseDAMID(id);
  }
}

export type MusedamUser = {
  userId: string;
  nickName?: string;
  realName?: string;
  orgRealName?: string;
  avatarUrl: string;
  isVisitor?: boolean;
  phone?: string;
  email?: string;
  orgNickName?: string;
  jobTitle?: string;
  roleCode?: string;
  departmentList?: IDepartmentItem[];
};

export type MusedamMemberSelectorUser = {
  id: string;
  name: string;
  departmentsName: string;
  avatarUrl: string;
};

export type EnterpriseSearchTagVOListType = {
  tag: {
    description: string | null;
    id: number;
    materialCount: number;
    name: string;
    parentId: number;
  };
  parent: EnterpriseSearchTagVOListType | null;
};

export enum MusedamAccountStatus {
  NORMAL = 'NORMAL',
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  QUIT = 'QUIT',
  REMOVE = 'REMOVE',
  RESIGNED = 'RESIGNED',
  UNREGISTERED = 'UNREGISTERED',
}
