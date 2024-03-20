<template>
	<div class="container">
		<div class="button-group">
			<el-button type="primary" @click="addDevice">AddDevice</el-button>
		</div>
		<el-table v-loading="loading" :data="tableData" v-model="tableLayout">
			<el-table-column prop="number" label="number" />
			<el-table-column prop="id" label="id" />
			<el-table-column prop="address" label="Address" />
			<el-table-column prop="disable" label="Disable">
				<template #default="scope">
					<el-switch
						v-model="scope.row.disable"
						active-color="#13ce66"
						inactive-color="#ff4949"
						active-text="启用"
						inactive-text="停用"
					/>
				</template>
			</el-table-column>
			<el-table-column label="Operation">
				<template #default="scope">
					<el-button
						type="danger"
						@click="handleDelete(scope.$index, scope.row)"
					>
						Delete
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>

	<el-dialog
		v-model="openDeleteDialogo"
		title="Warning"
		width="500"
		align-center
	>
		<span>是否删除该设备，此操作不可逆</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="cancelDelete">Cancel</el-button>
				<el-button type="primary" @click="confirmDelete">Confirm</el-button>
			</div>
		</template>
	</el-dialog>

	<el-dialog
		v-model="openAddDevForm"
		header="AddDevice"
		width="500"
		align-center
	>
		<el-form :model="form" label-width="auto" style="max-width: 600px">
			<el-form-item label="device number">
				<el-input v-model="form.number" />
			</el-form-item>
			<el-form-item label="device id">
				<el-input v-model="form.id" />
			</el-form-item>
			<el-form-item label="device address">
				<el-input v-model="form.address" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit" style="margin: 0px 30px 0px 130px;">Create</el-button>
				<el-button @click="openAddDevForm = false">Cancel</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
const loading = ref(false)
const tableLayout = ref("auto")
const activeid = ref("1")
const isDelete = ref(false)
const deleteIndex = ref(null)
const openDeleteDialogo = ref(false)
const openAddDevForm = ref(false)

const tableData = reactive([
	{
		number: "1",
		id: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		number: "2",
		id: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		number: "3",
		id: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
	{
		number: "4",
		id: "Tom",
		address: "No. 189, Grove St, Los Angeles",
	},
])
const form = reactive({
	number: "",
	id: "",
	address: "",
})

const handleDelete = (index, row) => {
	deleteIndex.value = index
	openDeleteDialogo.value = true
}

const confirmDelete = () => {
	openDeleteDialogo.value = false
	const index = deleteIndex.value
	if (index !== null && index >= 0 && index < tableData.length) {
		tableData.splice(index, 1)
	}

	deleteIndex.value = null
}

const cancelDelete = () => {
	openDeleteDialogo.value = false
	deleteIndex.value = null
}
const onSubmit = () => {
	tableData.push({
		number: form.number,
		id: form.id,
		address: form.address,
	})
	form.number = ""
	form.id = ""
	form.address = ""
	openAddDevForm.value = false
}
const addDevice = () => {
	openAddDevForm.value = true
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.button-group {
	margin-bottom: 20px;
}

.el-button {
	margin-right: 10px;
}
</style>
