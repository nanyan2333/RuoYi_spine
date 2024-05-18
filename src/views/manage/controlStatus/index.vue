<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="16">
				<div class="chair-container">
					<el-empty description="请先请阅设备" v-if="isEmpty">
						<el-button @click="openAddSubscribeForm = true">新增订阅</el-button>
					</el-empty>
					<!--  TODO 3d椅子组件 -->
					<div v-else></div>
				</div>
			</el-col>
			<el-col :span="8">
				<div class="info-menu">
					<el-card>
						<template #header>
							<div class="header-container">
								<spine-svg icon-name="deviceStatus"></spine-svg>
								<el-text size="large">设备状态</el-text>
							</div>
						</template>
						<el-descriptions :column="1" border>
							<el-descriptions-item label="i">{{
								src.sevices.service_id
							}}</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.buzzer }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.fan }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.distance }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.temperature }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.infrared }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.light }}
							</el-descriptions-item>
							<el-descriptions-item label="i">
								{{ src.sevices.properties.distance }}
							</el-descriptions-item>
						</el-descriptions>
						<span>{{ data }}</span>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-dialog title="新增订阅" v-model="openAddSubscribeForm">
			<el-form :model="addSubscribeForm" label-width="100px">
				<el-form-item label="订阅名称" prop="name">
					<el-input v-model="addSubscribeForm.topic"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div>
					<el-button @click="subscribe(addSubscribeForm)"> 订阅 </el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import mqtt from "@/utils/mqtt"
import { reactive, ref } from "vue"
import SpineSvg from '@/components/SpineSvg/svgicon.vue';
const openAddSubscribeForm = ref(false)
const { startMqtt } = mqtt.useMqtt()
const data = ref("null")
const addSubscribeForm = ref({
	topic: "",
	disabled: true,
})
const isEmpty = ref(true)
const src = ref({
	sevices: {
		service_id: "1",
		device_id: "2",
		properties: {
			buzzer: "off",
			fan: "off",
			humidity: "off",
			temperature: 28,
			light: 134,
			proximity: 184,
			infrared: 23,
			distance: 1067,
		},
	},
})

//    #product_id/service/#device_id
//    #product_id/ping/#service_id
// TODO product_id/device/+

const subscribe = (addSubscribeForm) => {
	console.log(addSubscribeForm)
	if (addSubscribeForm.disabled) {
		startMqtt(addSubscribeForm.topic, (topic, payload, packet) => {
			// src.value = mqtt.unit8ArrayToJson(payload)
			data.value = mqtt.unit8ArrayToString(payload)
			console.log(data.value)
		})
	}
	openAddSubscribeForm.value = false
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
