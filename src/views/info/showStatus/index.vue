<template>
	<div>
		<el-card style="margin-bottom: 6px">
			<el-form
				:model="queryParams"
				:inline="true"
				label-width="75px"
				style="margin-bottom: -20px">
				<el-form-item label="设备名称">
					<el-input
						v-model="queryParams.deviceName"
						placeholder="请输入设备名称"
						clearable
						style="width: 150px" />
				</el-form-item>
				<el-form-item label="设备编号">
					<el-input
						v-model="queryParams.serialNumber"
						placeholder="请输入设备编号"
						clearable
						style="width: 150px" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="handleQuery"
						><el-icon><Search /></el-icon> 搜索</el-button
					>
					<el-button size="small" @click="resetquery"
						><el-icon><refresh /></el-icon>重置</el-button
					>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button
						type="primary"
						plain
						size="small"
						@click="dialogVisuable = true"
						><el-icon><plus /></el-icon>新增</el-button
					>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card style="padding-bottom: 100px">
			<el-row :gutter="30" v-loading="loading">
				<el-col
					:xs="24"
					:sm="12"
					:md="12"
					:lg="8"
					:xl="6"
					v-for="(item, index) in Store.deviceList"
					:key="index"
					style="margin-bottom: 30px; text-align: center">
					<el-card
						:body-style="{ padding: '20px' }"
						shadow="always"
						class="card-item">
						<el-row :gutter="10" justify="space-between">
							<el-col :span="20" style="text-align: left">
								<span style="margin: 0 5px">{{ item.deviceName }}</span>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col :span="17">
								<div
									style="
										text-align: left;
										line-height: 40px;
										white-space: nowrap;
									">
									<span style="display: inline-block; margin: 0 10px">
										<el-tag size="small" v-if="item.protocolCode">{{
											item.protocolCode
										}}</el-tag>
									</span>
									<el-tag size="small" v-if="item.transport">{{
										item.transport
									}}</el-tag>
								</div>
								<el-descriptions
									:column="1"
									:size="descriptionSize"
									style="white-space: nowrap">
									<el-descriptions-item label="编号">
										{{ item.serialNumber }}
									</el-descriptions-item>
									<el-descriptions-item label="产品">
										{{ item.productName }}
									</el-descriptions-item>
									<el-descriptions-item label="激活时间">
										{{ parseTime(item.activeTime, "{y}-{m}-{d}") }}
									</el-descriptions-item>
								</el-descriptions>
							</el-col>
							<el-col :span="7">
								<div style="margin-top: 10px">
									<img
										src="@/assets/images/product.png"
										alt="未加载"
										style="width: 120px; height: auto" />
								</div>
							</el-col>
						</el-row>
						<el-button-group style="margin-top: 15px">
							<el-button type="danger" size="small" style="padding: 5px 10px" @click="deleteDevice(item)"
								>删除</el-button
							>
							//TODO 添加查看页面和运行状态页面
							<el-button type="primary" size="small" style="padding: 5px 15px"
								>查看</el-button
							>
							<el-button type="success" size="small" style="padding: 5px 15px"
								>运行状态</el-button
							>
						</el-button-group>
					</el-card>
				</el-col>
			</el-row>
			<el-empty
				description="暂无数据，请添加设备"
				v-if="Store.total == 0"></el-empty>
		</el-card>
		<addDeviceDialog
			:dialog-visuable="dialogVisuable"
			@control-dialog-show="(val) => (dialogVisuable = val)"></addDeviceDialog>
		<div style="padding: 20px">
			<el-pagination
				v-model:current-page="pageParams.pageNum"
				v-model:page-size="pageParams.pageSize"
				:page-sizes="[9, 18, 27, 54]"
				:small="small"
				:disabled="disabled"
				:background="background"
				layout="total, sizes, prev, pager, next, jumper"
				:total="Store.total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<script setup>
//test
import { ref, watch } from "vue"
import useDeviceStore from "@/store/modules/device.js"
import addDeviceDialog from "./addDeviceDialog.vue"
const descriptionSize = ref("small")
const Store = useDeviceStore()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const dialogVisuable = ref(false)
const queryParams = ref({
	deviceName: "",
	serialNumber: "",
})
const pageParams = ref({
	pageNum: 1,
	pageSize: 9,
})
const deviceInfo = ref({
	deviceId: 0,
	deviceName: "",
	productId: 0,
	productName: "",
	serialNumber: "",
	activeTime: "",
	createTime: "",
	transport: "MQTT",
})

const loading = ref(false)

const close = (val) => {
	dialogVisuable.value = val
}
//搜索设备
const handleQuery = (queryParams) => {
	Store.searchDevice(queryParams).then((res) => {
		Store.deviceList = res.rows
		Store.total = res.total
	})
}
Store.getDeviceList(pageParams.value).then((res) => {
	Store.deviceList = res.rows
	Store.total = res.total
})
//分页器响应函数
//val代表新的值
const handleSizeChange = (val) => {
	pageParams.value = { pageNum: pageParams.value.pageNum, pageSize: val }
}
const handleCurrentChange = (val) => {
	pageParams.value = { pageNum: val, pageSize: pageParams.value.pageSize }
}
//监听分页器参数变化
watch(pageParams, (newPage, old) => {
	Store.getDeviceList(newPage).then((res) => {
		Store.deviceList = res.rows
		Store.total = res.total
	})
})
//重置按钮

const resetquery = () => {
	queryParams.value = {
		deviceName: "",
		serialNumber: "",
	}
	pageParams.value = {
		pageNum: 1,
		pageSize: 9,
	}
	Store.getDeviceList(pageParams.value).then((res) => {
		Store.deviceList = res.rows
		Store.total = res.total
	})
}
//TODO添加消息提示 
const deleteDevice = (deviceInfo) => {
	Store.deleteConnect(deviceInfo).then((res) => {
		console.log(res)
	})
}
</script>

<style scoped>
.button-group {
	margin-bottom: 20px;
}

.el-button {
	margin-right: 10px;
}
.connect-dialog-button {
	margin-right: 20px;
}
</style>
