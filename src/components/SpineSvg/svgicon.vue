<template>
	<div>
		<img :src="computeIconPath" :alt="iconAlt" :style="iconStyleObject" />
	</div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, toRefs } from "vue"

const iconPath = ref("/src/assets")
const props = defineProps({
	iconName: {
		type: String,
	},
	iconStyle: {
		type: Object as () => CSSProperties,
		default: () => ({}),
	},
	iconAlt: {
		type: String,
		default: "",
	},
	iconFromat: {
		type: String,
		default: ".svg",
	},
	iconWidth: {
		type: String,
		default: '40',
	},
})
const { iconName, iconStyle, iconAlt, iconFromat, iconWidth } = toRefs(props)
const computeIconPath = computed(() => {
	let path = iconPath.value
	if (iconFromat.value == ".svg") {
		path += "/icons/svg/"
	} else if (iconFromat.value == ".png") {
		path += "/images/"
	}
	return `${path}${iconName?.value}${iconFromat.value}`
})

// 动态样式对象
const iconStyleObject = computed(() => ({
	width: `${iconWidth.value}px`,
	height: "auto",
	...iconStyle.value,
}))
</script>
