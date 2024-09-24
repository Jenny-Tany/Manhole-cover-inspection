<template>
  <div class="contain">
    <!-- 附近建筑物裂缝 -->
    <div class="near">
      <v-btn variant="outlined" @click="getPosition">
        点击查看附近建筑物裂缝
      </v-btn>
      <!-- <p>经度: {{ longitude }}</p>
      <p>纬度: {{ latitude }}</p> -->
      <div class="form">
        <div class="detail">
          <el-table ref="tableRef" :data="adaptedMissionData">
            <el-table-column prop="id" label="建筑物裂缝序号" width="60" />

            <el-table-column
              prop="address"
              label="具体地址"
              width="60"
              :formatter="formatter"
            />
            <el-table-column prop="status" label="建筑物裂缝状态" width="60">
              <template #default="scope">
                <div
                  :class="getStatusClass(scope.row.status)"
                  style="width: 40px"
                >
                  {{ scope.row.status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="distance" label="距离(m)" width="60" />
            <el-table-column prop="accept" label="是否接受此任务？" width="100">
              <template #default="scope">
                <div class="text-center pa-4">
                  <v-dialog v-model="dialog" max-width="400" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        @click="acceptTask(scope.row.id)"
                        v-bind="activatorProps"
                      >
                        接受
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
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage, ElMessageBox } from "element-plus";

const token = localStorage.getItem("token"); // 从 localStorage 中获取 token

// 接受任务
const dialog = ref(false);
const acceptTask = (id) => {};

const handleConfirm = (id) => {
  dialog.value = false;
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
      ElMessage({
        message: "接受任务成功",
        type: "success",
      });
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
};

// 完成任务
const handleFinish = (id) => {
  dialog.value = false;
  fetch(`/api/complete/${id}`, {
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
    });
};

// check missions
const missions = ref([]);
const mapShow = ref(false);
// 获取任务列表
const getTasks = () => {
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
      missions.value = [];
      data.data.forEach((item) => {
        missions.value.push(item);
      });
    })
    .catch((error) => {
      console.error();
    });
  console.log(missions);
};

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
  mapShow.value = true;
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
          ElMessage({
            message: "获取定位成功",
            type: "success",
          });
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
          ElMessage({
            message: "获取定位失败",
            type: "error",
          });
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
    "good-status": status === "完好", // 假定“完好”状态对应绿色样式
    "damaged-status": status !== "完好", // 非“完好”状态对应红色样式
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
    address: item.address.slice(0, item.address.length - 26),
  }));
});

const formatter = (row, column) => {
  return row.address;
};
const missionData = ref([]);

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
      missionData.value = [];
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

  // 附近建筑物裂缝和任务清单的额外样式
  .near {
    width: 100% !important;
    margin-left: 0 !important;
  }
  .tasks {
    width: 100% !important;
    margin-left: 0 !important;
  }
}

.contain {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form {
  margin-top: 10px;
  // height: 400px;
  // width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    // width: 40%;
    // Remove or adjust other styles as needed for mobile
  }
  .detail {
    width: 780px;
    border: 1px solid #e0e0e0;
    @media only screen and (max-width: 600px) {
      width: 340px;
      // Remove or adjust other styles as needed for mobile
    }
  }
}
.good-status {
  color: rgb(0, 128, 0, 0.7);
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(180, 219, 182, 0.4);
  border-radius: 4px;
  background-color: rgba(180, 219, 182, 0.4);
}

.damaged-status {
  color: red;
  width: 20px;
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
  margin-top: 10px;
  margin-left: 20px;
}
#map {
  width: 460px;
  height: 450px;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
