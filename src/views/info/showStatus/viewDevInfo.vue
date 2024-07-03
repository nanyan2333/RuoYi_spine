<template>
	<el-dialog
		v-model="isShow"
		:before-close="closeOperation"
		width="500"
		title="设备信息">
		<el-descriptions border :column="1">
			<el-descriptions-item label="device-id" v-if="deviceInfo.deviceId">
				{{ deviceInfo.deviceId }}
			</el-descriptions-item>
			<el-descriptions-item label="device-name" v-if="deviceInfo.deviceName">
				{{ deviceInfo.deviceName }}
			</el-descriptions-item>
			<el-descriptions-item label="product-id">
				{{ deviceInfo.productId }}
			</el-descriptions-item>
			<el-descriptions-item label="product-name">
				{{ deviceInfo.productName }}
			</el-descriptions-item>
			<el-descriptions-item label="serial-number">
				{{ deviceInfo.serialNumber }}
			</el-descriptions-item>
			<el-descriptions-item label="active-time">
				{{ deviceInfo.activeTime }}
			</el-descriptions-item>
		</el-descriptions>
	</el-dialog>
</template>
<script setup>
import { ref, toRefs, watch } from "vue"

const props = defineProps({
	infoDialogVisuable: {
		type: Boolean,
	},
	deviceInfo: {
		type: Object,
	},
})
const isShow = ref(false)
const { infoDialogVisuable, deviceInfo } = toRefs(props)
const emit = defineEmits(["controlDevInfoIsShow"])
const closeOperation = () => {
	emit("controlDevInfoIsShow", false)
}
watch(
	() => infoDialogVisuable.value,
	(val) => {
		isShow.value = val
	}
)
</script>
