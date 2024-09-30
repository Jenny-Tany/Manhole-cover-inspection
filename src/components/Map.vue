<template>
  <div class="tool">
    <v-toolbar color="#091336" :elevation="8" dark prominent>
      <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>
        <v-card>
          <v-tabs v-model="tab" color="primary" direction="vertical">
            <v-tab value="option-1">
              <v-icon start> mdi-account </v-icon>
              用户
            </v-tab>
            <v-tab value="option-2" @click="$router.push({ path: '/' })">
              <v-icon start>
                <svg-icon type="mdi" :path="path"></svg-icon>
                mdi-lock
              </v-icon>
              上传图片
            </v-tab>
            <v-tab value="option-3">
              <v-icon start>
                <svg-icon type="mdi" :path="path1"></svg-icon>
                mdi-access-point
              </v-icon>
              历史记录
            </v-tab>
            <v-tab value="option-4">
              <v-icon start>
                mdi-access-point
                <svg-icon type="mdi" :path="path2"></svg-icon>
              </v-icon>
              任务日历
            </v-tab>
            <v-tab value="option-5">
              <v-icon start>
                <svg-icon type="mdi" :path="path2"></svg-icon>
              </v-icon>
              查看建筑物裂缝
            </v-tab>
            <v-tab value="option-6">
              <v-icon start>
                <svg-icon type="mdi" :path="path1"></svg-icon>
                mdi-access-point
              </v-icon>
              数据中台
            </v-tab>
          </v-tabs>
        </v-card>
      </v-menu>

      <v-toolbar-title>数据中台</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 对话框 -->
      <div class="text-center pa-4">
        <v-dialog v-model="dialog" max-width="400" persistent>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn icon v-bind="activatorProps">
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </template>

          <v-card
            color="#091336"
            prepend-icon="mdi-export"
            title="确定要退出该账号吗?"
          >
            <template v-slot:actions>
              <v-spacer></v-spacer>

              <v-btn @click="dialog = false" style="background-color: #2a416a">
                取消
              </v-btn>

              <v-btn @click="quit" style="background-color: #833434">
                确定
              </v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>
  </div>

  <div class="body">
    <header>
      <div style="width: 100%; height: 100%">
        <div class="bar">
          <h1
            style="margin: 0; color: white; display: flex; text-align: center"
          >
            桂林2024年1月-至今建筑物裂缝统计
          </h1>
        </div>
      </div>
    </header>
    <!-- 左侧数据 -->
    <div class="left" style="width: 25%; height: 100%; float: left">
      <div class="block" id="field">
        <!-- 左上角 -->
      </div>

      <div class="block" id="compare">
        <!-- 左中角 -->
      </div>
      <div class="block" id="age" style="margin-bottom: 0px">
        <!-- 左下角 -->
      </div>
    </div>
    <!-- 右侧数据展示 -->
    <div class="right" style="width: 25%; height: 100%; float: right">
      <div class="block" id="profession">
        <!-- 右上角 -->
      </div>

      <div class="block" id="payment">
        <!-- 右中角 -->
      </div>

      <div class="block" id="area" style="margin-bottom: 0px">
        <!-- 右下角 -->
      </div>
    </div>
    <div
      class="mid"
      style="
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin-top: 10px;
          margin-bottom: 10px;
        "
      >
        <div class="count" id="graduate">
          <h1 style="text-align: center; color: rgb(226, 214, 118)">2173</h1>

          <div class="GraduatePeoPle" style="border: 0px">建筑物裂缝总数目</div>
        </div>
        <div class="count" id="employed">
          <h1 style="text-align: center; color: rgb(226, 214, 118)">1086</h1>

          <div class="GraduatePeoPle" style="border: 0px">损坏数目</div>
        </div>
      </div>
      <!-- 地图展示区域 -->
      <div class="maps">
        <div ref="map" class="map" id="map">
          <!-- 地图 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import "../mapJs/china";
import AMapLoader from "@amap/amap-jsapi-loader";
import eventBus from "@/utils/eventBus";
import { crackCategories, crackTypes } from "@/data/buildingCracks";
// 对话框
const dialog = ref(false);
// 引入图标
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFormatListBulleted, mdiHistory, mdiUpload } from "@mdi/js";
const path = mdiUpload;
const path1 = mdiHistory;
const path2 = mdiFormatListBulleted;
// 当前选中的标签
const tab = ref("option-1");

// 菜单
const menu = ref(false);

// 退出登录
const router = useRouter();
const quit = () => {
  dialog.value = false;
  localStorage.removeItem("token");
  router.push("/login");
};

