<template></template>
<script setup>
import warnSetting from "../../../warnSetting"
import { toRefs } from "vue"
import {ElNotification} from 'element-plus'
const props = defineProps({
	showData: {
		type: Object,
		required: true,
	},
})

watch(
	() => props.showData,
	(newVal) => {
		for (const key in newVal) {
			if (key === "deviceId" || !warnSetting[key]) continue
			if (newVal[key] > warnSetting[key]) { 
				ElNotification({
					title: "监测警告",
					message: `${key}过大`,
					type: "error",
                    duration: 30000
				})
			}
		}
	}
)
</script>
