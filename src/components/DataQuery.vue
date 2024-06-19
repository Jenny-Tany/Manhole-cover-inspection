<template>
    <div class="contain">
      <v-container>
    <v-row>
      <v-col v-for="photo in photos" :key="photo.id">
        <v-card class="mx-auto" max-width="380" height="400px">
          <v-img class="align-end text-white" height="280" :src="photo.resultUrl" cover>
            <v-card-title>{{ photo.uploadTime }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            上传时间：{{ photo.uploadTime }}
          </v-card-subtitle>

          <v-card-text>
            <div>损坏类型：{{ photo.boxInfo }}</div>
            <div>井盖位置：{{ photo.location }}</div>
          </v-card-text>

          <!-- <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions> -->
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
import { ref, onMounted, watch } from 'vue'

const page = ref(1)
const photos = ref([]);

onMounted(() => {
    fetchData(page.value);
});

watch(page, (newPage) => {
    fetchData(newPage);
});

function fetchData(pageNum) {
    const pageSize = 6; // 每页的记录数
    const token = localStorage.getItem('token'); // 从 localStorage 中获取 token

    fetch(`/api/photos?page_num=${pageNum}&pageSize=${pageSize}`, {
        headers: {
            'token': token
        }
    })
      .then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(data => {
          console.log(data); // 处理后端返回的数据
          photos.value = data.data.rows;
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
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