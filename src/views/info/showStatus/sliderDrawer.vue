<template>
	<el-drawer
		v-model="drawerVisuable"
		title="运行状态"
		direction="rtl"
		:before-close="closeOperation">
		<el-descriptions title="设备信息" border :column="1">
            <el-descriptions-item label="device-id">
                {{ deviceInfo.deviceId }}
            </el-descriptions-item>
            <el-descriptions-item label="device-name">
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
	</el-drawer>
</template>
<script setup>

import mqtt from "@/utils/mqtt.js"
const store = useDeviceStroe()
const props = defineProps({
	drawerVisuable: {
		type: Boolean,
	},
	deviceInfo: {
		type: Object,
	},
})
const { drawerVisuable, deviceInfo } = toRefs(props)

const emit = defineEmits(["controlDrawerShow"])

const closeOperation = () => {
	emit("controlDrawerShow", false)
}

 
</script>
