import { ElMessage } from "element-plus";
export const showErrorMessage = (message) => {
  ElMessage.error(message);
};
export const showSuccessMessage = (message) => {
  ElMessage.success(message);
};
export const showWarningMessage = (message) => {
  ElMessage.warning(message);
};
export const showInfoMessage = (message) => {
  ElMessage.info(message);
};
