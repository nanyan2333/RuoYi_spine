<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="6" :xs="24">
            <el-card class="box-card">
               <template v-slot:header>
                 <div class="clearfix">
                   <span>个人信息</span>
                 </div>
               </template>
               <div>
                  <div class="text-center">
                     <userAvatar />
                  </div>
                  <ul class="list-group list-group-striped">
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />用户ID
                        <div class="pull-right">{{ state.user.userId }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="phone" />手机号码
                        <div class="pull-right">{{ state.user.phoneNumber }}</div>
                     </li>
                     <li class="list-group-item">
                        性别
                        <div class="pull-right"> {{ state.user.sex }}</div>
                     </li>
                     <li class="list-group-item">
                        年龄
                        <div class="pull-right"> {{ state.user.age }}</div>
                     </li>
                     <li class="list-group-item">
                        属地
                        <div class="pull-right"> {{ state.user.location }}</div>
                     </li>
                    
                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="18" :xs="24">
            <el-card>
               <template v-slot:header>
                 <div class="clearfix">
                   <span>基本资料</span>
                 </div>
               </template>
               <el-tabs v-model="activeTab">
                  <el-tab-pane label="基本资料" name="userinfo">
                     <userInfo :user="state.user" />
                  </el-tab-pane>
                  <el-tab-pane label="修改密码" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/userCenter/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
});

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
  });
};

getUser();
</script>
