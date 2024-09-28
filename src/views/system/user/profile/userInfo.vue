<template>
	<el-form ref="userRef" :model="form" :rules="rules" label-width="80px">
		<el-form-item label="手机号码" prop="phonenumber">
			<el-input v-model="form.phonenumber" maxlength="11" />
		</el-form-item>
		<el-form-item label="性别">
			<el-radio-group v-model="form.sex">
				<el-radio label="男">男</el-radio>
				<el-radio label="女">女</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="年龄" prop="age">
			<el-input v-model="form.age"></el-input>
		</el-form-item>
		<el-form-item label="属地" prop="location">
			<el-input v-model="form.location"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submit">保存</el-button>
			<el-button type="danger" @click="close">关闭</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { updateUserProfile } from "@/api/userCenter/user"

const props = defineProps({
	user: {
		type: Object,
	},
})

const { proxy } = getCurrentInstance()

const form = ref({
	phonenumber: "",
    sex: props.user.sex,
    age: props.user.age,
    location: props.user.location,
})
const rules = ref({
	phonenumber: [
		{ required: true, message: "手机号码不能为空", trigger: "blur" },
		{
			pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
			message: "请输入正确的手机号码",
			trigger: "blur",
		},
	],
	age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
	sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
	location: [{ required: true, message: "请填写属地", trigger: "blur" }],
})

/** 提交按钮 */
function submit() {
	proxy.$refs.userRef.validate((valid) => {
		if (valid) {
			updateUserProfile(form.value).then((response) => {
				proxy.$modal.msgSuccess("修改成功")
				props.user.phonenumber = form.value.phonenumber
				props.user.sex = form.value.sex
				props.user.location = form.value.location
				props.user.age = form.value.age
			})
		}
	})
}

/** 关闭按钮 */
function close() {
	proxy.$tab.closePage()
}

// 回显当前登录用户信息
watch(
	() => props.user,
	(user) => {
		if (user) {
			form.value = {
				phonenumber: user.phonenumber,
				sex: user.sex,
				location: user.location,
				age: user.age,
			}
		}
	},
	{ immediate: true }
)
</script>
