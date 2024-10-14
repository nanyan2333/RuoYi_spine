import request from '@/utils/request'
import { getNowTime } from '@/utils/time'
export default {
    // 添加使用记录，参数设备id，起止时间（xxxx-xx-xx xx:xx:xx)
    addUseRecord(startTime,endTime,deviceId){
        let data = {
            'device_id': deviceId,
            'start_time': startTime,
            'end_time': endTime
        }
        return request(
            {
                url: 'manage/addUseRecord',
                methods: "post",
                data: data
            }
        )
    },
    // 上传传感器产生的数据
    /* deviceMessageDict
        {
            "222":{
                "device_id":xxxxx,
                "distance": xxx,
                ......
            }
        }
    */
    updateRecord(deviceMessageDict) {
        let time = getNowTime()
        let data = {
            'time': time,
            'sensor_info': deviceMessageDict
        }
        return request(
            {
                url: 'manage/updateRecord',
                methods: "post",
                data: data
            }
        )
    },
    // 获取上传的数据
    getRecord() {
        return request(
            {
                url: 'manage/getRecord',
                methods: "get"
            }
        )
    },
    // 上传医生开的病例
    postUserCase(caseData){
        return request(
            {
                url: 'user/addCase',
                methods: "post",
                data: caseData
            }
        )
    },
    // 获取用户的病例
    getUserCase(){
        return request(
            {
                url: 'user/getCase',
                methods: "get"
            }
        )
    }
}