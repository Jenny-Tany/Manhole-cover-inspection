<template>
  <div class="contain">
    <v-container>
      <v-row>
        <v-col v-for="photo in photos" :key="photo.id">
          <v-card class="mx-auto" max-width="380" height="450px">
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
              <div>损坏类型：{{ formatDamageType(photo.boxInfo) }}</div>
              <div>建筑物裂缝位置：{{ photo.location }}</div>
              <el-button type="primary" @click="showRepairAdvice(photo)">
                查看检修建议
              </el-button>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange"> Share </v-btn>
              <v-btn color="orange"> Explore </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <el-dialog v-model="repairDialogVisible" title="检修建议" width="30%">
      <div class="repair-advice">
        <h3>损坏类型：{{ currentDamageType }}</h3>
        <p>{{ currentRepairAdvice }}</p>
      </div>
    </el-dialog>
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
const locations = [
  "广西壮族自治区桂林市象山区中山南路123号",
  "广西壮族自治区桂林市秀峰区解放东路456号",
  "广西壮族自治区桂林市叠彩区滨江路789号",
  "广西壮族自治区桂林市七星区七星路101号",
  "广西壮族自治区桂林市雁山区雁山街道202号",
  "广西壮族自治区桂林市临桂区临桂大道303号",
];
watch(page, (newPage) => {
  fetchData(newPage);
});
// production环境下，使用下面的代码
function fetchData(pageNum) {
  const pageSize = 6;
  const { userName } = userStore.getUserInfo();

  fetchPhoto(pageNum, pageSize, userName)
    .then((data) => {
      console.log("In DataQuery.vue data::: ", data);
      photos.value = data.data.rows;
      photos.value.map((item) => {
        item.location = locations[Math.floor(Math.random() * locations.length)];
      });
    })
    .catch((error) => {
      ElMessage.error(`获取数据失败：${error}`);
    });
}
// development环境下，使用下面的代码
// function fetchData(pageNum) {
//   const pageSize = 6;

//   // 定义中国地理位置数组
//   const locations = [
//     "广西壮族自治区桂林市象山区中山南路123号",
//     "广西壮族自治区桂林市秀峰区解放东路456号",
//     "广西壮族自治区桂林市叠彩区滨江路789号",
//     "广西壮族自治区桂林市七星区七星路101号",
//     "广西壮族自治区桂林市雁山区雁山街道202号",
//     "广西壮族自治区桂林市临桂区临桂大道303号",
//   ];
//   // 从 crackCategories 中获取损坏类型数组
//   const crackCategoriesArray = Object.values(crackCategories);

//   // 模拟数据
//   const mockPhotos = Array.from({ length: 6 }, (_, index) => ({
//     id: index + 1,
//     resultUrl: `/testimg${index + 1}.jpg`,
//     uploadTime: `2024-09-${index + 1}`, // 模拟上传时间
//     boxInfo:
//       crackCategoriesArray[
//         Math.floor(Math.random() * crackCategoriesArray.length)
//       ], // 随机选择损坏类型
//     location: locations[Math.floor(Math.random() * locations.length)], // 随机选择位置
//   }));

//   // 更新 photos 数据
//   photos.value = mockPhotos;
// }

// 添加对话框控制变量
const repairDialogVisible = ref(false);
const currentDamageType = ref("");
const currentRepairAdvice = ref("");

// 添加格式化和建议函数
const formatDamageType = (str) => {
  if (!str) return "";

  const damageTypeMap = {
    0: "严重裂缝",
    1: "轻微剥离",
    2: "钢筋暴露",
    3: "锈迹斑斑",
    4: "表面剥落",
    5: "瓷砖有裂缝",
    6: "瓷砖剥离",
    7: "瓷砖脱落",
  };

  let formattedStr = str;
  Object.entries(damageTypeMap).forEach(([key, value]) => {
    const regex = new RegExp(key, "g");
    formattedStr = formattedStr.replace(regex, value);
  });

  const uniqueTypes = [...new Set(formattedStr.split(/\s+/))];
  return uniqueTypes.join("、");
};

const getRepairAdvice = (damageType) => {
  const adviceMap = {
    严重裂缝: "建议立即进行结构加固修复，可能需要注浆处理或更换受损构件。",
    轻微剥离: "建议及时修补表面，防止进一步恶化。使用环氧树脂进行表面处理。",
    钢筋暴露: "需要立即进行防锈处理和混凝土修复，防止钢筋进一步锈蚀。",
    锈迹斑斑: "建议清除锈迹，进行防锈处理，并检查周边结构是否受损。",
    表面剥落: "需要清理剥落部分，使用修补砂浆进行修复，并做好防水处理。",
    瓷砖有裂缝: "建议更换破损瓷砖，检查基层是否存在问题。",
    瓷砖剥离: "需要检查基层，重新铺贴脱落瓷砖，并做好防水处理。",
    瓷砖脱落: "全面检查瓷砖铺贴质量，可能需要大面积重新铺贴。",
  };

  const types = damageType.split("、");
  const advices = types.map((type) => adviceMap[type] || "暂无具体建议");
  return advices.join("\n\n");
};

// 添加显示检修建议的方法
const showRepairAdvice = (photo) => {
  currentDamageType.value = formatDamageType(photo.boxInfo);
  currentRepairAdvice.value = getRepairAdvice(currentDamageType.value);
  repairDialogVisible.value = true;
};
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
:deep(.el-button) {
  margin-top: 10px;
  background-color: #4765b8;
  &:hover {
    background-color: #314991;
  }
}
// 添加检修建议对话框样式
.repair-advice {
  padding: 20px;
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
  p {
    line-height: 1.6;
    color: #666;
    white-space: pre-line;
  }
}
</style>
