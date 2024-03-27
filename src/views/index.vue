<template>
	<div class="layout_index">
		<div class="carousel">gi
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
			<el-card shadow="always">
				<template #header>
					<div>
					<span> 待定任务 </span>
					</div>
				</template>
				<div style="margin: 20px 0" />
					<div v-for="(task, index) in tasks" :key="index" class="task-item">
						<span>任务{{ index + 1 }}</span>
						<el-input
						v-model="task.content"
						placeholder="请输入内容"
						@keyup.enter="addInput(index)"
					/>
				</div>
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
const tasks = ref([{ content: '' }])
const addInput = (index) => {
  tasks.value.splice(index + 1, 0, { content: '' })
}
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
.task-item {
  display: flex;
  flex-direction: column; /* 改为垂直布局 */
  align-items: flex-start; /* 文字左对齐 */
  margin-bottom: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  font-size: 1rem;
  text-shadow: none; /* 移除文字阴影 */
  transition: all 0.3s ease;
}


.task-item input {
  margin-bottom: 10px; /* 为输入框添加底部边距 */
}


.task-item:hover {
  transform: translateY(-2px); /* 鼠标悬停时轻微上移，增加交互感 */
  box-shadow: 0px 4px 5px rgba(0,0,0,0.2); /* 鼠标悬停时添加阴影，突出显示 */
}

.task-item span {
  margin-right: 10px;
}
</style>
