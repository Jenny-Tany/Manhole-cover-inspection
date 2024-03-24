<template>
  <!-- <v-card>
    <v-toolbar
      color="primary"
    >
      <v-toolbar-title>井盖检测</v-toolbar-title>
    </v-toolbar>
    
    <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        color="primary"
        direction="vertical"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          用户
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            <svg-icon type="mdi" :path="path"></svg-icon>
          </v-icon>
          上传图片
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            <svg-icon type="mdi" :path="path1"></svg-icon>
          </v-icon>
          历史记录
        </v-tab>
        <v-tab value="option-4">
          <v-icon start>
            <svg-icon type="mdi" :path="path2"></svg-icon>
          </v-icon>
          任务日历
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <User />
        </v-window-item>
        <v-window-item value="option-2">
          <UpLoadFiles />
          <div style="text-align: center;">
          </div>
        </v-window-item>
        <v-window-item value="option-3">
          <DataQuery />
        </v-window-item>
        <v-window-item value="option-4">
          <WorkList />
        </v-window-item>
      </v-window>
    </div>
  </v-card> -->

  <v-card>
    <v-toolbar
      color="primary"
    >
      <v-toolbar-title>井盖检测</v-toolbar-title>
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
          title="John user"
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

        <!-- <v-list density="compact" nav @click="selectComponent">
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-upload" title="上传图片" value="files"></v-list-item>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-history" title="历史记录" value="history"></v-list-item>

        </v-list> -->
        <div class="d-flex flex-row">
      <v-tabs
        v-model="tab"
        color="primary"
        direction="vertical"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          用户
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            <svg-icon type="mdi" :path="path"></svg-icon>
            <!-- mdi-lock -->
          </v-icon>
          上传图片
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            <svg-icon type="mdi" :path="path1"></svg-icon>
            <!-- mdi-access-point -->
          </v-icon>
          历史记录
        </v-tab>
        <v-tab value="option-4">
          <v-icon start>
            <!-- mdi-access-point -->
            <svg-icon type="mdi" :path="path2"></svg-icon>
          </v-icon>
          任务日历
        </v-tab>
      </v-tabs>

    </div>
      </v-navigation-drawer>
      <v-main :style="{ '--v-layout-left': mainStyle }">
        <v-window v-model="tab">
        <v-window-item value="option-1">
          <User />
        </v-window-item>
        <v-window-item value="option-2">
          <UpLoadFiles />
          <div style="text-align: center;">
            <!-- <v-col cols="auto">
              <v-btn color="indigo" size="large">开始检测</v-btn>
            </v-col> -->
          </div>
        </v-window-item>
        <v-window-item value="option-3">
          <DataQuery />
        </v-window-item>
        <v-window-item value="option-4">
          <WorkList />
          <!-- <test /> -->
          <!-- <Map /> -->
        </v-window-item>
      </v-window>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import test from '@/pages/test.vue';
import DataQuery from '@/components/DataQuery.vue';
import User from '@/components/User.vue'
import UpLoadFiles from '@/components/UpLoadFiles.vue'

// 引入图标
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted, mdiHistory, mdiUpload } from '@mdi/js';
const path = mdiUpload;
const path1 = mdiHistory;
const path2 = mdiFormatListBulleted;

const tab = ref('option-1');

// 抽屉式导航
const drawer = ref(true);
const rail = ref(true);
const selectedComponent = ref(User)
const selectComponent = (value) => {
  if (value === 'account') {
    selectedComponent.value = User;
  } else if (value === 'files') {
    selectedComponent.value = UpLoadFiles;
  }
};
const mainStyle = ref('148px');

const toggleRail = () => {
  // mainStyle.value = mainStyle.value === '148px' ? '5px' : '148px';
  mainStyle.value = '5px';
  rail.value = !rail.value;
};
const toggleRail1 = () => {
  // mainStyle.value = mainStyle.value === '148px' ? '5px' : '148px';
  mainStyle.value = '148px';
  rail.value = false;
};
</script>

<style lang="scss" scoped>
  .v-window {
    width: 100%;
    margin: 10vh;
    margin-bottom: 5vh;
  }
  // :deep(.v-slide-group__container) {
  //   padding-right: 15px;
  //   border-right: 1px solid rgb(161, 161, 161) ;

  // }
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