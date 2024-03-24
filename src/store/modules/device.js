import request from "@/utils/request"
import { defineStore } from "pinia"

const useDeviceStore = defineStore(
    'device',
    {
        // { device params
        //     connectName:'',
        //     host:'',
        //     port:'',
        //     username:'',
        //     password:'',
        //     disable:false,
        // }
        state:() => ({
            deviceList:[],
            deviveNum:0
        }),
        actions:{
            connectDevice(connectInfo){
                return request({
                    url:'/device/connect',
                    method:'post',
                    data:connectInfo
                })
            },
            deleteConnect:(connectName) => {
                return request({
                    url:'/device/deleteConnect',
                    method:'post',
                    data:connectName
                })
            },
            getDeviceList:() =>{
                return request({
                    url:'/device/getDeviceList',
                    method:'get'
                })
            }
        }
    }
)
export default useDeviceStore