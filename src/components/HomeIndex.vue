<template>
  <v-card>
    <v-toolbar :elevation="8" color="primary">
      <v-toolbar-title>建筑物裂缝检测</v-toolbar-title>
      <!-- 对话框 -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" max-width="400" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon v-bind="activatorProps">
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </template>

          <v-card
            color="#3268a6"
            prepend-icon="mdi-export"
            title="确定要退出该账号吗?"
          >
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false" style="background-color: #375891">
                取消
              </v-btn>

              <v-btn @click="quit" style="background-color: #a25555">
                确定
              </v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="toggleRail1"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="管理员"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="toggleRail()"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab value="option-1">
              <v-icon start> mdi-account </v-icon>
              用户
            </v-tab>
            <v-tab value="option-2">
              <v-icon start>
                <svg-icon type="mdi" :path="path"></svg-icon>
                mdi-lock
              </v-icon>
              上传图片
            </v-tab>
            <v-tab value="option-3">
              <v-icon start>
                <svg-icon type="mdi" :path="path1"></svg-icon>
                mdi-access-point
              </v-icon>
              历史记录
            </v-tab>
            <v-tab value="option-4">
              <v-icon start>
                mdi-access-point
                <svg-icon type="mdi" :path="path2"></svg-icon>
              </v-icon>
              任务日历
            </v-tab>
            <v-tab value="option-5">
              <v-icon start>
                <!-- mdi-access-point -->
                <svg-icon type="mdi" :path="path2"></svg-icon>
              </v-icon>
              查看建筑物裂缝
            </v-tab>

            <v-tab value="option-6" @click="emitToMap">
              <v-icon start>
                <svg-icon type="mdi" :path="path1"></svg-icon>
                mdi-access-point
              </v-icon>
              数据中台
            </v-tab>
          </v-tabs>
        </div>
      </v-navigation-drawer>
      <v-main :style="{ '--v-layout-left': mainStyle }">
        <v-window v-model="tab">
          <v-window-item value="option-1">
            <div class="contain">
              <User />
            </div>
          </v-window-item>
          <v-window-item value="option-2">
            <UpLoadFiles />
            <div style="text-align: center">
              <v-col cols="auto">
                <v-btn color="indigo" size="large">开始检测</v-btn>
              </v-col>
            </div>
          </v-window-item>
          <v-window-item value="option-3">
            <DataQuery />
          </v-window-item>
          <v-window-item value="option-4">
            <WorkList />
          </v-window-item>
          <v-window-item value="option-5">
            <CheckLoc />
          </v-window-item>
          <v-window-item value="option-6">
            <Map />
          </v-window-item>
        </v-window>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import phoneView from "@/pages/phoneView.vue";
import DataQuery from "@/components/DataQuery.vue";
import User from "@/components/User.vue";
// import UpLoadFiles from '@/components/UpLoadFiles.vue'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import eventBus from "@/utils/eventBus";

const emitToMap = () => {
  eventBus.emit("map", "changeToMap");
};
const screenWidth = ref(window.innerWidth);
onMounted(() => {
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value < 600) {
      router.push("/phone"); // 在小于600时跳转到另一个页面
    }
  });
});

// 对话框
const dialog = ref(false);
// 退出登录
const router = useRouter();
const quit = () => {
  dialog.value = false;
  localStorage.removeItem("token");
  router.push("/login");
};

// 引入图标
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFormatListBulleted, mdiHistory, mdiUpload } from "@mdi/js";
const path = mdiUpload;
const path1 = mdiHistory;
const path2 = mdiFormatListBulleted;

const tab = ref("option-1");

// 抽屉式导航
const drawer = ref(true);
const rail = ref(true);
// const selectedComponent = ref(User)

const mainStyle = ref("148px");

const toggleRail = () => {
  // mainStyle.value = mainStyle.value === '148px' ? '5px' : '148px';
  mainStyle.value = "5px";
  rail.value = !rail.value;
};
const toggleRail1 = () => {
  // mainStyle.value = mainStyle.value === '148px' ? '5px' : '148px';
  mainStyle.value = "148px";
  rail.value = false;
};
</script>

<style lang="scss" scoped>
.v-window {
  width: 100%;
  margin: 10vh;
  margin-bottom: 5vh;
}
.contain {
  min-height: 100vh;
}
.v-window {
  margin: 0 0 5vh 3vh;
}
.v-navigation-drawer {
  width: 156px !important;
}
.v-navigation-drawer--rail {
  width: 40px !important;
}
</style>
