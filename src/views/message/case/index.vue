<template>
	<div>
		<el-date-picker
			v-model="startDate"
			:disabled-date="disabledTime"
			type="date"
			placeholder="选择筛选开始时间"></el-date-picker>
		<el-date-picker
			v-model="endDate"
			:disabled-date="disabledTime"
			type="date"
			placeholder="选择筛选开始时间"></el-date-picker>
	</div>
</template>

<script setup>
import { getUserCase } from "@/api/manage/log.js"
import { onMounted } from "vue"

const caseData = ref([])
const startDate = ref("")
const endDate = ref("")

const disabledTime = (Time) => {
	return Time.getTime() > Date.now()
}

onMounted(() => {
	getUserCase()
		.then((res) => {
			caseData.value = res.data.raws
		})
		.catch((err) => {})
})
</script>
