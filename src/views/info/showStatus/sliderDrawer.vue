<template>
	<el-drawer
		v-model="isShow"
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
		<el-descriptions title="硬件状态" border :column="1" v-if="mqttData">
			<el-descriptions-item label="buzzer">
				{{ mqttData.sevices.properties.buzzer }}
			</el-descriptions-item>
			<el-descriptions-item label="fan">
				{{ mqttData.sevices.properties.fan }}
			</el-descriptions-item>
			<el-descriptions-item label="led">
				{{ mqttData.sevices.properties.led }}
			</el-descriptions-item>
			<el-descriptions-item label="humidity">
				{{ mqttData.sevices.properties.humidity }}
			</el-descriptions-item>
			<el-descriptions-item label="temperature">
				{{ mqttData.sevices.properties.temperature }}
			</el-descriptions-item>
		</el-descriptions>
	</el-drawer>
</template>
<script setup>
import mqtt from "@/utils/mqtt.js"
import { watch } from "vue"
const isShow = ref(false)
const props = defineProps({
	drawerVisuable: {
		type: Boolean,
	},
	deviceInfo: {
		type: Object,
	},
})
const { startMqtt,closeMqtt } = mqtt.useMqtt()
const { drawerVisuable, deviceInfo } = toRefs(props)
const mqttData = ref(null)

const emit = defineEmits(["controlDrawerShow"])

const closeOperation = () => {
	emit("controlDrawerShow", false)
}
watch(
	() => drawerVisuable.value,
	(newVal) => {
		isShow.value = newVal
	}
)

// TODO: 调试mqtt
const getSubscribe = () => {
	startMqtt(mqtt.transformTopic(deviceInfo.productId,"service0"), (topic, payload, packet) => {
		mqttData.value = mqtt.unit8ArrayToJson(payload)
	})
}
// TODO test function
onMounted(() => {
	getSubscribe()
})
</script>
