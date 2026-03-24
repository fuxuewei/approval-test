"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

export type ModalButtonType = VariantProps<typeof buttonVariants>["variant"];

export interface ModalButtonConfig {
  text: string;
  type?: ModalButtonType;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
}

export interface ModalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  content?: React.ReactNode;
  okButton?: ModalButtonConfig | false;
  cancelButton?: ModalButtonConfig | false;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  width?: number | string;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const defaultOkButton: ModalButtonConfig = {
  text: "确定",
  type: "default",
};

const defaultCancelButton: ModalButtonConfig = {
  text: "取消",
  type: "outline",
};

export function ModalDialog({
  open,
  onOpenChange,
  title,
  description,
  content,
  okButton: okButtonProp,
  cancelButton: cancelButtonProp,
  onOk,
  onCancel,
  width,
  showCloseButton = true,
  footer,
  className,
  contentClassName,
}: ModalDialogProps) {
  const [loading, setLoading] = React.useState(false);

  const okButton = okButtonProp === false ? null : { ...defaultOkButton, ...okButtonProp };
  const cancelButton = cancelButtonProp === false ? null : { ...defaultCancelButton, ...cancelButtonProp };

  const handleOk = async () => {
    if (okButton?.loading || loading) return;

    setLoading(true);
    try {
      await onOk?.();
      await okButton?.onClick?.();
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (cancelButton?.loading || loading) return;

    try {
      await onCancel?.();
      await cancelButton?.onClick?.();
    } finally {
      onOpenChange(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !loading) {
      onOpenChange(false);
    }
  };

  const style = width ? { width: typeof width === "number" ? `${width}px` : width } : undefined;

  const isLoading = loading || okButton?.loading || cancelButton?.loading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn("gap-0 p-0 w-[440px]", className)}
        style={style}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-basic-9 leading-6">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm leading-[22px]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {content && (
          <div className={cn('mb-1 text-basic-7', contentClassName)}>
            {content}
          </div>
        )}

        {footer !== undefined ? (
          <DialogFooter>
            {footer}
          </DialogFooter>
        ) : (okButton || cancelButton) ? (
          <DialogFooter>
            {cancelButton && (
              <Button
                size="sm"
                className="w-[80px]"
                variant={cancelButton.type}
                disabled={cancelButton.disabled || isLoading}
                onClick={handleCancel}
              >
                {cancelButton.loading && <Loader2 className="size-4 animate-spin" />}
                {cancelButton.text}
              </Button>
            )}
            {okButton && (
              <Button
                size="sm"
                className="w-[80px]"
                variant={okButton.type}
                disabled={okButton.disabled || isLoading}
                onClick={handleOk}
              >
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                {okButton.text}
              </Button>
            )}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

// 便捷用法：ConfirmDialog 用于确认/删除场景
export interface ConfirmDialogProps extends Omit<ModalDialogProps, "okButton" | "cancelButton"> {
  confirmType?: "default" | "danger";
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
}

export function ConfirmDialog({
  confirmType = "default",
  confirmText = "确定",
  cancelText = "取消",
  onConfirm,
  ...props
}: ConfirmDialogProps) {
  return (
    <ModalDialog
      {...props}
      onOk={onConfirm}
      okButton={{
        text: confirmText,
        type: confirmType === "danger" ? "dialogDanger" : "default",
      }}
      cancelButton={{
        text: cancelText,
        type: "outline",
      }}
    />
  );
}

// Hook 用法：useModalDialog
export interface UseModalDialogOptions extends Omit<ModalDialogProps, "open" | "onOpenChange"> {
  defaultOpen?: boolean;
}

export function useModalDialog(options: UseModalDialogOptions = {}) {
  const [open, setOpen] = React.useState(options.defaultOpen ?? false);

  const modal = (
    <ModalDialog
      {...options}
      open={open}
      onOpenChange={setOpen}
    />
  );

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((prev) => !prev),
    Modal: modal,
    isOpen: open,
  };
}

// Hook 用法：useConfirmDialog
export interface UseConfirmDialogOptions extends Omit<ConfirmDialogProps, "open" | "onOpenChange"> {
  defaultOpen?: boolean;
}

export function useConfirmDialog(options: UseConfirmDialogOptions = {}) {
  const [open, setOpen] = React.useState(options.defaultOpen ?? false);

  const confirm = (
    <ConfirmDialog
      {...options}
      open={open}
      onOpenChange={setOpen}
    />
  );

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((prev) => !prev),
    Confirm: confirm,
    isOpen: open,
  };
}
