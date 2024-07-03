<template>
	<div>
		<el-card style="margin-bottom: 6px">
			<el-form :inline="true">
				<el-form-item style="float: right">
					<el-button @click="openAddSubscribeForm = true" size="large"
						><el-icon><plus /></el-icon>新增订阅</el-button
					>
					<el-button @click="reset" size="large"
						><el-icon><refresh /></el-icon> 重置</el-button
					>
				</el-form-item>
				<el-form-item style="float: right"></el-form-item>
			</el-form>
		</el-card>
		<el-row :gutter="20">
			<el-col :span="16">
				<div class="chair-container">
					<el-empty description="请先请阅设备" v-if="isEmpty">
						<el-button @click="openAddSubscribeForm = true"
							><el-icon><plus /></el-icon>新增订阅</el-button
						>
					</el-empty>
					<!--  TODO 3d椅子组件 -->
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
							<el-descriptions-item label="id">
								{{ message.device_id }}
							</el-descriptions-item>
							<el-descriptions-item label="distance">
								{{ message.distance }}
							</el-descriptions-item>
						</el-descriptions>
						<el-empty description="请先请阅设备" v-else> </el-empty>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-dialog title="新增订阅" v-model="openAddSubscribeForm">
			<el-form :model="addSubscribeForm" label-width="100px">
				<el-form-item label="productId">
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
import { reactive, ref, watch } from "vue"
import api from "@/api/manage/log.js"
const openAddSubscribeForm = ref(false)
const { startMqtt, closeMqtt } = mqtt.useMqtt()
const addSubscribeForm = ref({
	topic: "",
	disabled: true,
})
const isEmpty = ref(true)

//     {
//			"device_id": 1,
//     		"distance": 100,
//			...
//		}
const { updateLog } = api
watch(
	() => deviceMessageDict.value,
	(newVal) => {
		updateLog(newVal)
	}
)

//    #product_id/service/#device_id
//    #product_id/ping/#service_id
//  product_id/device/+
const deviceMessageDict = ref({})
const subscribe = (addSubscribeForm) => {
	// TODO 处理信息，传入的是productID，需要拓展
	console.log(addSubscribeForm)
	if (addSubscribeForm.disabled) {
		startMqtt(
			mqtt.transformTopic(addSubscribeForm.topic, "service1"),
			(topic, payload, packet) => {
				let devId = topic.split("/")[2]
				deviceMessageDict.value[devId] = mqtt.unit8ArrayToJson(payload)
				isEmpty.value = false
			}
		)
	}
	openAddSubscribeForm.value = false
}

const reset = () => {
	closeMqtt(() => {
		console.log("close")
	})
	deviceMessageDict.value = {}
	isEmpty.value = true
}
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
