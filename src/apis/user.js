import { ElMessage } from "element-plus";
import request from "./request";
// 封装的登录函数
export const loginUser = async (username, password) => {
  try {
    const response = await request.post("/login", {
      userName: username,
      password: password,
    });

    const data = response;

    if (response.code === 1) {
      const token = data.data.token;
      const status = data.data.status;

      // 存储 token 和用户信息
      localStorage.setItem("token", token);
      localStorage.setItem("status", status);

      // 弹出消息框
      ElMessage({ message: "登录成功！", type: "success" });

      return { token, status, message: data.msg };
    } else {
      return { status: "error", message: "登录请求失败" };
    }
  } catch (error) {
    console.error("登录请求出错：", error);
    return { status: "error", message: "登录请求出错：" };
  }
};
