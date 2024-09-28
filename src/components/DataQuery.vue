<template>
  <div class="contain">
    <v-container>
      <v-row>
        <v-col v-for="photo in photos" :key="photo.id">
          <v-card class="mx-auto" max-width="380" height="400px">
            <v-img
              class="align-end text-white"
              height="280"
              :src="photo.resultUrl"
              cover
            >
              <v-card-title>{{ photo.uploadTime }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4">
              上传时间：{{ photo.uploadTime }}
            </v-card-subtitle>

            <v-card-text>
              <div>损坏类型：{{ photo.boxInfo }}</div>
              <div>建筑物裂缝位置：{{ photo.location }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange"> Share </v-btn>

              <v-btn color="orange"> Explore </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 分页 -->
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="4"
        :total-visible="4"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/store/user";
import { fetchPhoto } from "@/apis/photo";
import { ElMessage } from "element-plus";
import { crackCategories } from "@/data/buildingCracks";
const userStore = useUserStore();
const page = ref(1);
const photos = ref([]);
onMounted(() => {
  fetchData(page.value);
});

watch(page, (newPage) => {
  fetchData(newPage);
});
// production环境下，使用下面的代码
// function fetchData(pageNum) {
//   const pageSize = 6;
//   const { userName } = userStore.getUserInfo();

//   fetchPhoto(pageNum, pageSize, userName)
//     .then((data) => {
//       console.log("In DataQuery.vue data::: ", data);
//       photos.value = data.data.rows;
//     })
//     .catch((error) => {
//       ElMessage.error(`获取数据失败：${error}`);
//     });
// }
// development环境下，使用下面的代码
function fetchData(pageNum) {
  const pageSize = 6;

  // 定义中国地理位置数组
  const locations = [
    "湖南省衡阳市来阳市小水镇金柴岭",
    "北京市朝阳区望京街道",
    "上海市浦东新区陆家嘴",
    "广东省广州市天河区",
    "四川省成都市武侯区",
    "浙江省杭州市西湖区",
  ];
  // 从 crackCategories 中获取损坏类型数组
  const crackCategoriesArray = Object.values(crackCategories);

  // 模拟数据
  const mockPhotos = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    resultUrl: `/testimg${index + 1}.jpg`,
    uploadTime: `2024-09-${index + 1}`, // 模拟上传时间
    boxInfo:
      crackCategoriesArray[
        Math.floor(Math.random() * crackCategoriesArray.length)
      ], // 随机选择损坏类型
    location: locations[Math.floor(Math.random() * locations.length)], // 随机选择位置
  }));

  // 更新 photos 数据
  photos.value = mockPhotos;
}
</script>

<style lang="scss" scoped>
.contain {
  margin-top: 4vh;
  margin-bottom: 1px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

:deep(.v-col) {
  flex: 0 0 calc(33.33% - 1rem) !important;
  margin-bottom: 1rem;
}

.v-card {
  background-color: rgba(168, 201, 238, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
@media (max-width: 768px) {
  :deep(.v-col) {
    flex: 0 0 calc(100%) !important; /* 在小于768px时，一行展示两张图片 */
  }
}
</style>
