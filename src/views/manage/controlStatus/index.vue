<template>
	<div class="input-form">
		<el-button @click="openAddSubscribeForm = true">新增订阅</el-button>
		<el-dialog title="新增订阅" v-model="openAddSubscribeForm">
			<el-form
				:model="addSubscribeForm"
				label-width="100px"
			>
				<el-form-item label="订阅名称" prop="name">
					<el-input v-model="addSubscribeForm.topic"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div><el-button @click="subscribe(addSubscribeForm)"> 订阅 </el-button></div>
			</template>
		</el-dialog>
		<div>{{ data }}</div>
	</div>
</template>

<script setup name="Index">
import mqtt from "@/utils/mqtt"
import { reactive, ref } from "vue"
const openAddSubscribeForm = ref(false)
const { startMqtt } = mqtt.useMqtt()
const data = ref("null")
const addSubscribeForm = ref({
	topic: "",
	disabled: true,
})
const data2 = ref("null")
console.log(addSubscribeForm)
const subscribe = (addSubscribeForm) => {
	console.log(addSubscribeForm)
	if(addSubscribeForm.disabled){
		startMqtt(addSubscribeForm.topic,(topic,payload,packet) => {
			data.value = mqtt.unit8ArrayToString(payload)
		})
	}
	openAddSubscribeForm.value = false
}
// startMqtt("test", (topic, payload, packet) => {
// 	data.value = mqtt.unit8ArrayToString(payload)
// 	console.log(JSON.parse(data.value))
// 	console.log(packet)
// })
// startMqtt("try", (topic, message) => {
// 	console.log(topic)
// 	console.log(message)
// })
</script>

<style scoped lang="scss">
.home {
	blockquote {
		padding: 10px 20px;
		margin: 0 0 20px;
		font-size: 17.5px;
		border-left: 5px solid #eee;
	}
	hr {
		margin-top: 20px;
		margin-bottom: 20px;
		border: 0;
		border-top: 1px solid #eee;
	}
	.col-item {
		margin-bottom: 20px;
	}

	ul {
		padding: 0;
		margin: 0;
	}

	font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 13px;
	color: #676a6c;
	overflow-x: hidden;

	ul {
		list-style-type: none;
	}

	h4 {
		margin-top: 0px;
	}

	h2 {
		margin-top: 10px;
		font-size: 26px;
		font-weight: 100;
	}

	p {
		margin-top: 10px;

		b {
			font-weight: 700;
		}
	}

	.update-log {
		ol {
			display: block;
			list-style-type: decimal;
			margin-block-start: 1em;
			margin-block-end: 1em;
			margin-inline-start: 0;
			margin-inline-end: 0;
			padding-inline-start: 40px;
		}
	}
}
</style>
