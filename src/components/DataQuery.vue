<template>
    <div class="contain">
      <v-container>
    <v-row>
      <v-col v-for="photo in photos" :key="photo.id">
        <v-card class="mx-auto" max-width="400">
          <v-img class="align-end text-white" height="300" :src="photo.resultUrl" cover>
            <v-card-title>{{ photo.uploadTime }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pt-4">
            上传时间：{{ photo.uploadTime }}
          </v-card-subtitle>

          <v-card-text>
            <div>损坏类型：{{ photo.boxInfo }}</div>
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
    </div>

</template>

<script setup>
import {ref, onMounted} from 'vue'

const photos = ref([]);

onMounted(() => {
    const page_num = 4; // 页码
    const pageSize = 3; // 每页的记录数
    const token = localStorage.getItem('token'); // 从 localStorage 中获取 token

    fetch(`/api/photos?page_num=${page_num}&pageSize=${pageSize}`, {
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
            console.log(photos.value);
            // data.data.rows.forEach(item => {
            //   photos.value.push(item)
            //   // console.log(photos[0]);
            // });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
		
// SELECT dept_name, employee_id, max_salary
// FROM (
//     SELECT d.dept_name AS dept_name, s.employee_id AS employee_id, MAX(s.amount) AS max_salary,
//            ROW_NUMBER() OVER(PARTITION BY d.dept_name ORDER BY MAX(s.amount) DESC) AS rn
//     FROM salary s
//     JOIN department_employee de ON s.employee_id = de.employee_id
//     JOIN department d ON de.department_id = d.id
//     WHERE de.to_date > CURRENT_DATE
//     GROUP BY d.dept_name, s.employee_id
// ) t
// WHERE rn = 1;

</script>

<style lang="scss" scoped>
.contain {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4vh;
    margin-bottom: 1px;
}
</style>