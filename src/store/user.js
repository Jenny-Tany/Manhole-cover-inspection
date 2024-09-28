import { status } from "nprogress";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "",
    token: "",
    status: "",
  }),
  actions: {
    setUser(userName, token, status) {
      this.userName = userName;
      this.token = token;
      this.status = status;
    },
    clearUser() {
      this.userName = "";
      this.token = "";
    },
    getUserInfo() {
      return {
        userName: this.userName,
        token: this.token,
        status: this.status,
      };
    },
  },
});
