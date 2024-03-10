<template>
	<div class="layout_index">
	  <div class="carousel">
		<el-card>
		  <el-carousel height="562.5px">
			<el-carousel-item
			  v-for="(item, index) in img_url"
			  :key="index"
			>
			  <el-image
				:src="item"
				fit="fill"
			  ></el-image>
			</el-carousel-item>
		  </el-carousel>
		</el-card>
  
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
			  <span> 待定任务 </span>
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
		</el-card>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { MoreFilled } from '@element-plus/icons-vue'
  import chart from './charts/indexchart.vue'
  
  const img_url = [
	'src/assets/images/carouselPic1.png',
	'src/assets/images/carouselPic2.png',
  ]
  const activities = [
	{
	  content: 'Custom icon',
	  timestamp: '2018-04-12 20:46',
	  size: 'large',
	  type: 'primary',
	  icon: MoreFilled,
	},
	{
	  content: 'Custom color',
	  timestamp: '2018-04-03 20:46',
	  color: '#0bbd87',
	},
	{
	  content: 'Custom size',
	  timestamp: '2018-04-03 20:46',
	  size: 'large',
	},
	{
	  content: 'Custom hollow',
	  timestamp: '2018-04-03 20:46',
	  type: 'primary',
	  hollow: true,
	},
	{
	  content: 'Default node',
	  timestamp: '2018-04-03 20:46',
	},
  ]
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
  