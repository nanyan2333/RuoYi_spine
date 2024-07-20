<template>
  <div class="demo-collapse">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(device, index) in deviceNumber"
        :key="index"
        :name="index"
      >
        <template #title>
          <img
            src="@/assets/images/gli.png"
            alt=""
          />
          <span class="titleFont">已连接</span>
          <span class="titleFont">{{ device }}</span>
        </template>
        <div
          v-for="content in deviceContents[index]"
          :key="content"
        >
          {{ content }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
//api引入
//getDeviceHistory(获取设备信息),reload(刷新)

/*const device=ref({
    device1:{
      number:461234jadhl,
      isLink: true,
      state:[],
      history:[]
    },
    device2:{
      .....
    }
  })*/

const deviceNumber = ref(["设备1", "设备2", "设备3", "设备4"]);
const deviceContents = ref([
  [
    "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
    "Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.",
  ],
  [
    "Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;",
    "Visual feedback: reflect current state by updating or rearranging elements of the page.",
  ],
  [
    "Simplify the process: keep operating process simple and intuitive;",
    "Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;",
    "Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.",
  ],
  [
    "Decision making: giving advices about operations is acceptable, but do not make decisions for the users;",
    "Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.",
  ],
]);
</script>

<style scoped lang="scss">
.titleFont {
  font-size: small;
  font-family: Yahei;
}
</style>

