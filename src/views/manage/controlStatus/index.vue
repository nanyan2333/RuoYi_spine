<template>
	<div>
		<el-card style="margin-bottom: 6px">
			<el-form :inline="true">
				<el-form-item style="float: right">
					<el-button
						@click="openAddSubscribeForm = true"
						size="large"
						v-if="isEmpty"
						><el-icon><plus /></el-icon>新增订阅</el-button
					>
					<el-button @click="reset" size="large" v-else
						><el-icon><refresh /></el-icon>断开设备</el-button
					>
				</el-form-item>
				<el-form-item style="float: right"></el-form-item>
			</el-form>
		</el-card>
		<el-row :gutter="20">
			<el-col :span="16">
				<div class="chair-container">
					<el-empty description="请先请阅设备" v-if="isEmpty"> </el-empty>
					<div v-else>
						<span>this is a chair</span>
					</div>
				</div>
			</el-col>
			<el-col :span="8">
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
						<el-descriptions
							:column="1"
							border
							v-if="deviceMessageDict"
							v-for="(message, deviceId) in deviceMessageDict"
							:key="deviceId">
							<el-descriptions-item
								v-for="(senser_info, key) in message"
								:label="key">
								{{ senser_info }}
							</el-descriptions-item>
						</el-descriptions>
						<el-empty description="请先请阅设备" v-else> </el-empty>
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
</template>

<script setup>
import mqtt from "@/utils/mqtt"
import { onUnmounted, ref, watch } from "vue"
import { ElMessage } from "element-plus"
import useDeviceStroe from "@/store/modules/device.js"
import { getNowTime } from "@/utils/time.js"
import { updateRecord, addUseRecord } from "@/api/manage/log.js"

const openAddSubscribeForm = ref(false)
const { startMqtt, closeMqtt } = mqtt.useMqtt()
const addSubscribeForm = ref({
	topic: "",
	disabled: true,
})
const isEmpty = ref(true)
let updateControllerId

const deviceStore = useDeviceStroe()

//     {
//			"device_id": 1,
//     		"distance": 100,
//			...
//		}
//    product_id/service/#device_id
//    product_id/ping/#service_id
//    product_id/device/+
const deviceMessageDict = ref({})
const subscribe = (addSubscribeForm) => {
	// TODO 处理信息，传入的是productID，需要拓展
	if (addSubscribeForm.disabled) {
		startMqtt(
			mqtt.transformTopic(addSubscribeForm.topic, "service1"),
			(topic, payload, packet) => {
				let devId = topic.split("/")[2]
				deviceMessageDict.value[devId] = mqtt.unit8ArrayToJson(payload)
				isEmpty.value = false
			}
		)
		// 定时器每分钟上传传感器数据
		updateControllerId = setInterval(() => {
			updateRecord(deviceMessageDict.value)
		}, 60000)
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
	for (const key in deviceMessageDict.value) {
		addUseRecord(
			deviceStore.startUseTime,
			deviceStore.endUseTime,
			deviceMessageDict.value[key].device_id
		)
	}
	deviceMessageDict.value = {}
	clearInterval(updateControllerId) //清除定时器
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
