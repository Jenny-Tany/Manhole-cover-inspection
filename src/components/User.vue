<template>
  <div class="contain">
    <!-- 附近井盖 -->
    <div class="near">
      <v-btn variant="outlined" @click="getPosition"> 点击查看附近井盖 </v-btn>
      <p>经度: {{ longitude }}</p>
      <p>纬度: {{ latitude }}</p>
      <div class="form">
        <div class="detail">
          <el-table ref="tableRef" :data="adaptedMissionData">
            <el-table-column prop="id" label="井盖序号" />

            <el-table-column
              prop="address"
              label="具体地址"
              width="280"
              :formatter="formatter"
            />
            <el-table-column prop="status" label="井盖状态" width="150">
              <template #default="scope">
                <div
                  :class="getStatusClass(scope.row.status)"
                  style="width: 100px"
                >
                  {{ scope.row.status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="distance" label="距离(m)" />
            <el-table-column prop="accept" label="是否接受此任务？" width="140">
              <template #default="scope">
                <div class="text-center pa-4">
                  <v-dialog v-model="dialog" max-width="400" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        @click="acceptTask(scope.row.id)"
                        v-bind="activatorProps"
                      >
                        &nbsp;接受任务
                      </v-btn>
                    </template>

                    <v-card
                      prepend-icon="mdi-map-marker"
                      text="是否要接受此任务"
                      title="任务"
                    >
                      <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false"> 取消 </v-btn>
                        <v-btn @click="handleConfirm(scope.row.id)">
                          确定
                        </v-btn>
                      </template>
                    </v-card>
                  </v-dialog>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 查看任务清单 -->
    <div class="tasks">
      <v-btn variant="outlined" @click="getTasks"> 点击查看任务清单 </v-btn>
      <!-- <v-data-table :missions="missions"></v-data-table> -->
      <div class="form">
        <div class="detail">
          <!-- <el-button @click="resetDateFilter">Reset Date Filter</el-button>
      <el-button @click="clearFilter">Reset All Filters</el-button> -->
          <el-table ref="tableRef" :data="missions">
            <el-table-column prop="id" label="井盖序号" />
            <el-table-column prop="latitude" label="纬度" />
            <el-table-column prop="longitude" label="经度" />
            <el-table-column prop="address" label="具体地址" />
            <el-table-column prop="form" label="类型" />
            <el-table-column prop="status" label="井盖状态" />
            <el-table-column prop="distance" label="去往目的地">
              <template #default="scope">
                <v-col cols="auto">
                  <v-btn
                    @click="goToDes(scope.row.latitude, scope.row.longitude)"
                    density="default"
                    icon="mdi-open-in-new"
                  ></v-btn>
                </v-col>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="route">
      <div id="map"></div>
    </div>

    <!-- 自定义任务 -->
    <v-container style="max-width: 500px; margin-top: 40px">
      <v-text-field
        v-model="newTask"
        label="添加待办任务："
        variant="solo"
        @keydown.enter="create"
      >
        <template v-slot:append-inner>
          <v-fade-transition>
            <v-btn
              v-show="newTask"
              icon="mdi-plus-circle"
              variant="text"
              @click="create"
            ></v-btn>
          </v-fade-transition>
        </template>
      </v-text-field>

      <h2 class="text-h4 text-success ps-4">
        任务总数:&nbsp;
        <v-fade-transition leave-absolute>
          <span :key="`tasks-${tasks.length}`">
            {{ tasks.length }}
          </span>
        </v-fade-transition>
      </h2>

      <v-divider class="mt-4"></v-divider>

      <v-row align="center" class="my-1">
        <strong class="mx-4 text-info-darken-2">
          未完成: {{ remainingTasks }}
        </strong>

        <v-divider vertical></v-divider>

        <strong class="mx-4 text-success-darken-2">
          已完成: {{ completedTasks }}
        </strong>

        <v-spacer></v-spacer>

        <v-progress-circular
          v-model="progress"
          class="me-2"
        ></v-progress-circular>
      </v-row>

      <v-divider class="mb-4"></v-divider>

      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition class="py-0" tag="v-list" group>
          <template v-for="(task, i) in tasks" :key="`${i}-${task.text}`">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

            <v-list-item @click="task.done = !task.done">
              <template v-slot:prepend>
                <v-checkbox-btn
                  v-model="task.done"
                  color="grey"
                ></v-checkbox-btn>
              </template>

              <v-list-item-title>
                <span :class="task.done ? 'text-grey' : 'text-primary'">{{
                  task.text
                }}</span>
              </v-list-item-title>

              <template v-slot:append>
                <v-expand-x-transition>
                  <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
                </v-expand-x-transition>
              </template>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage, ElMessageBox } from "element-plus";

// 接受任务
const dialog = ref(false);
const acceptTask = (id) => {
  const token = localStorage.getItem("token"); // 从 localStorage 中获取 token

  // 给后端 /api/receive/{id} 发送请求，id 为传递的任务 id
  fetch(`/api/receive/${id}`, {
    headers: {
      token: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(data); // 处理后端返回的数据
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

const handleConfirm = (id) => {
  dialog.value = false;
  acceptTask(id);
};

// check missions
const missions = reactive([]);
// 获取任务列表
const getTasks = () => {
  const token = localStorage.getItem("token"); // 从 localStorage 中获取 token

  fetch("api/mission", {
    headers: {
      token: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      data.data.forEach((element) => {
        missions.push(element);
      });
    })
    .catch((error) => {
      console.error();
    });
  console.log(missions);
};

const tasks = reactive([
  {
    done: false,
    text: "上午更换井盖",
  },
  {
    done: false,
    text: "下午修复井盖",
  },
]);

const longitude = ref(null);
const latitude = ref(null);

// 去往目的地
const goToDes = (destinationLatitude, destinationLongitude) => {
  window._AMapSecurityConfig = {
    securityJsCode: "f715472cbaeee315a3ab0db513cebefa",
  };
  AMapLoader.load({
    key: "829635121fbade2893b65c9b39f5b3af",
    version: "2.0",
  }).then((AMap) => {
    const map = new AMap.Map("map", {
      zoom: 14,
      center: [destinationLongitude, destinationLatitude],
    });

    const startLngLat = [
      parseFloat(longitude.value),
      parseFloat(latitude.value),
    ];
    const endLngLat = [
      parseFloat(destinationLongitude),
      parseFloat(destinationLatitude),
    ];
    console.log(startLngLat);
    console.log(endLngLat);

    AMap.plugin(["AMap.Driving"], () => {
      const driving = new AMap.Driving({
        map: map,
        // panel: "panel",
      });

      driving.search(startLngLat, endLngLat, (status, result) => {
        if (status === "complete") {
          console.log("绘制驾车路线完成");
        } else {
          console.error("获取驾车数据失败:" + result);
        }
      });
    });
  });
};

onMounted(() => {
  // 检查定位
  window._AMapSecurityConfig = {
    securityJsCode: "f715472cbaeee315a3ab0db513cebefa",
  };

  AMapLoader.load({
    key: "829635121fbade2893b65c9b39f5b3af",
    version: "2.0",
  })
    .then((AMap) => {
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          offset: [10, 20],
          zoomToAccuracy: true,
          position: "RB",
        });

        geolocation.getCurrentPosition(function (status, result) {
          if (status === "complete") {
            onComplete(result);
          } else {
            onError(result);
          }
        });

        function onComplete(data) {
          // 定位成功的操作
          console.log(data.position);

          console.log(data.position.lat);
          console.log(data.position.lng);
          latitude.value = data.position.lat;
          longitude.value = data.position.lng;
          console.log(latitude.value);
          console.log(longitude.value);
          console.log();
          JSON.stringify(data);
        }

        function onError(data) {
          // 定位出错的操作
          console.log(data);
          alert(JSON.stringify(data));
          console.log("定位失败");
        }
      });
    })
    .catch((e) => {
      console.error(e);
    });

  console.log("!!!!");
  console.log(latitude.value);
  console.log(longitude.value);
});

const newTask = ref("");

const completedTasks = computed(() => tasks.filter((task) => task.done).length);
const progress = computed(() => (completedTasks.value / tasks.length) * 100);
const remainingTasks = computed(() => tasks.length - completedTasks.value);

function create() {
  tasks.push({
    done: false,
    text: newTask.value,
  });

  newTask.value = null;
}

// 表格
const getStatusClass = (status) => {
  return {
    "good-status": status === "井盖完好", // 假定“完好”状态对应绿色样式
    "damaged-status": status !== "井盖完好", // 非“完好”状态对应红色样式
  };
};
// 用于适应表格数据结构的计算属性
const adaptedMissionData = computed(() => {
  return missionData.value.map((item) => ({
    // 假设missionData中没有date和name，这里添加默认值或逻辑
    date: "默认日期", // 或者使用实际的日期逻辑
    name: "默认名称", // 或者使用实际的名称逻辑
    tag: "默认标签", // 或者使用实际的标签逻辑
    id: item.id,
    status: item.status,
    distance: parseFloat(item.distance).toFixed(3),
    address: item.address,
  }));
});

const formatter = (row, column) => {
  return row.address;
};
const missionData = ref([]);
const token = localStorage.getItem("token"); // 从 localStorage 中获取 token

const getPosition = () => {
  const params = {
    latitude: latitude.value,
    longitude: longitude.value,
  };
  fetch("/api/get_mission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      data.data.forEach((item) => {
        missionData.value.push({
          id: item.id,
          latitude: item.latitude,
          longitude: item.longitude,
          status: item.status,
          distance: item.distance,
          address: item.address,
        });
        // item.status = '进行中';
        // missionData.value = data.data;
        // console.log(data.data);
        console.log(missionData.value);
      });
    })
    .catch((error) => console.error("获取数据出错:", error));
};

