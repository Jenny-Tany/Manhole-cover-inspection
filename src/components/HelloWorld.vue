<template>
  <v-card>
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
    </div>
  </v-card>
</template>

<script setup>
import test from '@/pages/test.vue';
import DataQuery from '@/components/DataQuery.vue';

// 引入图标
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiFormatListBulleted, mdiHistory, mdiUpload } from '@mdi/js';
const path = mdiUpload;
const path1 = mdiHistory;
const path2 = mdiFormatListBulleted;

const tab = ref('option-1');
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
</style>