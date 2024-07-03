<template>
	<el-drawer
		v-model="isShow"
		title="运行状态"
		direction="rtl"
		@open="getSubscribe"
		:before-close="closeOperation">
		<el-button @click="getSubscribe">订阅</el-button>
		<el-descriptions title="设备信息" border :column="1">
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
		<el-descriptions
			:title="key"
			border
			:column="1"
			v-if="deviceIdList"
			v-for="(message, key) in deviceIdList"
			:key="key">
			<el-descriptions-item
				v-for="(value, property) in message"
				:label="property"
				:key="property">
				{{ value }}
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
const deviceIdList = ref({})
const { startMqtt, closeMqtt } = mqtt.useMqtt()
const { drawerVisuable, deviceInfo } = toRefs(props)
const mqttData = ref(null)

const emit = defineEmits(["controlDrawerShow"])

const closeOperation = () => {
	closeMqtt(() => {})
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
	startMqtt(
		mqtt.transformTopic(deviceInfo.value.productId, "service1"),
		(topic, payload, packet) => {
			let value = mqtt.unit8ArrayToJson(payload)
			let topicParts = topic.split("/")
			let deviceId = topicParts[topicParts.length - 1]
			if (deviceId in deviceIdList) {
				deviceIdList.value[deviceId] = value
			} else {
				deviceIdList.value = {
					...deviceIdList.value,
					[deviceId]: value,
				}
			}
		}
	)
}
// TODO test function
</script>
