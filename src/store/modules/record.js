import { defineStore } from 'pinia';
import { updateLog,postUserRecord } from '@/api/manage/log'

const useRecordStore = defineStore('record',{
    state: () => ({
        startTime:'',
        endTime:'',
        deviceId:''
    }),
    actions: {
        updateUseRecord: (userName) => {
            let recordData = {
                'user_name': userName,
                'device_id': recordStore.deviceId,
                'start_time': recordStore.startTime,
                'end_time': recordStore.endTime
            }
            return postUserRecord(recordData)
        }
    }
})
export default useRecordStore