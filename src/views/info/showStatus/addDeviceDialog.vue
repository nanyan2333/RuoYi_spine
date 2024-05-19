<template>
	<el-dialog
		v-model="dialogVisuable"
		width="500"
		center
		title="新增设备"
		:before-close="cancelOperation">
		<el-form
			:model="deviceInfo"
			label-width="auto"
			:rules="rules"
			ref="formDom">
			<el-form-item label="设备ID" prop="deviceId">
				<el-input
					v-model="deviceInfo.deviceId"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="设备名称" prop="deviceName">
				<el-input
					v-model="deviceInfo.deviceName"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品ID" prop="productId">
				<el-input
					v-model="deviceInfo.productId"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品名称" prop="productName">
				<el-input
					v-model="deviceInfo.productName"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品系列号" prop="serialNumber">
				<el-input
					v-model="deviceInfo.serialNumber"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="激活时间" prop="activeTime">
				<el-date-picker
					v-model="deviceInfo.activeTime"
					type="date"
					placeholder="选择激活日期"
					:disable-date="disableDate"
					style="width: 300px">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<template #footer>
			<div>
				<el-button @click="cancelOperation">取 消</el-button>
				<el-button type="primary" @click="addDevice">确 定</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import useDeviceStroe from "@/store/modules/device.js"
import { toRefs, watch } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import mqtt from "@/utils/mqtt.js"

const Store = useDeviceStroe()
const props = defineProps({
	dialogVisuable: {
		type: Boolean,
	},
})
const formDom = ref(null)
const { startMqtt, closeMqtt } = mqtt.useMqtt()

const deviceInfo = ref({
	deviceId: "",
	deviceName: "",
	productId: "",
	productName: "",
	serialNumber: "",
	activeTime: "",
	createTime: "",
	transport: "MQTT",
})
const rules = ref({
	deviceId: [{ required: false }],
	deviceName: [{ required: false }],
	productId: [
		{ required: true, message: "please input product Id", trigger: "blur" },
	],
	productName: [
		{ required: true, message: "please input product name", trigger: "blur" },
	],
	serialNumber: [
		{ required: true, message: "please input serial number", trigger: "blur" },
	],
	activeTime: [
		{ required: true, message: "please input active time", trigger: "blur" },
	],
})
const { dialogVisuable } = toRefs(props)

const emit = defineEmits(["controlDialogShow"])

const cancelOperation = () => {
	emit("controlDialogShow", false)
}
const addDevice = () => {
	const now = new Date()
	const year = now.getFullYear()
	const month = ("0" + (now.getMonth() + 1)).slice(-2)
	const day = ("0" + now.getDate()).slice(-2)
	const formattedTime = year + "-" + month + "-" + day
	deviceInfo.value.createTime = formattedTime
	formDom.value.validate((valid) => {
		if (valid) {
			// let flag = false
			// startMqtt(
			// 	mqtt.transformTopic(deviceInfo.value.productId, "service1"),
			// 	(topic, payload, packet) => {
			// 		flag = true
			// 		closeMqtt(()=>{
			// 			console.log("close mqtt")
			// 		})
			// 	}
			// )
			// setTimeout(() => {}, 500)
			Store.addDevice(deviceInfo.value).then((res) => {
				ElMessage({
					type: "success",
					message: "新增设备成功",
				})
				cancelOperation()
			})
		} else {
			resetForm()
			ElMessage({
                type: "error",
                message: "新增设备失败",
            })
		}
	})
}

const resetForm = () => {
	deviceInfo.value.deviceId = ""
	deviceInfo.value.deviceName = ""
	deviceInfo.value.productId = ""
	deviceInfo.value.productName = ""
	deviceInfo.value.serialNumber = ""
	deviceInfo.value.activeTime = ""
}
// TODO debug,不能禁止未来时间的选择
const disableDate = (time) => {
	return time.getTime() > Date.now()
}
</script>
<style scoped lang="scss"></style>
