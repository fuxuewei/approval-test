// 这里用 Dialog 不用 AlertDialog，因为 AlertDialog 有 bug，Portal 会挂载两次，
// 导致关掉 dialog 以后 body 上有一个 pointer-events: none，页面无法点击
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { createRoot } from "react-dom/client";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialogComponent = ({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
}: ConfirmDialogOptions & {
  onClose: (isConfirmed: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open && confirmed === null) {
          setConfirmed(false);
        }
      }}
    >
      <DialogContent
        className="flex w-96 flex-col px-4 py-3"
        onCloseAutoFocus={() => {
          // 这样能确保清理工作在动画完全结束后进行，避免动画被中断
          onClose(confirmed ?? false);
        }}
      >
        <DialogHeader>
          <DialogTitle className="p-1 font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-ink/50 flex-1 p-1 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setConfirmed(false);
              setIsOpen(false);
            }}
          >
            {cancelText}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setConfirmed(true);
              setIsOpen(false);
            }}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function confirm(title: string, description: string): Promise<boolean>;
export function confirm(options: ConfirmDialogOptions): Promise<boolean>;

export function confirm(titleOrOptions: string | ConfirmDialogOptions, description?: string) {
  return new Promise<boolean>((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const cleanup = () => {
      root.unmount();
      container.remove();
    };

    const options =
      typeof titleOrOptions === "string"
        ? {
            title: titleOrOptions,
            description: description ?? "",
          }
        : titleOrOptions;

    root.render(
      <ConfirmDialogComponent
        {...options}
        onClose={(isConfirmed) => {
          cleanup();
          resolve(isConfirmed);
        }}
      />,
    );
  });
}
