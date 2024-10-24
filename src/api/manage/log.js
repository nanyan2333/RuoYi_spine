import request from '@/utils/request'
import { getNowTime } from '@/utils/time'

// 添加使用记录，参数设备id，起止时间（xxxx-xx-xx xx:xx:xx)
export function addUseRecord(startTime, endTime, deviceId) {
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
}
// 上传传感器产生的数据
/* deviceMessageDict
    {
        #{device_id}:{
            "device_id":xxxxx,
            "distance": xxx,
            ......
        }
    }
*/
export function updateRecord(id, deviceMessageArray) {
    /*
        deviceMessageArray:[
            ......
            {
                'time':xxxx-xx-xx xx:xx:xx, 
                'sensorInfo':{ 
                    "device_id":xxxxx,
                    "distance": xxx, 
                    ......
                }
            }
        ]
    */
    let data = {
        'id': id,
        'deviceMessageArray': deviceMessageArray
    }
    return request(
        {
            url: 'manage/updateRecord',
            methods: "post",
            data: data
        }
    )
}
// 获取上传的数据
export function getRecord(_deviceId) {
    return request(
        {
            url: 'manage/getRecord',
            methods: "get",
            params: {
                device_id: _deviceId
            }
        }
    )
    
}
// 获取上传的使用记录
export function getUseRecord() {
    return request(
        {
            url: 'manage/getUseRecord',
            methods: "get"
        }
    )
}
// 上传医生开的病例
export function postUserCase(caseData) {
    return request(
        {
            url: 'user/addCase',
            methods: "post",
            data: caseData
        }
    )
}
// 获取用户的病例
export function getUserCase() {
    return request(
        {
            url: 'user/getCase',
            methods: "get"
        }
    )
}
