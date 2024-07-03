import request from '@/utils/request'
import { getNowDate } from '@/utils/time'
export default {
    updateLog(deviceMessageDict) {
        let date = getNowDate()
        let data = {
            'date': date,
            'sensor_info': deviceMessageDict
        }
        return request(
            {
                url: 'manage/update',
                methods: "post",
                data: data
            }
        )
    },
    getLog() {
        return request(
            {
                url: 'manage/list',
                methods: "get"
            }
        )
    }
}