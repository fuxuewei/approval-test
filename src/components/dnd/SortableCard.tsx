"use client";

import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReactNode } from "react";
import { createDndId, DND_TYPES } from "./utils";

interface SortableCardProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
  isDragOverlay?: boolean;
  className?: string;
  data?: Record<string, unknown>;
}

export function SortableCard({
  id,
  children,
  disabled = false,
  isDragOverlay = false,
  className,
  data = {},
}: SortableCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: createDndId.card(id),
    data: {
      type: DND_TYPES.CARD,
      ...data,
    },
    disabled: disabled || isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isDragOverlay && "shadow-2xl rotate-2 scale-105",
        isDragging && "opacity-50",
        className,
      )}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
