"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { MusedamUser } from "@/types/musedam";
import { formatMemberName } from "@/utils/formatMemberName";
import { useState, useRef, useCallback, useEffect } from "react";
import { UserAvatar } from "@/components/UserAvatar";
import { dispatchMuseDAMClientAction } from "@/embed/message";
import { useDebounceFn } from "ahooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MemberComboboxProps {
  placeholder?: string;
  value?: MusedamUser | undefined;
  values?: MusedamUser[];
  onSelect?: (user: MusedamUser | undefined) => void;
  onSelectMultiple?: (users: MusedamUser[]) => void;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

export function MemberCombobox({
  placeholder = "搜索成员",
  value = undefined,
  values = [],
  onSelect,
  onSelectMultiple,
  multiple = false,
  className,
  disabled = false,
}: MemberComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<MusedamUser[]>([]);
  const [compositionActive, setCompositionActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editableSpanRef = useRef<HTMLSpanElement>(null);

  const selectedUserId = value?.userId ?? null;
  const selectedUserIds = multiple ? values.map(u => u.userId) : [];

  // 获取成员列表
  const fetchUsers = useCallback(async (keyword?: string) => {
    const res = await dispatchMuseDAMClientAction('getOrgUsers', {
      page: 1,
      pageSize: 20,
      keyword: keyword || undefined,
    });
    if (res) {
      const { members } = res;
      const uniqueUsers = members?.filter(
        (user, index, self) => index === self.findIndex((u) => u.userId === user.userId),
      );
      setUsers(uniqueUsers || []);
    }
  }, [isOpen]);

  useEffect(() => {
    fetchUsers()
  }, [isOpen])

  // 防抖搜索
  const { run: debouncedSearch } = useDebounceFn(
    (keyword: string) => fetchUsers(keyword),
    { wait: 300 }
  );

  // 处理输入框输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    debouncedSearch(newValue);
  };

  // 处理 contentEditable span 的输入
  const handleEditableInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const currentText = e.currentTarget.textContent ?? '';
    setSearchValue(currentText);
    if (!compositionActive) {
      debouncedSearch(currentText);
    }
  };

  // 打开下拉时加载数据
  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    if (open) {
      fetchUsers(searchValue);
      // 聚焦输入框
      setTimeout(() => {
        inputRef.current?.focus();
        editableSpanRef.current?.focus();
      }, 0);
    }
  };

  // 选择/取消选择成员
  const handleToggleUser = (user: MusedamUser) => {
    if (multiple) {
      const isSelected = selectedUserIds.includes(user.userId);
      if (isSelected) {
        // 取消选择
        const newValues = values.filter(u => u.userId !== user.userId);
        onSelectMultiple?.(newValues);
      } else {
        // 添加选择
        const newValues = [...values, user];
        onSelectMultiple?.(newValues);
      }
      // 保持下拉打开，继续选择，清空搜索
      clearSearch();
      setTimeout(() => {
        editableSpanRef.current?.focus();
      }, 0);
    } else {
      // 单选模式
      onSelect?.(user);
      clearSearch();
      setIsOpen(false);
    }
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchValue('');
    if (editableSpanRef.current) {
      editableSpanRef.current.textContent = '';
    }
  };

  // 删除标签
  const handleRemoveTag = (e: React.MouseEvent, userToRemove: MusedamUser) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (multiple) {
      const newValues = values.filter(u => u.userId !== userToRemove.userId);
      onSelectMultiple?.(newValues);
    } else {
      onSelect?.(undefined);
    }
    // 重新聚焦
    setTimeout(() => {
      editableSpanRef.current?.focus();
      inputRef.current?.focus();
    }, 0);
  };

  // Backspace 删除最后一个
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && searchValue === '' && multiple && values.length > 0) {
      const newValues = values.slice(0, -1);
      onSelectMultiple?.(newValues);
    }
  };

  // 渲染已选标签（多选）
  const renderSelectedTags = () => {
    if (!multiple) return null;
    return values.map((user) => (
      <div
        key={user.userId}
        className="inline-flex items-center gap-1 h-6 pl-1 pr-1.5 rounded-full border border-basic-3 bg-basic-2 shrink-0"
      >
        <UserAvatar userInfo={user} size={16} fontSize={10} />
        <span className="text-[13px] leading-[18px] text-basic-10 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
          {formatMemberName(user)}
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => handleRemoveTag(e, user)}
          className="flex items-center justify-center shrink-0 disabled:opacity-50"
        >
          <Icon
            name="Close"
            size={14}
            className="text-basic-5 hover:text-basic-10 cursor-pointer"
          />
        </button>
      </div>
    ));
  };

  // 渲染单选值
  const renderSingleValue = () => {
    if (multiple || !value) return null;
    return (
      <div className="inline-flex items-center gap-1 h-6 pl-1 pr-1.5 rounded-full border border-basic-3 bg-basic-2 shrink-0">
        <UserAvatar userInfo={value} size={16} fontSize={10} />
        <span className="text-[13px] leading-[18px] text-basic-10 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
          {formatMemberName(value)}
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => handleRemoveTag(e, value)}
          className="flex items-center justify-center disabled:opacity-50"
        >
          <Icon
            name="Close"
            size={14}
            className="text-basic-5 hover:text-basic-10 cursor-pointer"
          />
        </button>
      </div>
    );
  };

  const hasValue = multiple ? values.length > 0 : !!value;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div
          ref={containerRef}
          className={cn(
            "w-full min-h-[32px] max-h-[80px] overflow-y-auto",
            "flex flex-wrap items-center gap-1 p-1",
            "transition-[border,shadow] duration-200",
            !disabled && "hover:border-primary cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed bg-basic-1",
            className
          )}
        >
          {hasValue ? (
            <>
              {renderSelectedTags()}
              {renderSingleValue()}
              {/* 在已选值后面使用 contentEditable span 进行内联输入 */}
              <span
                ref={editableSpanRef}
                className="text-[14px] leading-[24px] h-[24px] border-none focus-visible:outline-none flex-1 min-w-[60px] p-0 bg-transparent"
                onCompositionStart={() => setCompositionActive(true)}
                onCompositionEnd={() => {
                  setCompositionActive(false);
                  debouncedSearch(searchValue);
                }}
                onInput={handleEditableInput}
                onKeyDown={handleKeyDown}
                contentEditable={!disabled}
                suppressContentEditableWarning
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) setIsOpen(true);
                }}
              />
            </>
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className="w-full h-6 outline-none text-sm bg-transparent border-none !focus:shadow-none !focus:ring-0"
              placeholder={placeholder}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) setIsOpen(true);
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) max-h-[320px] overflow-y-auto"
        sideOffset={4}
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* 成员列表 */}
        <div className="py-1">
          {users.length === 0 ? (
            <div className="py-8 text-center text-sm text-basic-5">暂无成员数据</div>
          ) : (
            users.map((user) => {
              const isSelected = multiple
                ? selectedUserIds.includes(user.userId)
                : user.userId === selectedUserId;

              return (
                <div
                  key={user.userId}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                    isSelected ? "bg-basic-1" : "hover:bg-basic-1/50"
                  )}
                  onClick={() => handleToggleUser(user)}
                >
                  <UserAvatar userInfo={user} size={36} />
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <div className="text-[14px] leading-[22px] font-medium text-basic-8 truncate">
                      {formatMemberName(user)}
                    </div>
                    <div className="flex items-center gap-2 text-basic-5 text-xs leading-4">
                      {user.jobTitle && (
                        <span className="truncate">{user.jobTitle}</span>
                      )}
                      {user.phone && (
                        <span>{maskMobile(user.phone)}</span>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-primary shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// 手机号脱敏处理
function maskMobile(phone: string): string {
  if (!phone || phone.length < 7) return phone;
  return phone.slice(0, 3) + "****" + phone.slice(-4);
}
