<template>
  <v-card>
    <v-toolbar
      color="primary"
    >
      <v-toolbar-title>井盖检测</v-toolbar-title>
            <!-- 对话框 -->
            <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon  v-bind="activatorProps">
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

          <v-btn @click="dialog = false" style="background-color: #375891;">
            取消
          </v-btn>

          <v-btn @click="quit" style="background-color: #a25555;">
            确定
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
    </v-toolbar>
    <v-layout>
      
      <v-main :style="{ '--v-layout-left': mainStyle }">
        <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab class="subtab" value="one">用户</v-tab>
      <v-tab class="subtab" value="two">上传图片</v-tab>
      <v-tab class="subtab" value="three">历史查询</v-tab>
      <v-tab class="subtab" value="four">任务日历</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
            <div class="contain">
                <User />
            </div>
        </v-window-item>

        <v-window-item value="two">
            <div class="file">
                <UpLoadFiles />
            </div>
        </v-window-item>

        <v-window-item value="three">
          <DataQuery />
        </v-window-item>
        <v-window-item value="four">
          <WorkList />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
        
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import DataQuery from '@/components/DataQuery.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const screenWidth = ref(window.innerWidth);

const router = useRouter();
const tab = ref(null)

// 对话框
const dialog = ref(false)

// 退出登录
const quit = ()=> {
    dialog.value = false;
    localStorage.removeItem('token');
    router.push('/login')
}

// 跳转页面
onMounted(() => {
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value > 600) {
      router.push('/'); // 在小于600时跳转到另一个页面
    }
  });
});

</script>

<style lang="scss" scoped>
:deep(.v-card) {
    margin-top: -2px;
}
:deep(.subtab) {
    width: 25% !important;
}
.contain {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 80vh;
}

</style>