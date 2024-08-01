<template>
  <div class="register">
    <!-- 粒子效果 -->
    <!-- <Particles
      id="tsparticles"
      class="login__particles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    /> -->
    <el-form
      ref="registerRef"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
    >
      <h3 class="title">注册</h3>
      <el-form-item prop="username">
        <el-input
          v-model="registerForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="用户名"
        >
          <template #prefix
            ><svg-icon icon-class="user" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="registerForm.phone"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="手机号"
        >
          <template #prefix
            ><svg-icon icon-class="phone" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="age">
        <el-input
          v-model.number="registerForm.age"
          type="number"
          size="large"
          auto-complete="off"
          placeholder="年龄"
        >
          <template #prefix
            ><svg-icon icon-class="age" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="gender">
        <el-select
          v-model="registerForm.gender"
          size="large"
          placeholder="性别"
          style="width: 100%"
        >
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="location">
        <el-input
          v-model="registerForm.location"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="属地"
        >
          <template #prefix
            ><svg-icon icon-class="location" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleRegister"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter="handleRegister"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          size="large"
          v-model="registerForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleRegister"
        >
          <template #prefix
            ><svg-icon icon-class="validCode" class="el-input__icon input-icon"
          /></template>
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img" />
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <div style="float: right">
          <router-link class="link-type" :to="'/login'"
            >使用已有账户登录</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-register-footer">
      <span>Copyright © 脊柱矫正平台</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import { getCodeImg, register } from "@/api/login";
import options from '../components/Particles/Particles.js';
import { loadSlim } from "tsparticles-slim";

const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref({
  username: "",
  phone: "",
  age: "",
  gender: "",
  location: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: "",
});
const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particlesLoaded = async (container) => {
  console.log("loaded", container);
};

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    { required: true, trigger: "blur", message: "请输入您的用户名" },
    {
      min: 2,
      max: 20,
      message: "用户账号长度必须介于 2 和 20 之间",
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, trigger: "blur", message: "请输入您的手机号" },
    {
      pattern: /^[0-9]{11}$/,
      message: "请输入有效的手机号",
      trigger: "blur",
    },
  ],
  age: [
    { required: true, trigger: "blur", message: "请输入您的年龄" },
    {
      type: "number",
      min: 1,
      max: 120,
      message: "年龄必须在 1 到 120 之间",
      trigger: "blur",
    },
  ],
  gender: [
    { required: true, trigger: "change", message: "请选择您的性别" },
  ],
  location: [
    { required: true, trigger: "blur", message: "请输入您的属地" },
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" },
    {
      min: 5,
      max: 20,
      message: "用户密码长度必须介于 5 和 20 之间",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, trigger: "blur", message: "请再次输入您的密码" },
    { required: true, validator: equalToPassword, trigger: "blur" },
  ],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }],
};

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);

function handleRegister() {
  proxy.$refs.registerRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      register(registerForm.value)
        .then((res) => {
          const username = registerForm.value.username;
          ElMessageBox.alert(
            "<font color='red'>恭喜你，您的账号 " +
              username +
              " 注册成功！</font>",
            "系统提示",
            {
              dangerouslyUseHTMLString: true,
              type: "success",
            }
          )
            .then(() => {
              router.push("/login");
            })
            .catch(() => {});
        })
        .catch(() => {
          loading.value = false;
          if (captchaEnabled) {
            getCode();
          }
        });
    }
  });
}

function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      registerForm.value.uuid = res.uuid;
    }
  });
}

getCode();
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login1.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #fff;
  font-family: 'YouYuan';
}

.register-form {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: rgba($color: #000, $alpha: 0.4);
  width: 400px;
  padding: 25px 25px 5px 25px;
  opacity: 0.9;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 40px;
  padding-left: 12px;
}
.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}
</style>
