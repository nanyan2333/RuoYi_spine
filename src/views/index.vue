<template>
	<div class="layout_index">
		<el-row :gutter="100">
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
						<span> 待定任务.</span>
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
						<span><el-icon><Menu /></el-icon> 设备统计</span>
					</div>
				</template>
				<!-- <el-row :gutter="10">
					<el-card class="custom-border">
						<el-col :span="4"> <el-icon><FirstAidKit /></el-icon> </el-col>			
						<el-col :span="10"> nihao</el-col>
					</el-card>
					<el-card class="custom-border">
						<el-col :span="4"> <el-icon><FirstAidKit /></el-icon> </el-col>			
						<el-col :span="20"> nihao</el-col>
					</el-card>
					<el-card class="custom-border">
						<el-col :span="4"> <el-icon><FirstAidKit /></el-icon> </el-col>			
						<el-col :span="20"> nihao</el-col>
					</el-card>
				</el-row> -->
				<el-row :gutter="20">
					<el-col :span="12">
						<el-card class="rounded-card">
							<span><el-icon><Menu /></el-icon> 设备数量</span>
						</el-card>
					</el-col>
					<el-col :span="12"><el-card class="rounded-card">监控信息</el-card></el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12"><el-card class="rounded-card">操作记录</el-card></el-col>
					<el-col :span="12"><el-card class="rounded-card">报警信息</el-card></el-col>
				</el-row>
			</el-card>
		</div>
		
		</el-row>

		
				
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

</style>
