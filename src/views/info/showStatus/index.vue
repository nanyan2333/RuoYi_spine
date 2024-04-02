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
					<el-button type="primary" size="mini" @click="handleQuery"
						><el-icon><Search /></el-icon> 搜索</el-button
					>
					<el-button size="mini" @click="resetQuery"
						><el-icon><refresh /></el-icon>重置</el-button
					>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button
						type="primary"
						plain
						size="mini"
						@click="handleEditDevice(0)"
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
					v-for="(item, index) in deviceList"
					:key="index"
					style="margin-bottom: 30px; text-align: center">
					<el-card
						:body-style="{ padding: '20px' }"
						shadow="always"
						class="card-item">
						<el-row :gutter="10" justify="space-between">
							<el-col :span="20" style="text-align: left">
								<!-- <svg-icon icon-class="device" v-if="item.isOwner == 1" /> -->
								<span style="margin: 0 5px">{{ item.deviceName }}</span>
								<!-- <el-tag size="mini" type="info">Ver {{item.firmwareVersion}}</el-tag>-->
								<!-- <el-text v-if="item.protocolCode" type="info" size="mini" style="font-size: 14px; color: #ccc">{{ item.protocolCode }}</el-text> -->
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
										<!-- <el-tag type="success" size="small" v-if="item.isShadow == 1">影子</el-tag>
                    <el-tag type="info" size="small" v-else>影子</el-tag> -->
										<el-tag
											type="primary"
											size="small"
											v-if="item.protocolCode"
											>{{ item.protocolCode }}</el-tag
										>
									</span>
									<el-tag type="primary" size="small" v-if="item.transport">{{
										item.transport
									}}</el-tag>
									<!-- <dict-tag :options="dict.type.iot_location_way" :value="item.locationWay" size="small" style="display:inline-block;" /> -->
									<!-- <dict-tag :options="dict.type.iot_transport_type" :value="item.transport" size="small" style="display: inline-block" /> -->
								</div>
								<el-descriptions
									:column="1"
									size="mini"
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
							<el-button type="danger" size="mini" style="padding: 5px 10px"
								>删除</el-button
							>
							<el-button type="primary" size="mini" style="padding: 5px 15px"
								>查看</el-button
							>
							<el-button type="success" size="mini" style="padding: 5px 15px"
								>运行状态</el-button
							>
						</el-button-group>
					</el-card>
				</el-col>
			</el-row>
			<el-empty description="暂无数据，请添加设备" v-if="total == 0"></el-empty>
		</el-card>
		<div style="padding: 20px;">
			<pagination
			v-show="total > 0"
			:total="total"
			v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize"
			@pagination="getList" />
		</div>
	</div>
</template>

<script setup>
//test
import { reactive, ref } from "vue"
import useDeviceStore from "@/store/modules/device.js"

const Store = useDeviceStore()
const queryParams = reactive({
	deviceName: "",
	serialNumber: "",
	pageNum: 1,
	pageSize: 10,
})
const total = ref(3)
const deviceList = ref([
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
	{
		deviceId: 118,
		deviceName: "666",
		productId: 66,
		productName: "999",
		serialNumber: "D4AD203F3A1C",
		activeTime: "2023-03-23",
		createTime: "2025-02-28",
		transport: "MQTT",
	},
])
const loading = ref(false)

const getList = () => {
	return deviceList.value
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