let fieldOption = {
  title: {
    text: "建筑物裂缝",
    textStyle: {
      color: "white",
      fontSize: 16, // 设置标题文本字号
      fontWeight: "bold", // 设置标题文本粗细
    },
  },
  //提示信息
  tooltip: {
    show: true, // 显示 tooltip
    trigger: "item", // 设置触发方式为数据项触发
    backgroundColor: "rgb(255,255,255)", // 设置背景颜色
    textStyle: {
      fontSize: 16, // 设置文本字号
    },
  },
  xAxis: {
    data: ["横向裂缝", "纵向裂缝", "斜向裂缝", "收缩裂缝", "沉降裂缝"],
    axisLabel: {
      textStyle: {
        color: "white", // 修改x轴刻度文字颜色为白色
      },
      interval: 0,
    },
  },
  yAxis: {
    axisLabel: {
      textStyle: {
        color: "white", // 修改x轴刻度文字颜色为白色
      },
    },
  },
  //系列列表,每个系列通过type决定自己的图表类型
  series: [
    {
      name: "1月",
      type: "bar",
      data: [170, 200, 260, 220, 240],
      itemStyle: {
        color: "#00BFFF",
      },
      emphasis: {
        itemStyle: {
          color: "red",
        },
      },
    },
    {
      name: "2-3月",
      type: "bar",
      data: [130, 200, 260, 220, 230],
      emphasis: {
        itemStyle: {
          color: "red",
        },
      },
    },
    {
      name: "4-5月",
      type: "bar",
      data: [130, 200, 260, 220, 200],
      emphasis: {
        itemStyle: {
          color: "red",
        },
      },
    },
  ],
  //图例组件,可以通过点击图例控制哪些系列不显示
  legend: {
    data: [
      {
        name: "1月",
      },
      {
        name: "2-3月",
      },
      {
        name: "4-5月",
      },
    ],
    textStyle: {
      color: "#fff", // 修改图例文字颜色为红色
    },
  },
};
let compareOption = {
  title: {
    text: "维修情况",
    left: "left",
    textStyle: {
      color: "white",
      fontSize: 16, // 设置标题文本字号
      fontWeight: "bold", // 设置标题文本粗细
    },
  },
  xAxis: {
    type: "category",
    data: ["1月", "2月", "3月", "4月", "5月"],
    axisLabel: {
      textStyle: {
        color: "white", // 修改x轴刻度文字颜色为白色
      },
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        color: "white", // 修改x轴刻度文字颜色为白色
      },
    },
  },
  tooltip: {
    trigger: "axis",
  },
  series: [
    {
      name: "已维修",
      data: [82, 143, 121, 194, 249, 143, 132],
      type: "line",
      smooth: true,
    },
    //再来一个,数据都翻倍
    {
      name: "有问题",
      data: [114, 164, 172, 268, 268, 156, 144],
      type: "line",
      smooth: true,
    },
  ],
  legend: {
    data: [
      {
        name: "已维修",
      },
      {
        name: "有问题",
      },
    ],
    textStyle: {
      color: "#fff", // 修改图例文字颜色为白色
    },
  },
};
let ageOption = {
  title: {
    text: "建筑物裂缝隐患分布",
    left: "center",
    textStyle: {
      color: "white",
      fontSize: 16, // 设置标题文本字号
      fontWeight: "bold", // 设置标题文本粗细
    },
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    //设置在下侧
    orient: "horizontal",
    bottom: "bottom",
    data: [
      {
        name: crackCategories.bear_stress_crack,
      },
      {
        name: crackCategories.temperature_shrinkage_crack,
      },
      {
        name: crackCategories.durability_crack,
      },
      {
        name: crackCategories.forced_displacement_crack,
      },
      {
        name: crackCategories.structural_construction_crack,
      },
    ],
    textStyle: {
      color: "white", // 修改图例文字颜色为红色
    },
  },
  series: [
    {
      name: "建筑物裂缝隐患分布",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: crackCategories.bear_stress_crack },
        { value: 735, name: crackCategories.temperature_shrinkage_crack },
        { value: 580, name: crackCategories.durability_crack },
        { value: 484, name: crackCategories.forced_displacement_crack },
        { value: 300, name: crackCategories.structural_construction_crack },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
let myColor = [
  "#eb2100",
  "#eb3600",
  "#d0570e",
  "#d0a00e",
  "#34da62",
  "#00e9db",
  "#00c0e9",
  "#0096f3",
  "#33CCFF",
  "#33FFCC",
];
let Ydata = [
  crackTypes.horizontalCrack,
  crackTypes.verticalCrack,
  crackTypes.diagonalCrack,
  crackTypes.shrinkageCrack,
  crackTypes.settlementCrack,
];
let Xdata = [69, 39, 28, 51, 43];
let professionOption = {
  //你的代码
  backgroundColor: "#0e2147",
  grid: {
    left: "11%",
    top: "12%",
    right: "0%",
    bottom: "8%",
    containLabel: true,
  },
  dataZoom: [
    {
      yAxisIndex: 0, //这里是从X轴的0刻度开始
      show: false, //是否显示滑动条，不影响使用
      type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      startValue: 0, // 从头开始。
      endValue: 4, // 一次性展示5个。。
    },
  ],
  xAxis: [
    {
      show: false,
    },
  ],
  yAxis: [
    {
      axisTick: "none",
      axisLine: "none",
      offset: "27",
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "16",
        },
      },
      data: Ydata,
    },
    {
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "16",
        },
      },
      data: ["702", "350", "610", "793", "66"],
    },
    {
      name: "滚动TOP 10",
      nameGap: "50",
      nameTextStyle: {
        color: "#ffffff",
        fontSize: "16",
      },
      axisLine: {
        lineStyle: {
          color: "rgba(0,0,0,0)",
        },
      },
      data: [],
    },
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      data: Xdata,
      label: {
        normal: {
          show: true,
          position: "right",
          textStyle: {
            color: "#ffffff",
            fontSize: "12",
          },
          formatter: "{c}%",
        },
      },
      barWidth: 12,
      itemStyle: {
        normal: {
          color: function (params) {
            let num = myColor.length;
            return myColor[params.dataIndex % num];
          },
        },
      },
      z: 2,
    },
    {
      name: "白框",
      type: "bar",
      yAxisIndex: 1,
      barGap: "-100%",
      data: [99, 99.5, 99.5, 99.5, 99.5],
      barWidth: 20,
      itemStyle: {
        normal: {
          color: "#0e2147",
          barBorderRadius: 5,
        },
      },
      z: 1,
    },
    {
      name: "外框",
      type: "bar",
      yAxisIndex: 2,
      barGap: "-100%",
      data: [100, 100, 100, 100, 100],
      barWidth: 24,
      itemStyle: {
        normal: {
          color: function (params) {
            let num = myColor.length;
            return myColor[params.dataIndex % num];
          },
          barBorderRadius: 5,
        },
      },
      z: 0,
    },
    {
      name: "外圆",
      type: "scatter",
      hoverAnimation: false,
      data: [0, 0, 0, 0, 0],
      yAxisIndex: 2,
      symbolSize: 35,
      itemStyle: {
        normal: {
          color: function (params) {
            let num = myColor.length;
            return myColor[params.dataIndex % num];
          },
          opacity: 1,
        },
      },
      z: 2,
    },
  ],
};

