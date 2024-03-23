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
      >
        <el-button size="medium" type="primary">选择图片</el-button>
      </el-upload>
    </el-form-item>
    <el-button type="primary" size="large">点击上传</el-button>
  </el-form>
</div>

<!-- <form action="/api/upload" method="post" enctype="multipart/form-data">
  photo:<input type="file" name="images">
  <input @click="prevent" type="submit" value="submit">
</form> -->
<!-- <el-upload
  class="upload-demo"
  drag
  action="/api/upload"
  :headers="{ 'Content-Type': 'multipart/form-data' }"
  method="post"
  name="images"
  list-type="picture"
  multiple
>
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
  <div class="el-upload__text">
    Drop file here or <em>click to upload</em>
  </div>
  <template #tip>
    <div class="el-upload__tip">
      jpg/png files with a size less than 500kb
    </div>
  </template>
</el-upload> -->

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
      <img :src="item" alt="Image" style="width: 230px; height: 280px;">
    </div>
    </div>

  </div>
</div>

  
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue';
const value = ref('')

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

// const handleSuccess = (response, file) => {

// if (response && response.data) {

// console.log('File uploaded successfully');

// console.log('Data returned by the server:', response.data);

// // 将后端返回的图片URL保存到formData中

// formData.value.images = response.data;

// } 
const handleSuccess = (response, file) => {  
  if (response && response.data) {  
    console.log('File uploaded successfully');  
    console.log('Data returned by the server:', response.data);  

    // 遍历数组，获取每个对象的 output_url
    response.data.forEach(item => {
      console.log('output_url:', item.output_url);
      // 如果需要将 output_url 存储到 formData 中，可以在这里进行操作
      formData.value.images.push(item.output_url);
    });

  } else {  
    console.warn('No data returned by the server');  
  }  
};

// const submitForm = () => {
//   uploadForm.value.validate((valid) => {
//     if (valid) {
//       uploadForm.value.$el.submit();
//     } else {
//       return false;
//     }
//   });
// };
const prevent = (e) => {
  e.preventDefault
}

// import { ref } from 'vue';

// const fileList = ref([
//   {
//     name: 'food.jpeg',
//     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imagesMogr2/thumbnail/360x360/format/webp/quality/100',
//   },
//   {
//     name: 'food2.jpeg',
//     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imagesMogr2/thumbnail/360x360/format/webp/quality/100',
//   },
// ]);

// const handleChange = (uploadFile, uploadFiles) => {
//   fileList.value.push(uploadFiles[uploadFiles.length - 1]);
//   console.log(fileList.value);
// };



// const handleFileUpload = (files) => {
//   for (let i = 0; i < files.length; i++) {
//     const formData = new FormData();
//     formData.append('images', files[i]); 

//     fetch('/api/photos', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Files uploaded successfully');
//       } else {
//         console.error('Failed to upload files');
//       }
//     })
//     .catch(error => {
//       console.error('Error uploading files:', error);
//     });
//   }
// }
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
      flex-wrap: wrap;
    }
  }
  .select {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
  }
  .photo {
    margin-top: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>