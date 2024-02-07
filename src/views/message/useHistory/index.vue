<template>
  <div>
    <el-card
      v-for="(content, index) in useMessage"
      shadow="hover"
    >
      {{ content.name }}
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
//api
//getUseMessage
//reload
const useMessage = ref([
  { name: "dev1", number: 777 /*....... */ },
  { name: "dev2", number: 666 },
]);
</script>

<style scoped></style>
