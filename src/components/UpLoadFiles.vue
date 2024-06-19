<template>
<div class="files">
  <div class="title">
  <span>上传井盖图片进行检测</span>
</div>
<v-divider style="margin-top: 8px;"></v-divider>

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


  <!-- 返回的图片 -->
  <div class="show">
    <!-- <div class="select">
      <el-select
      v-model="value"
      placeholder="选择类型"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    </div> -->
    
    <v-container>
    <v-row>
      <v-col v-for="photo in formData.images" :key="photo.id">
        <v-card class="mx-auto" max-width="380" height="350px">
          <v-img class="align-end text-white" height="250" :src="photo.output_url" cover>
            <v-card-title>{{ photo.uploadTime }}</v-card-title>
          </v-img>

          <!-- <v-card-subtitle class="pt-4">
            上传时间：{{ photo.uploadTime }}
          </v-card-subtitle> -->

          <v-card-text>
            <div>损坏类型：{{ photo.box_info }}</div>
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
</div>
</div>
  
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';

const value = ref('')
const token = ref(localStorage.getItem('token'));
const uploadHeaders = {
  'token': token.value
};

const options = [
  {
    value: 'good',
    label: 'good',
  },
  {
    value: 'broke',
    label: 'broke',
  },
  {
    value: 'circle',
    label: 'circle',
  },
  {
    value: 'uncovered',
    label: 'uncovered',
  }
]

const formData = ref({
  images: []
});

const formRules = {
  images: [{ required: true, message: 'Please upload a photo', trigger: 'change' }]
};

const handleSuccess = (response, file) => {  
  if (response && response.data) {  
    console.log('File uploaded successfully');  
    console.log('Data returned by the server:', response.data);  

    // 遍历数组，获取每个对象的 output_url 和 box_info
    response.data.forEach(item => {
      console.log(item);
      console.log('output_url:', item.output_url);
      console.log('box_info:', item.box_info);

      // 将 output_url 和 box_info 存储到 formData 中
      formData.value.images.push({
        output_url: item.output_url,
        box_info: item.box_info,
        location: item.location
      });
    });

  } else {  
    console.warn('No data returned by the server');  
  }  
};

const prevent = (e) => {
  e.preventDefault
}

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
    font-size: 25px;
    color: #285193;
    padding: 8px 0;
    margin-top: 3px;;

    span {
      background-color: #e5e8f2;
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
    flex: 0 0 calc(50%) !important; /* 在小于768px时，一行展示两张图片 */
  }
}

</style>