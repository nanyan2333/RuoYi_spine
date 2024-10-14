import request from "@/utils/request"
import { defineStore } from "pinia"

const useDeviceStore = defineStore(
    'device',
    {
        // { device params
        //     device:'',
        //     host:'',
        //     port:'',
        //     username:'',
        //     password:'',
        //     disable:false,
        // }
        state: () => ({
            deviceList: [

            ],
            total: 0,
            startUseTime: "",
            endUseTime: "",
        }),
        actions: {
            //params: 
            // @deviceInfo:设备参数信息
            addDevice(deviceInfo) {
                return request({
                    url: '/device/addConnect',
                    method: 'post',
                    data: deviceInfo
                })
            },
            deleteConnect: (deviceInfo) => {
                return request({
                    url: '/device/deleteConnect',
                    method: 'post',
                    data: deviceInfo
                })
            },
            // @queryParams:请求参数
            //pageNum: 查询列表页数,
            //pageSize: 返回设备个数（一页展示多少个）,
            getDeviceList: (queryParams) => {
                return request({
                    url: '/device/getDeviceList',
                    method: 'get',
                    params: {
                        pageNum: queryParams.pageNum,
                        pageSize: queryParams.pageSize
                    }
                })
            },
            //productId: 
            //productName: 设备名称和编号，不全为空
            searchDevice: (queryParams) => {
                return request({
                    url: '/device/searchDevice',
                    method: 'get',
                    params: {
                        productId: queryParams.productId,
                        productName: queryParams.productName
                    }
                })
            }
        }
    }
)
export default useDeviceStore