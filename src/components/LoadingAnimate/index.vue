<template>
	<div class="loading-container">
		<div class="dot-container">
			<span class="dot"></span>
			<span class="dot"></span>
			<span class="dot"></span>
		</div>
		<div>数据正在加载中...</div>
	</div>
</template>
<script setup>
const props = defineProps({
	text: {
		type: String,
		default: "数据加载中...",
	},
})
</script>
<style scoped>
.loading-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%; /* 占满父容器的宽度 */
	height: 100vh; /* 占满父容器的高度（也可以改为100%） */
	position: absolute; /* 确保加载动画覆盖整个父容器 */
	top: 0;
	left: 0;
	font-size: 18px;
	color: #888;
	background-color: white; /* 可以根据需要调整背景色 */
}

.dot-container {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}

.dot {
	width: 10px;
	height: 10px;
	margin: 0 5px;
	background-color: #409eff;
	border-radius: 50%;
	animation: bounce 1.2s infinite ease-in-out;
}

.dot:nth-child(2) {
	animation-delay: 0.2s;
}

.dot:nth-child(3) {
	animation-delay: 0.4s;
}

@keyframes bounce {
	0%,
	80%,
	100% {
		transform: scale(0);
	}
	40% {
		transform: scale(1);
	}
}
</style>
