<template>
  <div class="data">
    <contain>
      <div class="head">建筑物裂缝数据统计分析</div>
      <div class="contain">
        <div class="column1">
          <div id="chart1" style="width: 300px; height: 400px"></div>
          <div id="chart2" style="width: 300px; height: 550px"></div>
          <div id="chart3" style="width: 280px; height: 450px"></div>
        </div>
        <div class="column2">
          <div id="chart7" style="width: 600px; height: 450px"></div>
          <div id="chart" style="width: 600px; height: 400px"></div>
        </div>
        <div class="column3">
          <div id="chart4" style="width: 300px; height: 280px"></div>
          <div id="chart5" style="width: 300px; height: 250px"></div>
          <div id="chart6" style="width: 300px; height: 280px"></div>
        </div>
      </div>
    </contain>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  // 你的图表初始化和设置option的代码

  const myChart1 = echarts.init(document.getElementById("chart1"));
  const myChart2 = echarts.init(document.getElementById("chart2"));
  const myChart3 = echarts.init(document.getElementById("chart3"));
  const myChart4 = echarts.init(document.getElementById("chart4"));
  const myChart5 = echarts.init(document.getElementById("chart5"));
  const myChart6 = echarts.init(document.getElementById("chart6"));
  const myChart7 = echarts.init(document.getElementById("chart7"));
  myChart1.setOption({
    title: {
      text: "建筑物裂缝数据  2022 2023",
      top: 10,
      left: "center",
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "服装行业",
          "微商",
          "游戏行业",
          "美妆",
          "电器",
          "电商行业",
          "金融行业",
        ],
        axisLabel: {
          color: "white", // 设置坐标轴文字颜色为白色
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "white", // 设置坐标轴文字颜色为白色
        },
      },
    ],
    series: [
      {
        name: "就业人数",
        type: "bar",
        barWidth: "60%",
        color: "#2d8acb",
        borderRadius: 10,
        data: [150, 290, 290, 1000, 1500, 1200, 600],
      },
    ],
  });

  // chart2
  myChart2.setOption({
    title: {
      text: "建筑物裂缝对比",
      top: 20,
      left: 80,
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: "5%",
      left: "right",
    },

    xAxis: {
      type: "category",
      axisLabel: {
        color: "white", // 设置坐标轴文字颜色为白色
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "white", // 设置坐标轴文字颜色为白色
      },
    },

    series: [
      {
        name: "2022",
        data: [80, 100, 301, 450, 400, 500, 450, 350, 450, 400, 300, 240],
        type: "line",
        label: {
          color: "white", // 设置标签颜色为白色
        },
        color: "#ca3d4c",
        smooth: true,
      },
      {
        name: "2023",
        data: [50, 80, 101, 120, 90, 220, 200, 190, 200, 100, 200, 190, 180],
        type: "line",
        color: "#6dc1d0",
        smooth: true,
      },
    ],
  });

  myChart3.setOption({
    title: {
      text: "分布",
      left: "center",
      top: 10,
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "1%",
      left: "center",
      color: "white",
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        radius: ["40%", "60%"],
        avoidLabelOverlap: false,
        label: {
          color: "white", // 设置标签颜色为白色
        },
        itemStyle: {
          color: function (params) {
            // 传入的 params 是数据点信息
            // 这里我们根据数据点的信息返回不同的颜色
            // 如果你想设置统一的颜色，直接返回一个颜色值即可
            if (params.name === "20岁") {
              return "#0461b9";
            } else if (params.name === "21岁") {
              return "#0475b8";
            } else if (params.name === "22岁") {
              return "#0492c0";
            } else if (params.name === "23岁") {
              return "#02a1b8";
            } else if (params.name === "24岁") {
              return "#00b0c4";
            }
          },
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 408, name: "20岁" },
          { value: 935, name: "21岁" },
          { value: 580, name: "22岁" },
          { value: 484, name: "23岁" },
          { value: 300, name: "24岁" },
        ],
      },
    ],
  });

  var data = [93, 91, 78, 83, 69];
  var titlename = [
    "计算机科学",
    "会计教育",
    "软件工程",
    "旅游管理",
    "工商管理",
  ];
  var valdata = [683, 234, 234, 523, 345];
  var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
  myChart4.setOption({
    title: {
      text: "xxx",
      left: "center",
      top: 10,
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    backgroundColor: "#0e2147",
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        show: true,
        data: titlename,
        inverse: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
          formatter: function (value, index) {
            return ["{lg|" + (index + 1) + "}" + "{title|" + value + "} "].join(
              "\n"
            );
          },
          rich: {
            lg: {
              backgroundColor: "#339911",
              color: "#fff",
              borderRadius: 15,
              // padding: 5,
              align: "center",
              width: 12,
              height: 2,
            },
          },
        },
      },
      {
        show: true,
        inverse: true,
        data: valdata,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: "#fff",
          },
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data,
        barWidth: 20,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: function (params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num];
            },
          },
        },
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: "{c}%",
          },
        },
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        barGap: "-100%",
        data: [100, 100, 100, 100, 100],
        barWidth: 30,
        itemStyle: {
          normal: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 2,
            barBorderRadius: 15,
          },
        },
      },
    ],
  });

  myChart5.setOption({
    title: {
      text: "统计",
      left: "center",
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      top: 30,
      left: "center",
      data: ["6k以下", "6k以上"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "white", // 设置坐标轴文字颜色为白色
      },
      data: [50, 30, 60, 10, 50, 30, 60, 40, 60, 80, 30, 60, 10, 50, 30, 70],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "white", // 设置坐标轴文字颜色为白色
      },
    },

    series: [
      {
        name: "6k以下",
        data: [50, 30, 60, 10, 50, 30, 60, 40, 60, 80, 30, 60, 10, 50, 30, 70],
        type: "line",
        color: "#009e77",
        smooth: true,
        areaStyle: {
          color: "rgb(40, 223, 161, .2)",
        },
      },
      {
        name: "6k以上",
        data: [30, 40, 30, 40, 30, 40, 60, 20, 30, 20, 40, 30, 40, 10, 40, 20],
        type: "line",
        color: "#02598f",
        smooth: true,
        areaStyle: {
          color: "rgb(5, 108, 173, .2)",
        },
      },
    ],
  });

  myChart6.setOption({
    title: {
      text: "主要就业地区分布",
      left: "center",
      top: 10,
      textStyle: {
        color: "white", // 设置标题文字颜色为白色
      },
    },
    legend: {
      top: "bottom",
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [15, 80],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 0,
        },
        data: [
          { value: 10, name: "云南" },
          { value: 18, name: "北京" },
          { value: 15, name: "山东" },
          { value: 17, name: "河北" },
          { value: 15, name: "江苏" },
          { value: 17, name: "浙江" },
          { value: 22, name: "广东" },
        ],
        itemStyle: {
          // 这里是重点，可以设置颜色
          color: function (params) {
            // 传入的 params 是数据点信息
            // 这里我们根据数据点的信息返回不同的颜色
            // 如果你想设置统一的颜色，直接返回一个颜色值即可
            if (params.name === "云南") {
              return "#036ee6"; // 云南的颜色
            } else if (params.name === "北京") {
              return "#5fcea1"; // 北京的颜色
            } else if (params.name === "山东") {
              return "#ed8884"; // 山东的颜色
            } else if (params.name === "河北") {
              return "#fd9e7e"; // 河北的颜色
            } else if (params.name === "江苏") {
              return "#1b9bfa"; // 江苏的颜色
            } else if (params.name === "浙江") {
              return "#9be7ba"; // 浙江的颜色
            } else if (params.name === "深圳") {
              return "#31c6e9"; // 深圳的颜色
            } else {
              return "#1b9bfa"; // 其他情况设为#1b9bfa，确保可见性
            }
          },
        },
      },
    ],
  });

  // map
});

