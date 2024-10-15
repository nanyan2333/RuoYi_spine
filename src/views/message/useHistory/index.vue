<template>
	<div class="top-bar">
		<!-- 卡片部分 -->
		<div class="top-all-bar">
			<el-card class="info-card">
				<div class="content">
					<img
						class="card-icon"
						src="@/assets/icons/svg/useCount.svg"
						alt="总共使用图标" />
					<div class="text-content">
						<el-text class="card-value">{{ times }}次</el-text>
						<el-text class="card-label">总共使用</el-text>
					</div>
				</div>
			</el-card>
			<el-card class="info-card">
				<div class="content">
					<img
						class="card-icon"
						src="@/assets/icons/svg/newUse.svg"
						alt="最近使用图标" />
					<div class="text-content">
						<el-text class="card-value">{{ times }}次</el-text>
						<el-text class="card-label">最近一个月使用</el-text>
					</div>
				</div>
			</el-card>
			<el-card class="info-card">
				<div class="content">
					<img
						class="card-icon"
						src="@/assets/icons/svg/device.svg"
						alt="设备数图标" />
					<div class="text-content">
						<el-text class="card-value">{{ deviceNum }}</el-text>
						<el-text class="card-label">设备数</el-text>
					</div>
				</div>
			</el-card>
		</div>
		<!-- 图表部分 -->
		<div class="chart-card">
			<el-card>
				<template #header>
					<div>
						<el-text class="card-label">近一个月使用记录</el-text>
					</div>
				</template>
				<base-line :xAxis="useRecordList" :yAxis="dataRecordList"></base-line>
			</el-card>
		</div>
	</div>

	<page-list :record-list="useRecordList" @close=""></page-list>

</template>

<script setup>
import BaseLine from "../../charts/baseLine.vue"
import { getUseRecord, getRecord } from "@/api/manage/log.js"
import { onMounted, ref } from "vue"
import {getLastMonthDates,getRandomData} from "@/utils/time.js"
import PageList from "./pageList.vue"

const useRecordList = ref([1, 2, 3, 4, 5, 6, 7, 8])
const dataRecordList = ref([1, 2, 3, 4, 5, 6, 7, 8])
const times = ref(0)
const deviceNum = ref(0)


useRecordList.value = getLastMonthDates()
dataRecordList.value = getRandomData(30)
onMounted(() => {
	// 获取使用记录
	getUseRecord().then((res) => {
		useRecordList.value = res.data
	})

	// 获取数据记录
	getRecord().then((res) => {
		dataRecordList.value = res.data
	})
})
</script>

<style lang="css" scoped>
.top-bar {
	display: flex;
	flex-direction: column;
}

.top-all-bar {
	display: flex;
	justify-content: center; /* 均匀分布卡片 */
	padding-top: 30px;
	padding-bottom: 30px;
	gap: 15%; /* 卡片间距 */
}

.info-card {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 300px; /* 限制每个卡片的最大宽度 */
	border-radius: 15px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影效果 */
	height: auto;
}

.card-value {
	font-size: 26px; /* 调整值的字体大小 */
	font-weight: bold;
	line-height: 1.2;
}

.card-label {
	font-size: 18px; /* 调整标签的字体大小 */
	color: #888; /* 使标签颜色较浅 */
}

.content {
	display: flex;
	align-items: center; /* 垂直居中图标和文本 */
	width: 100%;
	padding: 10px;
}

.card-icon {
	width: 60px; /* 图标宽度 */
	height: 60px; /* 图标高度 */
	margin-right: 15px; /* 图标与文本间距 */
}

.text-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* 使文本左对齐 */
}
.chart-card {
	display: flex;
	justify-content: center;
	width: 100%;
	height: auto;
}
</style>
