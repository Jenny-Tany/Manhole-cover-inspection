import { ElMessage } from "element-plus";
import request from "./request";

export const getLocationData = async (token) => {
  try {
    const response = await request.get("/get_location");
    return response;
  } catch (error) {
    ElMessage({ message: "获取位置数据请求出错", type: "error" });
    throw error;
  }
};
