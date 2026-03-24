// 导出 Tag 组件
export { Tag, TagGroup, tagVariants, type TagGroupProps, type TagProps } from "./tag";

// Icon 组件 - 统一使用 <Icon name="XXX" />
export { Icon, type IconProps } from "@/components/icons";

// ModalDialog 通用弹窗组件
export {
  ModalDialog,
  ConfirmDialog,
  useModalDialog,
  useConfirmDialog,
  type ModalDialogProps,
  type ConfirmDialogProps,
  type UseModalDialogOptions,
  type UseConfirmDialogOptions,
  type ModalButtonConfig,
  type ModalButtonType,
} from "./modal-dialog";
