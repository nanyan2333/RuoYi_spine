<template>
	<div>
		<!-- <el-card style="margin-bottom: 6px">
			<el-form :inline="true">
				<el-form-item style="float: left">
					
				</el-form-item>
				<el-form-item style="float: right"></el-form-item>
			</el-form>
		</el-card> -->
		<div style="padding: 10px; width: 100px">
			<el-button
				@click="openAddSubscribeForm = true"
				size="large"
				v-if="isEmpty"
				><el-icon><plus /></el-icon>新增订阅</el-button
			>
			<el-button @click="reset" size="large" v-else
				><el-icon><refresh /></el-icon>断开设备</el-button
			>
		</div>
		<el-empty description="请先请阅设备" v-if="isEmpty"> </el-empty>
		<el-row :gutter="20" v-else>
			<el-col :span="18">
				<div class="chair-container">
					
					<div>
						<div
							style="height: 400px; width: 900px"
							v-for="(array, name) in sensorInfoYAxis">
							<base-line
								:key="name"
								:xAxis="timeXAxis"
								:yAxis="array"
								:title="name"
								:smooth="true"
								:height="400"
								:width="800"></base-line>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="info-menu">
					<el-card>
						<template #header>
							<div class="header-container">
								<img
									src="@/assets/icons/svg/deviceStatus.svg"
									alt=""
									style="width: 40px; height: auto" />
								<el-text size="large">设备状态</el-text>
							</div>
						</template>
						<el-descriptions :column="1" border v-if="showData">
							<el-descriptions-item
								v-for="(senser_info, key) in showData"
								:label="key">
								{{ senser_info }}
							</el-descriptions-item>
						</el-descriptions>
						<el-empty description="尚未上传数据" v-else> </el-empty>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-dialog title="新增订阅" v-model="openAddSubscribeForm">
			<el-form :model="addSubscribeForm" label-width="100px">
				<el-form-item label="deviceId">
					<el-input v-model="addSubscribeForm.topic"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div>
					<el-button @click="subscribe(addSubscribeForm)" size="large">
						订阅
					</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
	<warn-notify :showData="showData" />
</template>

<script setup>
import mqtt from "@/utils/mqtt"
import { onUnmounted, ref, watch } from "vue"
import { ElMessage } from "element-plus"
import useDeviceStroe from "@/store/modules/device.js"
import { getNowTime } from "@/utils/time.js"
import { updateRecord, addUseRecord } from "@/api/manage/log.js"
import baseLine from "../../charts/baseLine.vue"
import WarnNotify from "./warnNotify"

const openAddSubscribeForm = ref(false)
const { startMqtt, closeMqtt } = mqtt.useMqtt()
const addSubscribeForm = ref({
	topic: "",
	disabled: true,
})
const isEmpty = ref(true)

const deviceStore = useDeviceStroe()

//     {
//			"device_id": 1,
//     		"distance": 100,
//			...
//		}
//    product_id/service/#device_id
//    product_id/ping/#service_id
//    product_id/device/+
const deviceMessageDict = ref([])
const timeXAxis = ref([])
const sensorInfoYAxis = ref({})
const deviceId = ref("")
const showData = ref({})

const subscribe = (addSubscribeForm) => {
	// TODO 处理信息，传入的是productID，需要拓展
	if (addSubscribeForm.disabled) {
		startMqtt(
			mqtt.transformTopic(addSubscribeForm.topic, "service1"),
			(topic, payload, packet) => {
				deviceId.value = topic.split("/")[2]
				let nowTime = getNowTime()
				const message = mqtt.unit8ArrayToJson(payload)
				showData.value = { ...message }
				const data = { time: nowTime, ...message }
				timeXAxis.value.push(nowTime.split(" ")[1])
				deviceMessageDict.value.push(data)
				for (const key in message) {
					if (key == "deviceId") continue
					else {
						sensorInfoYAxis.value[key] = sensorInfoYAxis.value[key] || []
						sensorInfoYAxis.value[key].push(message[key])
					}
				}
				console.log(sensorInfoYAxis.value)
				isEmpty.value = false
			}
		)
	}
	if (!isEmpty.value) {
		deviceStore.startUseTime = getNowTime()
	}
	openAddSubscribeForm.value = false
}

const reset = () => {
	closeMqtt(() => {
		if (isEmpty) {
			ElMessage.success("已断开连接")
		}
	})
	deviceStore.endUseTime = getNowTime()
	// 添加使用记录
	addUseRecord(deviceStore.startUseTime, deviceStore.endUseTime, deviceId.value)
		.then((result) => {
			updateRecord(result.data.id, deviceMessageDict.value).then((result) => {})
		})
		.catch((err) => {})

	deviceMessageDict.value = []
	showData.value = {}
	deviceId.value = ""
	isEmpty.value = true
}

onUnmounted(() => {
	reset()
})
</script>

<style scoped lang="scss">
.container {
	padding: "10px";
}
.chair-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.header-container {
	display: flex;
	align-items: center;
	gap: 10px;
}
</style>
