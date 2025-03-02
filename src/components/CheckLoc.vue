<template>
  <div class="map-container">
    <div class="btn">
      <v-btn @click="initBothMaps" variant="outlined">整体情况3D地图</v-btn>
      <v-btn @click="initBothMaps" variant="outlined">整体情况2D地图</v-btn>
    </div>
    <div class="maps-wrapper">
      <div id="map3DContainer"></div>
      <div id="container"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { getLocationData } from "@/apis/location";
import { ElMessage } from "element-plus";

const token = localStorage.getItem("token");

// 初始化3D地图
const init3DMap = async (data) => {
  try {
    const AMap = await AMapLoader.load({
      key: "829635121fbade2893b65c9b39f5b3af",
      version: "2.0",
    });

    const map = new AMap.Map("map3DContainer", {
      zoom: 18,
      pitch: 50,
      viewMode: "3D",
      rotateEnable: true,
      pitchEnable: true,
      rotation: -15,
      zooms: [2, 20],
      center: [data.data[8].longitude, data.data[8].latitude],
    });

    // 添加3D地图标记
    data.data.forEach((item) => {
      const markerDiv = createMarkerElement(item);
      const marker = new AMap.Marker({
        position: [item.longitude, item.latitude],
        content: markerDiv,
        title: `检修方式：${item.form}\n建筑物裂缝情况：${item.status}`,
      });
      marker.setMap(map);
    });
  } catch (e) {
    ElMessage.error("3D地图加载失败");
  }
};

// 初始化2D地图
const init2DMap = async (data) => {
  try {
    const AMap = await AMapLoader.load({
      key: "829635121fbade2893b65c9b39f5b3af",
      version: "2.0",
    });

    const map = new AMap.Map("container", {
      center: [data.data[8].longitude, data.data[8].latitude],
      zoom: 16,
    });

    // 添加2D地图标记
    data.data.forEach((item) => {
      const markerDiv = createMarkerElement(item);
      const marker = new AMap.Marker({
        position: [item.longitude, item.latitude],
        content: markerDiv,
        title: `检修方式：${item.form}\n建筑物裂缝情况：${item.status}`,
      });
      marker.setMap(map);
    });
  } catch (e) {
    ElMessage.error("2D地图加载失败");
  }
};

// 创建标记元素
const createMarkerElement = (item) => {
  const markerDiv = document.createElement("div");
  markerDiv.style.width = "22px";
  markerDiv.style.height = "22px";
  markerDiv.style.borderRadius = "50%";
  markerDiv.style.backgroundColor = item.status === "破损" ? "#43cf43" : "red";
  markerDiv.style.display = "flex";
  markerDiv.style.justifyContent = "center";
  markerDiv.style.alignItems = "center";
  markerDiv.textContent = "#";
  return markerDiv;
};

// 初始化两个地图
const initBothMaps = async () => {
  window._AMapSecurityConfig = {
    securityJsCode: "f715472cbaeee315a3ab0db513cebefa",
  };

  try {
    const data = await getLocationData(token);
    if (data.code === 1 && data.data.length > 0) {
      await Promise.all([init3DMap(data), init2DMap(data)]);
    }
  } catch (error) {
    ElMessage.error("获取位置数据失败");
  }
};

onMounted(() => {
  initBothMaps();
});
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;

  .maps-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}

#container {
  width: 50%;
  height: 600px;
}

#map3DContainer {
  width: 50%;
  height: 600px;
}

.btn {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
</style>
