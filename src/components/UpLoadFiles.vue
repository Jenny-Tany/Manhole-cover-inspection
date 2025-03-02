<template>
  <div class="files">
    <div class="title">
      <span>上传建筑物裂缝图片进行检测</span>
    </div>
    <v-divider style="margin-top: 8px"></v-divider>

    <div class="form">
      <el-form
        :model="formData"
        :rules="formRules"
        action="/api/upload"
        method="post"
        enctype="multipart/form-data"
      >
        <el-form-item label="图片:">
          <el-upload
            class="upload-demo"
            action="/api/upload"
            :show-file-list="false"
            multiple
            name="images"
            :on-success="handleSuccess"
            :headers="uploadHeaders"
          >
            <el-button size="medium" type="primary">选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-button type="primary" size="large">点击上传</el-button>
      </el-form>
    </div>

    <div class="show">
      <v-container>
        <v-row>
          <v-col v-for="photo in formData.images" :key="photo.id">
            <v-card class="mx-auto" max-width="380" height="371px">
              <v-img
                class="align-end text-white"
                height="250"
                :src="photo.output_url"
                cover
                @click="showImageDialog(photo)"
              >
                <v-card-title>{{ photo.uploadTime }}</v-card-title>
              </v-img>

              <v-card-text>
                <div>损坏类型：{{ formatDamageType(photo.box_info) }}</div>
                <div>建筑物裂缝位置：{{ photo.location }}</div>
                <el-button type="primary" @click="showRepairAdvice(photo)">
                  查看检修建议
                </el-button>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 图片查看对话框 -->
    <el-dialog v-model="dialogVisible" title="图片详情" width="50%">
      <img :src="currentImage" style="width: 100%" />
    </el-dialog>

    <!-- 检修建议对话框 -->
    <el-dialog v-model="repairDialogVisible" title="检修建议" width="30%">
      <div class="repair-advice">
        <h3>损坏类型：{{ currentDamageType }}</h3>
        <p>{{ currentRepairAdvice }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

const value = ref("");
const token = ref(localStorage.getItem("token"));
const uploadHeaders = {
  token: token.value,
};

// 对话框控制变量
const dialogVisible = ref(false);
const repairDialogVisible = ref(false);
const currentImage = ref("");
const currentDamageType = ref("");
const currentRepairAdvice = ref("");

const options = [
  {
    value: "good",
    label: "good",
  },
  {
    value: "broke",
    label: "broke",
  },
  {
    value: "circle",
    label: "circle",
  },
  {
    value: "uncovered",
    label: "uncovered",
  },
];

const formData = ref({
  images: [],
});

const formRules = {
  images: [
    { required: true, message: "Please upload a photo", trigger: "change" },
  ],
};

// 格式化损坏类型
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

  // 使用正则表达式全局替换所有数字
  let formattedStr = str;
  Object.entries(damageTypeMap).forEach(([key, value]) => {
    const regex = new RegExp(key, "g");
    formattedStr = formattedStr.replace(regex, value);
  });

  // 去除重复的损坏类型并用逗号分隔
  const uniqueTypes = [...new Set(formattedStr.split(/\s+/))];
  return uniqueTypes.join("、");
};

// 获取检修建议
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
  // 处理多种损坏类型的情况
  const types = damageType.split("、");
  const advices = types.map((type) => adviceMap[type] || "暂无具体建议");

  // 用换行符连接多个建议
  return advices.join("\n\n");
};

const handleSuccess = (response, file) => {
  if (response && response.data) {
    console.log("File uploaded successfully");
    console.log("Data returned by the server:", response.data);

    response.data.forEach((item) => {
      formData.value.images.push({
        output_url: item.output_url,
        box_info: item.box_info,
        location: item.location,
      });
    });
  } else {
    console.warn("No data returned by the server");
  }
};

// 显示图片对话框
const showImageDialog = (photo) => {
  currentImage.value = photo.output_url;
  dialogVisible.value = true;
};

// 显示检修建议对话框
const showRepairAdvice = (photo) => {
  currentDamageType.value = formatDamageType(photo.box_info);
  currentRepairAdvice.value = getRepairAdvice(currentDamageType.value);
  repairDialogVisible.value = true;
};

const prevent = (e) => {
  e.preventDefault;
};
</script>

<style lang="scss" scoped>
.contain {
  position: relative;
  margin-top: 20px;
}
button {
  background-color: #4765b8;
  padding: 12px;
}
button:hover {
  background-color: #516cbc;
}
.form {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 5vh;
}
.title {
  padding: 1px;
  font-weight: 500;
  font-size: 20px;
  color: #285193;
  padding: 8px 0;
  margin-top: 3px;

  span {
    padding: 10px;
    border-radius: 8px;
  }
  .show {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    min-height: 100vh;
  }
}
.select {
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  margin-top: 2vh;
}
.files {
  min-height: 100vh;
}
:deep(.v-col) {
  flex: 0 0 calc(25% - 1rem) !important;
  margin-bottom: 1rem;
}
@media (max-width: 768px) {
  :deep(.v-col) {
    flex: 0 0 calc(50%) !important;
  }
}
.repair-advice {
  padding: 20px;
  h3 {
    margin-bottom: 15px;
    color: #333;
  }
  p {
    line-height: 1.6;
    color: #666;
  }
}
</style>
