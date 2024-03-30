<template>
	<div class="layout_index">
		<div class="carousel">
			<el-carousel height="562.5px">
				<el-carousel-item v-for="(item, index) in img_list" :key="index">
					<el-image :src="item" fit="fill"></el-image>
				</el-carousel-item>
			</el-carousel>

			<el-card>
				<div style="height: 400px">
					<chart></chart>
				</div>
			</el-card>
		</div>

		<div class="timeline">
			<el-card shadow="hover">
				<template #header>
					<div>
						<span> 待定任务. </span>
					</div>
				</template>
				<el-timeline>
					<el-timeline-item
						v-for="(activity, index) in activities"
						:key="index"
						:icon="activity.icon"
						:type="activity.type"
						:color="activity.color"
						:size="activity.size"
						:hollow="activity.hollow"
						:timestamp="activity.timestamp"
					>
						{{ activity.content }}
					</el-timeline-item>
				</el-timeline>
			</el-card>
			<el-card shadow="hover">
				<template #header>
					<div>
						<span>service info</span>
					</div>
				</template>
				{{ res }}
			</el-card>
		</div>
	</div>
</template>

<script setup>
import { MoreFilled } from "@element-plus/icons-vue"
import chart from "./charts/indexchart.vue"
import request from "../utils/request.js"
import { ref } from "vue"
import pic1 from "../assets/images/carouselPic1.png"
import pic2 from "../assets/images/carouselPic2.png"
const img_list = [pic1, pic2]
const activities = [
	{
		content: "Custom icon",
		timestamp: "2018-04-12 20:46",
		size: "large",
		type: "primary",
		icon: MoreFilled,
	},
	{
		content: "Custom color",
		timestamp: "2018-04-03 20:46",
		color: "#0bbd87",
	},
	{
		content: "Custom size",
		timestamp: "2018-04-03 20:46",
		size: "large",
	},
	{
		content: "Custom hollow",
		timestamp: "2018-04-03 20:46",
		type: "primary",
		hollow: true,
	},
	{
		content: "Default node",
		timestamp: "2018-04-03 20:46",
	},
]
var res = ref("")
</script>

<style scoped lang="scss">
.layout_index {
	display: flex;
	justify-content: space-between;
	margin: 30px 60px;
}
.carousel {
	width: 900px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.timeline {
	width: 400px;
	height: fit-content;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.chart {
	width: 900px;
	height: 400px;
}
</style>