//         var outname = ["南海诸岛", '北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南', '台湾', '香港', '澳门'];
// var outvalue = [0, 524, 13, 140, 75, 13, 83, 11, 19, 15, 69, 260, 39, 4, 31, 104, 36, 1052, 33, 347, 9, 157, 22, 4, 18, 5, 2398, 41, 0, 484, 404, 22, 3, 5, 225];
// var outdata = [];

// var max = 6000,
//     min = 10;
// var maxSize4Pin = 100,
//     minSize4Pin = 20;

// for (var i = 0; i < outname.length; i++) {
//     outdata.push({
//         name: outname[i],
//         value: outvalue[i]
//     })
// }

// var geoCoordMap = {};
// /*获取地图数据*/
// var mapFeatures = echarts.getMap('china').geoJson.features;
// //  console.log(mapFeatures)
// mapFeatures.forEach(function(v) {
//     console.info(v)
//     // 地区名称
//     var name = v.properties.name;
//     // 地区经纬度
//     geoCoordMap[name] = v.properties.cp;

// });
// var convertData = function(outdata) {
//     var res = [];
//     for (var i = 0; i < outdata.length; i++) {
//         var geoCoord = geoCoordMap[outdata[i].name];
//         if (geoCoord) {
//             res.push({
//                 name: outdata[i].name,
//                 value: geoCoord.concat(outdata[i].value),
//             });
//         }
//     }
//     return res;
// };

// myChart7.setOption(option7);
</script>

<style scoped>
contain {
  margin-top: -5vh !important;
}
.contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* flex-direction: column; */
}
.head {
  height: 10vh;
  background-color: rgb(14, 33, 71);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
.column1 {
  width: 350px;
  background-color: rgb(14, 33, 71);
  min-height: 100vh;
  height: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
/* .column2 {
      width: 650px;
  } */
.column3 {
  width: 500px;
  background-color: rgb(14, 33, 71);
  min-height: 100vh;
  height: 850px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  top: -10%;
}
#chart4 {
  left: 1vw;
}
</style>
