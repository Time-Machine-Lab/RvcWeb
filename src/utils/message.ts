import { ElMessage, ElNotification } from "element-plus";

export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export const message = {
  // 顶部小弹窗
  success(msg: string) {
    ElMessage.success(msg);
  },
  warning(msg: string) {
    ElMessage.warning(msg);
  },
  error(msg: string) {
    ElMessage.error(msg);
  },
  // 右上角通知
  notify(title: string, content: string, type: NotificationType) {
    ElNotification({
      title: title,
      message: content,
      type: type,
    });
  },
};
