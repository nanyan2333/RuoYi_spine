<template>
	<!-- 图表容器 -->
	<div
		ref="chartRef"
		:style="{ width: width + 'px', height: height + 'px' }"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, toRefs } from "vue"
// 按需导入ECharts核心和组件
import * as echarts from "echarts/core"
import { LineChart } from "echarts/charts"
import {
	TooltipComponent,
	LegendComponent,
	GridComponent,
} from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

// 注册需要的组件
echarts.use([
	LineChart,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	CanvasRenderer,
])

// 使用ref定义图表DOM的引用
const chartRef = ref(null)
let chartInstance = null
const data = defineProps({
	xAxis: {
		type: Array,
		require: true,
	},
	yAxis: {
		type: Array,
		require: true,
	},
	height: {
		type: Number,
		default: 400,
	},
	width: {
		type: Number,
		default: 1300,
	},
	smooth: {
		type: Boolean,
		default: false,
	},
})
const { xAxis, yAxis, height, width, smooth } = toRefs(data)
// 初始化图表的函数
const initChart = () => {
	if (chartRef.value) {
		// 初始化ECharts实例
		chartInstance = echarts.init(chartRef.value)

		// 配置选项
		const option = {
			legend: {},
			tooltip: {},

			xAxis: { type: "category", data: xAxis.value },
			yAxis: { type: "value" },
			series: [
				{
					data: yAxis.value,
					type: "line",
					label: {
						show: true,
					},
					smooth: smooth.value, // 平滑曲线
				},
			],
		}

		// 应用选项
		chartInstance.setOption(option)
	}
}

// 在组件挂载时初始化图表
onMounted(() => {
	initChart()
})

// 在组件销毁前销毁图表实例，防止内存泄漏
onBeforeUnmount(() => {
	if (chartInstance) {
		chartInstance.dispose()
	}
})
</script>

<style scoped>
/* 设置图表的大小 */
</style>
