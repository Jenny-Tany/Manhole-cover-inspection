<template>
  <div class="btn">
    <v-btn @click="showTotal" variant="outlined">查看整体情况</v-btn>
    <v-btn @click="showReal" variant="outlined">查看实时情况</v-btn>
  </div>
  <div v-show="!showOverall" id="map3DContainer"></div>
  <div v-show="showOverall" id="container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const containerRef = ref(null);
const showOverall = ref(true);
const token = localStorage.getItem("token");
const showTotal = () => {
  showOverall.value = true;
};
const showReal = () => {
  showOverall.value = false;
  AMapLoader.load({
    key: "829635121fbade2893b65c9b39f5b3af",
    version: "2.0",
  })
    .then((AMap) => {
      const map = new AMap.Map("map3DContainer", {
        zoom: 18,
        pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D", //地图模式
        rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
        pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
        rotation: -15, //初始地图顺时针旋转的角度
        zooms: [2, 20], //地图显示的缩放级别范围
        center: [116.333926, 39.997245],
      });

      const marker = new AMap.Marker({
        position: [longitude, latitude],
        content: markerDiv,
        title: `检修方式：${item.form}\n建筑物裂缝情况：${item.status}`,
      });
      marker.setMap(map);
      map.add(marker);
    })
    .catch((e) => {
      console.error(e);
    });
};
onMounted(() => {
  if (!showOverall.value) {
    loadAndInit3DMap();
  }
  window._AMapSecurityConfig = {
    securityJsCode: "f715472cbaeee315a3ab0db513cebefa",
  };

  // 发送 GET 请求获取后端数据
  fetch("/api/get_location", {
    method: "GET",
    headers: {
      // 'Content-Type': 'application/json',
      token: token,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log(JSON.stringify(data.data) + "111");
      JSON.parse;
      if (data.code === 1 && data.data.length > 0) {
        const { latitude, longitude } = data.data[8];
        console.log(latitude, longitude);

        if (showOverall.value) {
          AMapLoader.load({
            key: "829635121fbade2893b65c9b39f5b3af",
            version: "2.0",
          })
            .then((AMap) => {
              const map = new AMap.Map("container", {
                center: [longitude, latitude],
                zoom: 16,
              });
              data.data.forEach((item) => {
                const markerDiv = document.createElement("div");
                markerDiv.style.width = "22px";
                markerDiv.style.height = "22px";
                markerDiv.style.borderRadius = "50%";
                markerDiv.style.backgroundColor =
                  item.status === "破损" ? "#43cf43" : "red";
                markerDiv.style.display = "flex";
                markerDiv.style.justifyContent = "center";
                markerDiv.style.alignItems = "center";
                markerDiv.textContent = "#";
                const { latitude, longitude } = item;
                const marker = new AMap.Marker({
                  position: [longitude, latitude],
                  content: markerDiv,
                  title: `检修方式：${item.form}\n建筑物裂缝情况：${item.status}`,
                });
                marker.setMap(map);
                map.add(marker);
              });
            })
            .catch((e) => {
              console.error(e);
            });
        }
      }
    })
    .catch((error) => console.error("获取数据出错:", error));
});
</script>

<style scoped lang="scss">
#container {
  width: 1150px;
  height: 600px;
}
#map3DContainer {
  position: relative;
  margin-left: 40%;
  width: 680px;

  height: 600px;
}

.btn {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  .v-btn {
    margin-right: 35%;
  }
}
</style>
