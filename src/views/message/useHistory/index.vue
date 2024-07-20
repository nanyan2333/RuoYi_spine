<template>
  <div>
    <el-page-header content="使用记录（患者）" />
    <el-card class="patient-selection-card">
      <h3>选择患者</h3>
      <el-select v-model="selectedPatient" placeholder="请选择患者" @change="fetchHistory" style="width: 100%;">
        <el-option
          v-for="patient in patients"
          :key="patient.id"
          :label="patient.name"
          :value="patient.id"
        />
      </el-select>
    </el-card>
    <el-card v-if="selectedPatient" class="history-card">
      <h2>患者 {{ getPatientName(selectedPatient) }} 的历史记录</h2>
      <p>使用次数: {{ history.length }}</p>
      <p>使用频率: {{ calculateUsageFrequency(history) }}</p>
      <el-table :data="history" style="width: 100%;">
        <el-table-column prop="usageTime" label="使用时间" width="180"/>
        <el-table-column prop="height" label="高度" width="100"/>
        <el-table-column prop="angle" label="倾斜角度" width="100"/>
        <el-table-column prop="pressure" label="压力" width="100"/>
        <el-table-column prop="duration" label="时长" width="100"/>
        <el-table-column prop="device.name" label="设备" width="120"/>
        <el-table-column prop="location" label="位置" width="150"/>
        <el-table-column prop="age" label="年龄" width="80"/>
        <el-table-column prop="gender" label="性别" width="80"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

export default {
  name: 'HistoryPage',
  setup() {
    const patients = ref([]);
    const selectedPatient = ref(null);
    const history = ref([]);

    onMounted(() => {
      fetchPatients();
    });

    const fetchPatients = async () => {
      // 示例患者数据
      patients.value = [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
      ];
      // API 请求来获取患者列表
      // try {
      //   const response = await axios.get('/api/patients');
      //   patients.value = response.data;
      // } catch (error) {
      //   ElMessage.error('获取患者列表失败');
      // }
    };

    const fetchHistory = async () => {
      if (!selectedPatient.value) return;
      // 示例历史记录数据
      history.value = [
        {
          id: 1,
          usageTime: '2023-07-01 10:00:00',
          height: 120,
          angle: 30,
          pressure: 15,
          duration: 30,
          device: { name: '脊柱矫正椅1号' },
          location: '北京',
          age: 25,
          gender: '男', 
        },
        {
          id: 2,
          usageTime: '2023-07-02 11:00:00',
          height: 130,
          angle: 35,
          pressure: 18,
          duration: 25,
          device: { name: '脊柱矫正椅2号' },
          location: '上海',
          age: 25,
          gender: '男',
        },
      ];
      // 用实际的 API 请求来获取历史记录
      // try {
      //   const response = await axios.get(`/api/history/patient/${selectedPatient.value}`);
      //   history.value = response.data;
      // } catch (error) {
      //   ElMessage.error('获取历史记录失败');
      // }
    };

    const getPatientName = (id) => {
      const patient = patients.value.find(p => p.id === id);
      return patient ? patient.name : '';
    };

    const calculateUsageFrequency = (history) => {
      const daysUsed = new Set(history.map(record => new Date(record.usageTime).toDateString()));
      return (history.length / daysUsed.size).toFixed(2);
    };

    return {
      patients,
      selectedPatient,
      history,
      fetchHistory,
      getPatientName,
      calculateUsageFrequency,
    };
  },
};
</script>

<style scoped>
.patient-selection-card {
  margin-bottom: 20px;
}

.history-card {
  margin-top: 20px;
}
</style>
