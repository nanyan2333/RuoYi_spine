<template>
	<el-dialog v-model="dialogVisuable" width="500" center title="新增设备" :before-close="cancelOperation">
		<el-form :model="deviceInfo" label-width="auto">
			<el-form-item label="设备ID">
				<el-input
					v-model="deviceInfo.deviceId"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="设备名称">
				<el-input
					v-model="deviceInfo.deviceName"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品ID">
				<el-input
					v-model="deviceInfo.productId"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品名称">
				<el-input
					v-model="deviceInfo.productName"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="产品系列号">
				<el-input
					v-model="deviceInfo.serialNumber"
					clearable
					style="width: 300px"></el-input>
			</el-form-item>
			<el-form-item label="激活时间">
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

const Store = useDeviceStroe()
const props = defineProps({
	dialogVisuable: {
		type: Boolean,
	},
})

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
	deviceInfo.createTime = formattedTime
	Store.addDevice(deviceInfo.value).then((res) => {
		if (res.statusCode != 200) {
			ElMessageBox.alert("新增设备失败", "连接错误", {
				confirmButtonText: "确定",
				type: "warning",
			})
		} else {
			ElMessage({
				type: "success",
				message: "新增设备成功",
			})
		}
		cancelOperation()
	})
}

const disableDate = (time) => {
	return time.getTime() > Date.now()
}
</script>
<style scoped lang="scss"></style>
