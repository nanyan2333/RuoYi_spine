<template>
	<div>
		<el-carousel indicator-position="outside">
			<el-carousel-item
				v-for="(item, index) in img_url"
				:key="index"
			>
				<img
					src=""
					alt=""
				/>
			</el-carousel-item>
		</el-carousel>
	</div>
	<div><h1>hhhhhhhhhhhhh</h1></div>
	<div>
		<el-timeline
			v-for="(task, index) in activities"
			:key="index"
			:timestamp="task.timestamp"
		>
			{{ task.content }}
		</el-timeline>
	</div>

	<div>
		<el-card>
			<template #title>
				<h3>服务信息</h3>
			</template>
			<el-divider />
			<div>
				<!-- <div>
          <el-text> 服务器状态 </el-text>
          <template v-if="serveInfo.status">
            <img
              src=""
              alt=""
            />
            <el-text>已连接</el-text>
          </template>
          <template v-else>
            <img
              src=""
              alt=""
            />
            <el-text> 未连接 </el-text>
          </template>
        </div> -->
				<div>
					<el-text> 服务器ip </el-text>
					<el-text> {{ serveInfo.ip }} </el-text>
				</div>
				<div>
					<el-text> 运行时长 </el-text>
					<el-text> {{ serveInfo.runtime }} </el-text>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
const img_url = ref([]);
const serveInfo = ref({
	status: true,
	ip: "8.141.90.154",
	runtime: "8:01:24",
});

const timelineInfo = ref({});
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
];

// const getServeInfo = () => {

// }

// const getTask= () => {

// }

// const addTask = (TaskInfo) => {

// }

// const getTimelineInfo = () => {

// }
</script>

<style scoped lang="scss">

</style>
