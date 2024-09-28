import { showSuccessMessage } from "@/utils/showMessage";
import request from "./request";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const dialog = ref(false);
const missions = ref([]);

// 接受任务
export const acceptTask = async (id) => {
  dialog.value = false;
  try {
    const data = await request.get(`/receive/${id}`);
    console.log("In task.js acceptTask::: ", data);
  } catch (error) {
    console.error("接受任务出错:", error);
  }
};

// 完成任务
export const handleFinish = async (id) => {
  dialog.value = false;
  try {
    const data = await request.get(`/complete/${id}`);
    console.log("In task.js  handleFinish::: ", data);
    ElMessage({
      message: "完成任务成功",
      type: "success",
    });
  } catch (error) {
    console.error("完成任务出错:", error);
  }
};

// 获取任务列表
export const getTasks = async () => {
  try {
    const data = await request.get("/mission");
    console.log("In task.js getTasks", data);
    missions.value = data.data || []; // 更新任务列表
  } catch (error) {
    console.error("获取任务列表出错:", error);
  }
};

export { dialog, missions }; // 导出 dialog 和 missions
