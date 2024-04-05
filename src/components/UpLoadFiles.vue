<template>
  <!-- <v-file-input
    label="上传图片"
    prepend-icon="mdi-camera"
    counter
    multiple
    show-size
    @change="handleFileUpload"
  ></v-file-input> -->
<div class="contain">
  <div class="title">
  <span>上传井盖图片进行检测</span>
</div>
<v-divider></v-divider>

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
    <div class="select">
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
    </div>
    

  <div class="photo">
  <div v-for="item in formData.images" :key="item.id">
    <img :src="item.output_url" alt="Image" style="width: 230px; height: 280px;">
    <p>检测类型：{{ item.box_info }}</p>
  </div>
  <!-- <div class="photo">
      <v-container>
    <v-row>
      <v-col v-for="item in formData.images" :key="item.id">
        <v-card class="mx-auto" max-width="400">
          <v-img class="align-end text-white" height="300" :src="item.output_url" cover>
            <v-card-title></v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            111
          </v-card-subtitle>

          <v-card-text>
            <div>检测类型：{{ item.box_info }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange">
              Share
            </v-btn>

            <v-btn color="orange">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>


</div> -->
<div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      :total-visible="4"
    ></v-pagination>
</div>
  </div>
</div>
</div>
  
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';

const page = ref(1)
const value = ref('')
const token = ref(localStorage.getItem('token'));
const uploadHeaders = {
  'token': token.value
};

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
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
      console.log('output_url:', item.output_url);
      console.log('box_info:', item.box_info);

      // 将 output_url 和 box_info 存储到 formData 中
      formData.value.images.push({
        output_url: item.output_url,
        box_info: item.box_info
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
    margin-top: 2vh;;

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
    }
  }
  .select {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    margin-top: 2vh;
  }
		
  .photo {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.photo div {
  flex: 0 0 calc(25% - 20px); /* 让每个图片元素占据三分之一的宽度，减去间距 */
  margin-bottom: 20px; /* 设置图片元素之间的间距 */
}
</style>