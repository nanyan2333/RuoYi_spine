<template>
	<!-- 图表容器 -->
	<div
		ref="chartRef"
		:style="{ width: width + 'px', height: height + 'px' }"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, toRefs, watch } from "vue"
import * as echarts from "echarts/core"
import { LineChart } from "echarts/charts"
import {
	TooltipComponent,
	LegendComponent,
	GridComponent,
	TitleComponent
} from "echarts/components"
import { CanvasRenderer } from "echarts/renderers"

// 注册需要的组件
echarts.use([
	LineChart,
	TooltipComponent,
	LegendComponent,
	GridComponent,
	CanvasRenderer,
	TitleComponent
])

const chartRef = ref(null)
let chartInstance = null
const data = defineProps({
	xAxis: {
		type: [Object],
		require: true,
	},
	yAxis: {
		type: [Object],
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
	title: {
		type: String,
		default: "Line Chart",
	},
})

const { xAxis, yAxis, height, width, smooth, title } = toRefs(data)

const initChart = () => {
	if (chartRef.value) {
		chartInstance = echarts.init(chartRef.value)
		updateChart()
	}
}

const updateChart = () => {
	if (chartInstance) {
		const option = {
			title: { text: title.value },
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
					smooth: smooth.value,
				},
			],
		}
		chartInstance.setOption(option) // 重新渲染
	}
}

onMounted(() => {
	initChart()
})

onBeforeUnmount(() => {
	if (chartInstance) {
		chartInstance.dispose()
	}
})

watch(
	() => data.xAxis,
	() => {
		updateChart()
	},
	{ deep: true }
)
</script>

<style scoped>
/* 设置图表的大小 */
</style>