let areaOption = {
  title: {
    text: "主要建筑物裂缝地区分布",
    left: "center",
    textStyle: {
      color: "white",
      fontSize: 16, // 设置标题文本字号
      fontWeight: "bold", // 设置标题文本粗细
    },
  },
  tooltip: {
    trigger: "item",
  },
  //云南,北京,山东,河北,江苏,浙江,深圳
  legend: {
    left: "center",
    top: "bottom",
    data: ["1区", "2区", "3区", "4区", "5区", "6区", "7区"],
    textStyle: {
      color: "white", // 修改图例文字颜色为白色
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "Area Mode",
      type: "pie",
      radius: [20, 90],
      center: ["50%", "50%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 5,
      },
      //1区,2区,3区,4区,5区,6区,7区
      data: [
        { value: 30, name: "1区" },
        { value: 28, name: "2区" },
        { value: 26, name: "3区" },
        { value: 24, name: "4区" },
        { value: 22, name: "5区" },
        { value: 20, name: "6区" },
        { value: 18, name: "7区" },
      ],
    },
  ],
};
let category = [];

let dottedBase = +new Date();
let lineData = [];
let barData = [];
for (let i = 0; i < 20; i++) {
  let date = new Date((dottedBase += 3600 * 24 * 1000));
  category.push(
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-")
  );
  let b = Math.random() * 200;
  let d = Math.random() * 200;
  barData.push(b);
  lineData.push(d + b);
}
// option
let paymentOption = {
  backgroundColor: "#0f375f",
  title: {
    text: "建筑物裂缝维修花费",
    left: "center",
    textStyle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["500以上", "500以下"],
    textStyle: {
      color: "#ccc",
    },
    bottom: 10,
  },
  xAxis: {
    data: ["1区", "2区", "3区", "4区", "5区", "6区", "7区", "8区", "9区"],
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  yAxis: {
    splitLine: { show: false },
    axisLine: {
      lineStyle: {
        color: "#ccc",
      },
    },
  },
  series: [
    {
      name: "500以上",
      type: "line",
      smooth: true,
      showAllSymbol: true,
      symbol: "emptyCircle",
      symbolSize: 15,
      data: lineData,
    },
    {
      name: "bar",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#14c8d4" },
          { offset: 1, color: "#43eec6" },
        ]),
      },
      data: barData,
    },
    {
      name: "500以下",
      type: "bar",
      barGap: "-100%",
      barWidth: 10,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(20,200,212,0.5)" },
          { offset: 0.2, color: "rgba(20,200,212,0.2)" },
          { offset: 1, color: "rgba(20,200,212,0)" },
        ]),
      },
      z: -12,
      data: lineData,
    },
    {
      name: "dotted",
      type: "pictorialBar",
      symbol: "rect",
      itemStyle: {
        color: "#0f375f",
      },
      symbolRepeat: true,
      symbolSize: [12, 4],
      symbolMargin: 1,
      z: -10,
      data: lineData,
    },
  ],
};

