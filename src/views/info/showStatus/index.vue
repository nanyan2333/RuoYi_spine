<template>
	<div>
		<el-card style="margin-bottom: 6px">
			<el-form
				:model="queryParams"
				:inline="true"
				label-width="75px"
				style="margin-bottom: -20px">
				<el-form-item label="产品名称">
					<el-input
						v-model="queryParams.productName"
						placeholder="请输入设备名称"
						clearable
						style="width: 150px" />
				</el-form-item>
				<el-form-item label="产品编号">
					<el-input
						v-model="queryParams.productId"
						placeholder="请输入设备编号"
						clearable
						style="width: 150px" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery"
						><el-icon><Search /></el-icon> 搜索</el-button
					>
					<el-button @click="resetquery"
						><el-icon><refresh /></el-icon> 重置</el-button
					>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button type="primary" plain @click="dialogVisuable = true"
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
										<el-tag v-if="item.protocolCode">{{
											item.protocolCode
										}}</el-tag>
									</span>
									<el-tag v-if="item.transport">{{ item.transport }}</el-tag>
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
									<!-- <spine-svg
										icon-name="product"
										icon-fromat=".png"
										icon-width="120"></spine-svg> -->
									<img
										src="@/assets/images/product.png"
										alt=""
										style="width: 120px; height: auto" />
								</div>
							</el-col>
						</el-row>
						<el-button-group style="margin-top: 15px">
							<el-button
								type="danger"
								style="padding: 5px 10px"
								@click="deleteDevice(item)"
								>删除</el-button
							>
							<el-button
								type="primary"
								style="padding: 5px 15px"
								@click="openViewDevInfo(item)"
								>查看</el-button
							>
							<el-button
								type="success"
								style="padding: 5px 15px"
								@click="openDrawer(item)"
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
			@control-dialog-show="closeDialog(val)"></addDeviceDialog>
		<sliderDrawer
			:drawer-visuable="drawerVisuable"
			:device-info="selectedDeviceInfo"
			@control-drawer-show="
				(val) => {
					drawerVisuable = val
				}
			"></sliderDrawer>
		<viewDevInfo
			:info-dialog-visuable="infoDialogVisuable"
			:device-info="selectedDeviceInfo"
			@control-dev-info-is-show="
				(val) => {
					infoDialogVisuable = val
				}
			"></viewDevInfo>
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
import sliderDrawer from "./sliderDrawer.vue"
import SpineSvg from "@/components/SpineSvg/svgicon.vue"
import viewDevInfo from "./viewDevInfo.vue"
import { ElMessage } from "element-plus"
const descriptionSize = ref("small")
const Store = useDeviceStore()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const dialogVisuable = ref(false)
const drawerVisuable = ref(false)
const infoDialogVisuable = ref(false)
const selectedDeviceInfo = ref()
const queryParams = ref({
	productName: "",
	productId: "",
})
const pageParams = ref({
	pageNum: 1,
	pageSize: 9,
})
const chairInfo = ref({
	deviceId: "", //开发板的ID编号
	deviceName: "", //开发板的设备名
	productId: "", //*产品（椅子）的编号
	productName: "", //*产品名
	serialNumber: "", //*产品序列号
	activeTime: "", //*产品激活时间
	createTime: "", //*创建时间
	transport: "MQTT", //*传输协议
	//带*号的都是必填项，开发板的不为空就说明是开发板
})

const loading = ref(false)

const loadList = () => {
	Store.getDeviceList(pageParams.value).then((res) => {
		Store.deviceList = res.rows
		Store.total = res.total
	})
}
//搜索设备
const handleQuery = () => {
	console.log(queryParams.value)
	Store.searchDevice(queryParams.value).then((res) => {
		Store.deviceList = res.rows
		Store.total = res.total
	})
}
//打开侧边抽屉
const openDrawer = (item) => {
	drawerVisuable.value = true
	selectedDeviceInfo.value = item
}
const openViewDevInfo = (item) => {
	infoDialogVisuable.value = true
	selectedDeviceInfo.value = item
}
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
	loadList().then(() => {
		ElMessage({
			message: "重置成功",
			type: "success",
		})
	})
}
//删除列表设备
const deleteDevice = (deviceInfo) => {
	Store.deleteConnect(deviceInfo).then((res) => {
		ElMessage({
			message: "删除成功",
			type: "success",
		})
		loadList()
	})
}
// 关闭新增设备对话框后
const closeDialog = (val) => {
	dialogVisuable.value = val
	loadList()
}
// 关闭侧边抽屉
const closeDrawer = () => {
	drawerVisuable.value = false
}
loadList()
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
