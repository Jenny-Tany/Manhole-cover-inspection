<template>
  <div class="tool">
    <v-toolbar
    color="#091336"
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>数据中台</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- 对话框 -->
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn icon  v-bind="activatorProps">
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

          <v-btn @click="dialog = false" style="background-color: #2a416a;">
            取消
          </v-btn>

          <v-btn @click="quit" style="background-color: #833434;">
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
						style="margin: 0; color: white; display: flex; text-align: center">
						全国2022年~2023年井盖统计
					</h1>
				</div>
			</div>
		</header>
		<!-- 左侧数据 -->
		<div
			class="left"
			style="width: 25%; height: 100%; float: left">
			<div
				class="block"
				id="field">
				<!-- 就业行业 -->
			</div>

			<div
				class="block"
				id="compare">
				<!-- 就业对比 -->
			</div>
			<div
				class="block"
				id="age"
				style="margin-bottom: 0px">
				<!-- 年款分布 -->
			</div>
		</div>
		<!-- 右侧数据展示 -->
		<div
			class="right"
			style="width: 25%; height: 100%; float: right">
			<div
				class="block"
				id="profession">
				<!-- 就业率 -->
			</div>

			<div
				class="block"
				id="payment">
				<!-- 薪酬 -->
			</div>

			<div
				class="block"
				id="area"
				style="margin-bottom: 0px">
				<!-- 就业地区 -->
			</div>
		</div>
		<!-- 中间数据展示 -->
		<div
			class="mid"
			style="
				width: auto;
				height: 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
			">
			<div
				style="
					display: flex;
					flex-direction: row;
					justify-content: center;
					margin-top: 10px;
					margin-bottom: 10px;
				">
				<div
					class="count"
					id="graduate">
					<!-- 毕业人数 -->

					<h1 style="text-align: center; color: rgb(226, 214, 118)">3120</h1>

					<div
						class="GraduatePeoPle"
						style="border: 0px">
						井盖总数目
					</div>
				</div>
				<div
					class="count"
					id="employed">
					<!-- 就业人数 -->
					<h1 style="text-align: center; color: rgb(226, 214, 118)">1580</h1>

					<div
						class="GraduatePeoPle"
						style="border: 0px">
						损坏数目
					</div>
				</div>
			</div>
			<!-- 地图展示区域 -->
			<div ref="map"
				class="map"
				id="map">
				<!-- 地图 -->
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from "vue";
    import {useRouter} from "vue-router"
	import * as echarts from "echarts";
	import "../mapJs/china";
    // 对话框
    const dialog = ref(false)

    // 退出登录
    const router = useRouter()
    const quit = ()=> {
        dialog.value = false;
		localStorage.removeItem('token');
        router.push('/login')
    }

	const mapRef = ref(null);
	//此处是field的初始化
	onMounted(() => {
		let fieldChart = echarts.init(document.getElementById("field"));
		//大概就是实现一键打印变量.ctrl + 1就行了,原本是只能打印变量,我刚才加了个功能,可以显示文件名

		// 绘制图表
		let option = {
			title: {
				text: "井盖",
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
				data: ["broke", "cicle", "broke", "good", "uncovered"],
				axisLabel: {
					textStyle: {
						color: "white", // 修改x轴刻度文字颜色为白色
					},
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
					name: "2021年",
					type: "bar",
					data: [100, 200, 360, 620, 840],
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
					name: "2022年",
					type: "bar",
					data: [100, 200, 360, 420, 800],
					emphasis: {
						itemStyle: {
							color: "red",
						},
					},
				},
				{
					name: "2023年",
					type: "bar",
					data: [100, 200, 360, 420, 900],
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
						name: "2021年",
					},
					{
						name: "2022年",
					},
					{
						name: "2023年",
					},
				],
				textStyle: {
					color: "#fff", // 修改图例文字颜色为红色
				},
			},
		};

		fieldChart.setOption(option);
	});
	//此处是compare的初始化
	onMounted(() => {
		let compareChart = echarts.init(document.getElementById("compare"));
		let option = {
			title: {
				text: "井盖对比",
				left: "left",
				textStyle: {
					color: "white",
					fontSize: 16, // 设置标题文本字号
					fontWeight: "bold", // 设置标题文本粗细
				},
			},
			xAxis: {
				type: "category",
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
					name: "2022年",
					data: [
						820, 932, 901, 934, 1290, 1330, 1320, 932, 901, 934, 1290, 1330,
					],
					type: "line",
					smooth: true,
				},
				//再来一个,数据都翻倍
				{
					name: "2023年",
					data: [
						1640, 1864, 1802, 1868, 2580, 2660, 2640, 1864, 1802, 1868, 2580,
						2660,
					],
					type: "line",
					smooth: true,
				},
			],
			legend: {
				data: [
					{
						name: "2022年",
					},
					{
						name: "2023年",
					},
				],
				textStyle: {
					color: "#fff", // 修改图例文字颜色为白色
				},
			},
		};
		compareChart.setOption(option);
	});
	//此处是age的初始化
	onMounted(() => {
		let ageChart = echarts.init(document.getElementById("age"));
		// 绘制图表
		let option = {
			title: {
				text: "井盖隐患分布",
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
						name: "缺失",
					},
					{
						name: "完好",
					},
					{
						name: "破损",
					},
					{
						name: "circle",
					},
					{
						name: "未盖",
					},
				],
				textStyle: {
					color: "white", // 修改图例文字颜色为红色
				},
			},
			series: [
				{
					name: "年龄分布",
					type: "pie",
					radius: "50%",
					data: [
						{ value: 1048, name: "缺失" },
						{ value: 735, name: "完好" },
						{ value: 580, name: "破损" },
						{ value: 484, name: "circle" },
						{ value: 300, name: "未盖" },
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
		ageChart.setOption(option);
	});
	//此处是profession的初始化
	onMounted(() => {
		//破损,会计教育,软件工程,旅游管理,
		let professionChart = echarts.init(document.getElementById("profession"));
		const myColor = [
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
		const Ydata = [
			"井圈",
			"缺失",
			"完好",
			"未盖",
			"破损",
		];
		const Xdata = [69, 39, 28, 51, 43];
		let option = {
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
		// setInterval(() => {
		//   if (option.dataZoom[0].endValue == Xdata.length) {
		//     option.dataZoom[0].endValue = 4;
		//     option.dataZoom[0].startValue = 0;
		//   } else {
		//     option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
		//     option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
		//   }
		//   professionChart.setOption(option);
		// }, 2000)
		professionChart.setOption(option);
	});
	//此处是payment的初始化
	onMounted(() => {
		let paymentChart = echarts.init(document.getElementById("payment"));
		// Generate data
		let category = [];
		console.log("In App.vue category::: ", category);
		console.log("In App.vue category::: ", category);

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
		let option = {
			backgroundColor: "#0f375f",
			title: {
				text: "井盖分布",
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
				data: ["6k以上", "6k以下"],
				textStyle: {
					color: "#ccc",
				},
				bottom: 10,
			},
			xAxis: {
				data: category,
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
					name: "6k以上",
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
					name: "6k以下",
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
		paymentChart.setOption(option);
	});
	//此处是area的初始化
	onMounted(() => {
		let option = {
			title: {
				text: "主要井盖地区分布",
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
				data: ["云南", "北京", "山东", "河北", "江苏", "浙江", "深圳"],
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
					radius: [20, 140],
					center: ["50%", "50%"],
					roseType: "area",
					itemStyle: {
						borderRadius: 5,
					},
					//云南,北京,山东,河北,江苏,浙江,深圳
					data: [
						{ value: 30, name: "云南" },
						{ value: 28, name: "北京" },
						{ value: 26, name: "山东" },
						{ value: 24, name: "河北" },
						{ value: 22, name: "江苏" },
						{ value: 20, name: "浙江" },
						{ value: 18, name: "深圳" },
					],
				},
			],
		};
		let areaChart = echarts.init(document.getElementById("area"));
		areaChart.setOption(option);
	});
	//此处是map的初始化
	onMounted(() => {
		let mapChart = echarts.init(document.getElementById("map"));
		var chinaGeoCoordMap = {
			黑龙江: [127.9688, 45.368],
			内蒙古: [110.3467, 41.4899],
			吉林: [125.8154, 44.2584],
			北京市: [116.4551, 40.2539],
			辽宁: [123.1238, 42.1216],
			河北: [114.4995, 38.1006],
			天津: [117.4219, 39.4189],
			山西: [112.3352, 37.9413],
			陕西: [109.1162, 34.2004],
			甘肃: [103.5901, 36.3043],
			宁夏: [106.3586, 38.1775],
			青海: [101.4038, 36.8207],
			新疆: [87.9236, 43.5883],
			西藏: [91.11, 29.97],
			四川: [103.9526, 30.7617],
			重庆: [108.384366, 30.439702],
			山东: [117.1582, 36.8701],
			河南: [113.4668, 34.6234],
			江苏: [118.8062, 31.9208],
			安徽: [117.29, 32.0581],
			湖北: [114.3896, 30.6628],
			浙江: [119.5313, 29.8773],
			福建: [119.4543, 25.9222],
			江西: [116.0046, 28.6633],
			湖南: [113.0823, 28.2568],
			贵州: [106.6992, 26.7682],
			云南: [102.9199, 25.4663],
			广东: [113.12244, 23.009505],
			广西: [108.479, 23.1152],
			海南: [110.3893, 19.8516],
			上海: [121.4648, 31.2891],
		};

		var chinaDatas = [
			[
				{
					name: "黑龙江",
					value: 500,
				},
			],
			[
				{
					name: "内蒙古",
					value: 300,
				},
			],
			[
				{
					name: "北京市",
					value: 200,
				},
			],
			[
				{
					name: "吉林",
					value: 300,
				},
			],
			[
				{
					name: "辽宁",
					value: 500,
				},
			],
			[
				{
					name: "河北",
					value: 600,
				},
			],
			[
				{
					name: "天津",
					value: 500,
				},
			],
			[
				{
					name: "山西",
					value: 700,
				},
			],
			[
				{
					name: "陕西",
					value: 600,
				},
			],
			[
				{
					name: "甘肃",
					value: 500,
				},
			],
			[
				{
					name: "宁夏",
					value: 500,
				},
			],
			[
				{
					name: "青海",
					value: 700,
				},
			],
			[
				{
					name: "新疆",
					value: 300,
				},
			],
			[
				{
					name: "西藏",
					value: 300,
				},
			],
			[
				{
					name: "四川",
					value: 1000,
				},
			],
			[
				{
					name: "重庆",
					value: 900,
				},
			],
			[
				{
					name: "广东",
					value: 300,
				},
			],
			[
				{
					name: "山东",
					value: 600,
				},
			],
			[
				{
					name: "河南",
					value: 1800,
				},
			],
			[
				{
					name: "江苏",
					value: 1000,
				},
			],
			[
				{
					name: "安徽",
					value: 900,
				},
			],
			[
				{
					name: "湖北",
					value: 3200,
				},
			],
			[
				{
					name: "浙江",
					value: 1600,
				},
			],
			[
				{
					name: "福建",
					value: 900,
				},
			],

			[
				{
					name: "湖南",
					value: 2400,
				},
			],
			[
				{
					name: "贵州",
					value: 800,
				},
			],
			[
				{
					name: "广西",
					value: 700,
				},
			],
			[
				{
					name: "海南",
					value: 700,
				},
			],
			[
				{
					name: "上海",
					value: 170,
				},
			],
			[
				{
					name: "江西",
					value: 170,
				},
			],
			[
				{
					name: "云南",
					value: 500,
				},
			],
		];

		var convertData = function (data) {
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var dataItem = data[i];
				var fromCoord = [114.3896, 30.6628];
				var toCoord = chinaGeoCoordMap[dataItem[0].name];
				if (fromCoord && toCoord) {
					res.push([
						{
							coord: fromCoord,
							value: dataItem[0].value,
						},
						{
							coord: toCoord,
						},
					]);
				}
			}
			return res;
		};

		var series = [];
		[["湖北", chinaDatas]].forEach(function (item, i) {
			console.log(item);
			series.push(
				{
					type: "lines",
					zlevel: 1,
					effect: {
						show: true,
						period: 4, //箭头指向速度，值越小速度越快
						trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
						symbol: "arrow", //箭头图标
						symbolSize: 5, //图标大小
					},
					lineStyle: {
						normal: {
							width: 1, //尾迹线条宽度
							opacity: 1, //尾迹线条透明度
							curveness: 0.3, //尾迹线条曲直度
						},
					},
					data: convertData(item[1]),
				},
				{
					type: "effectScatter",
					coordinateSystem: "geo",
					zlevel: 2,
					rippleEffect: {
						//涟漪特效
						period: 4, //动画时间，值越小速度越快
						brushType: "stroke", //波纹绘制方式 stroke, fill
						scale: 4, //波纹圆环最大限制，值越大波纹越大
					},
					label: {
						normal: {
							show: true,
							position: "right", //显示位置
							offset: [5, 0], //偏移设置
							formatter: function (params) {
								//圆环显示文字
								return params.data.name;
							},
							fontSize: 10,
						},
						emphasis: {
							show: true,
						},
					},
					symbol: "circle",
					symbolSize: function (val) {
						return 3 + (val[2] / 100) * 1; //圆环大小
					},
					itemStyle: {
						normal: {
							show: false,
							color: "#FFA54F",
						},
					},
					data: item[1].map(function (dataItem) {
						return {
							name: dataItem[0].name,
							value: chinaGeoCoordMap[dataItem[0].name].concat([
								dataItem[0].value,
							]),
						};
					}),
				},
				//被攻击点
				{
					type: "scatter",
					coordinateSystem: "geo",
					zlevel: 2,
					rippleEffect: {
						period: 4,
						brushType: "stroke",
						scale: 4,
					},
					label: {
						normal: {
							show: true,
							position: "right",
							//offset:[5, 0],
							color: "#0f0",
							formatter: "{b}",
							textStyle: {
								color: "#0f0",
							},
						},
						emphasis: {
							show: true,
							color: "#FFA54F",
						},
					},
					symbol: "pin",
					symbolSize: 50,
					data: [
						{
							name: item[0],
							value: chinaGeoCoordMap[item[0]].concat([10]),
						},
					],
				}
			);
		});

		let option = {
			tooltip: {
				trigger: "item",
				backgroundColor: "rgba(166, 200, 76, 0.82)",
				borderColor: "#FFFFCC",
				showDelay: 0,
				hideDelay: 0,
				enterable: true,
				transitionDuration: 0,
				extraCssText: "z-index:100",
				formatter: function (params, ticket, callback) {
					//根据业务自己拓展要显示的内容
					var res = "";
					var name = params.name;
					var value = params.value[params.seriesIndex + 1];
					res =
						"<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
					return res;
				},
			},
			backgroundColor: "#13297B",
			visualMap: {
				//图例值控制
				min: 1,
				max: 4000,
				calculable: true,
				show: true,
				color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
				textStyle: {
					color: "#fff",
				},
			},
			geo: {
				map: "china",
				zoom: 1.2,
				label: {
					emphasis: {
						show: false,
					},
				},
				roam: true, //是否允许缩放
				itemStyle: {
					normal: {
						color: "#13297B", //地图背景色
						borderColor: "#00ffff", //省市边界线00fcff 516a89
						borderWidth: 1,
					},
					emphasis: {
						color: "rgba(37, 43, 61, .5)", //悬浮背景
					},
				},
			},
			series: series,
		};
		
		// 点击某个省份跳转
		mapChart.on('click', function(params) {
		    console.log('点击了：' + params.name);
		    // console.log('经度：' + params.data.coord[0]);
		    // console.log('纬度：' + params.data.coord[1]);

    		// 传递参数到下一个路由
    		router.push({ 
    		    path: '/map2', 
    		    query: { 
    		        name: params.name
    		    } 
    		});
		});
		mapChart.setOption(option);
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

.map {
	width: 100%;
	height: 600px;
	display: flex;
	justify-content: center;
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
SELECT d.dept_name, de.employee_id, MAX(s.salary) as max_salary
FROM department_employee de
JOIN department d ON de.department_id = d.id
JOIN salary_table s ON de.employee_id = s.employee_id
WHERE de.to_date > sysdate
GROUP BY d.dept_name, de.employee_id;