//此处是中心地图的初始化
const AmapInit = () => {
  const positionObj = {
    Latitude: 25.274215, // 纬度
    Longitude: 110.299122, // 经度
  };
  window._AMapSecurityConfig = {
    securityJsCode: "f715472cbaeee315a3ab0db513cebefa",
  };

  AMapLoader.load({
    key: "829635121fbade2893b65c9b39f5b3af",
    version: "2.0",
  })
    .then((AMap) => {
      const map = new AMap.Map("map", {
        center: [positionObj.Longitude, positionObj.Latitude],
        zoom: 10,
      });
      for (let i = 0; i < 3; i++) {
        const marker = new AMap.Marker({
          position: [
            positionObj.Longitude + i * 0.11,
            positionObj.Latitude + i * 0.16,
          ],
        });
        marker.setMap(map);
      }
      for (let i = 0; i < 2; i++) {
        const marker = new AMap.Marker({
          position: [
            positionObj.Longitude + i * 0.11,
            positionObj.Latitude - i * 0.26,
          ],
        });
        marker.setMap(map);
      }
      for (let i = 0; i < 2; i++) {
        const marker = new AMap.Marker({
          position: [
            positionObj.Longitude - i * 0.41,
            positionObj.Latitude - i * 0.16,
          ],
        });
        marker.setMap(map);
      }
      const marker = new AMap.Marker({
        position: [positionObj.Longitude, positionObj.Latitude],
        title: `建筑物裂缝`,
      });
      marker.setMap(map);
      map.add(marker);
    })
    .catch((e) => {});
};

// 初始化图表的函数
const initChart = (elementId, option) => {
  const chart = echarts.init(document.getElementById(elementId));
  chart.setOption(option);
  return chart; // 返回图表实例
};

function initMap() {
  nextTick(() => {
    // 初始化图表并保存图表实例
    const fieldChart = initChart("field", fieldOption);
    const compareChart = initChart("compare", compareOption);
    const ageChart = initChart("age", ageOption);
    const professionChart = initChart("profession", professionOption);
    const paymentChart = initChart("payment", paymentOption);
    const areaChart = initChart("area", areaOption);

    // 监听事件
    eventBus.on("map", (data) => {
      if (data === "changeToMap") {
        // 重新设置图表选项
        fieldChart.setOption(fieldOption);
        compareChart.setOption(compareOption);
        ageChart.setOption(ageOption);
        professionChart.setOption(professionOption);
        paymentChart.setOption(paymentOption);
        areaChart.setOption(areaOption);
      }
    });

    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener("resize", () => {
      fieldChart.resize();
      compareChart.resize();
      ageChart.resize();
      professionChart.resize();
      paymentChart.resize();
      areaChart.resize();
    });
  });
}

onMounted(() => {
  initMap();
  AmapInit();
});
</script>

<style lang="scss" scoped>
.body {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: url("../../public/dataShow.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.tool {
  margin-bottom: -1px;
}

.bar {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border: 1px solid white;
}

.count {
  width: 48%;
  height: 150px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border: 1px solid white;
}

.maps {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-left: -1.2vh;
}
.map {
  width: 90%;
  height: 590px;

  border: 1px solid white;
}

.block {
  width: 100%;
  height: 250px;
  display: flex;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid white;
}

.chart {
  display: flex;
  justify-content: center;
  border: 1px solid white;
}
.GraduatePeoPle {
  color: white;
  border: 1px solid white;
  border-color: rgb(48, 77, 127);
  border-color: #803a3a;
}
</style>
