<template>
	<div>
		<div>
			<el-button @click="backFatherNode"> 返回 </el-button>
		</div>
		<div>
			<el-table :data="props.recordList" stripe style="width: 100%">
				<el-table-column prop="start_time" label="开始时间" />
				<el-table-column prop="end_time" label="结束时间" />
				<el-table-column prop="device_id" label="设备ID" />
			</el-table>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	recordList: {
		type: Array,
		required: true,
	},
})
const emits = defineEmits(["close"])
const backFatherNode = () => {
	emits("close", false)
}
</script>