// 借助高德地图 API 将经纬度转换为地理位置
// function getLocation(latitude, longitude) {
//   AMapLoader.load({
//     key: "829635121fbade2893b65c9b39f5b3af",
//     version: "2.0",
//   })
//     .then((AMap) => {
//       const lnglat = new AMap.LngLat(longitude, latitude);
//       console.log(longitude, latitude);
//       const geocoder = new AMap.Geocoder();
//       geocoder.getAddress(lnglat, (status, result) => {
//         if (status === "complete" && result.regeocode) {
//           return result.regeocode.formattedAddress;
//           console.log(result.regeocode.formattedAddress);
//         }
//         return "地址获取失败";
//       });
//     })
//     .catch((e) => console.error(e));
// }
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  :deep(.v-input__control) {
    width: 92%;
  }

  :deep(.v-card) {
    width: 92%;
  }
  :deep(.v-divider) {
    width: 92%;
  }
  :deep(.v-row) {
    width: 92%;
  }
  .text-info-darken-2,
  .text-success-darken-2 {
    font-size: 1rem !important;
  }

  .text-primary,
  .text-grey {
    font-size: 0.9rem !important;
  }

  .v-progress-circular {
    width: 20px !important;
    height: 20px !important;
  }
}

.form {
  margin-top: 10px;
  // height: 400px;
  // width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
    // Remove or adjust other styles as needed for mobile
  }
  .detail {
    width: 780px;
    border: 1px solid #e0e0e0;
  }
}
.good-status {
  color: rgb(0, 128, 0, 0.7);
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(180, 219, 182, 0.4);
  border-radius: 4px;
  background-color: rgba(180, 219, 182, 0.4);
}

.damaged-status {
  color: red;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  border-radius: 4px;
  background-color: rgba(219, 180, 180, 0.4);
}

.tasks {
  margin-top: 40px;
  margin-left: 20px;
}
.near {
  margin-top: 40px;
  margin-left: 20px;
}
#map {
  width: 1100px;
  height: 600px;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>