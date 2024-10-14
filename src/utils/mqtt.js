import mqtt from 'mqtt'
import { ref, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';

class MQTT {
    constructor(topic) {
        this.topic = topic;
        this.url = 'ws://124.71.78.224:8083/mqtt';
        // this.url = 'ws://'+import.meta.env.env.VITE_APP_BASE_API+':8083/mqtt'
    }

    init() {
        const options = {
            clean: true,
            username: "spine",
            password: "Spine2976",
            connectTimeout: 4000,
            reconnectPeriod: 4000,
        };
        this.client = mqtt.connect(this.url, options);

        this.client.on('connect', () => {
            ElMessage.success("MQTT 客户端已连接")
        });
        this.client.on('error', (error) => {
            ElMessage.error(error)
        });
        this.client.on('reconnect', (error) => {
            ElMessage.error(error)
        });
    }

    unsubscribes() {
        this.client.unsubscribe(this.topic, (error) => {
            if (!error) {
                ElMessage.success('取消订阅成功');
            } else {
                ElMessage.success('取消订阅失败');
            }
        });
    }

    link() {
        this.client.on('connect', () => {
            this.client.subscribe(this.topic, (error) => {
                if (!error) {
                    ElMessage.success(`${this.topic}订阅成功`)
                } else {
                    ElMessage.error('订阅失败');
                }
            });
        });
    }

    get(callback) {
        this.client.on('message', callback);
    }

    over() {
        this.client.end();
    }
}
export default {
    useMqtt() {
        const PublicMqtt = ref(null);

        const startMqtt = (val, callback) => {
            PublicMqtt.value = new MQTT(val);
            PublicMqtt.value.init();
            PublicMqtt.value.link();
            getMessage(callback);
        };

        const getMessage = (callback) => {
            PublicMqtt.value?.get(callback);
        };
        const closeMqtt = (callback) => {
            PublicMqtt.value?.unsubscribes();
            PublicMqtt.value?.over();
            if (callback) {
                callback();
            }
        }
        onUnmounted(() => {
            if (PublicMqtt.value) {
                PublicMqtt.value.unsubscribes();
                PublicMqtt.value.over();
            }
        });



        return {
            startMqtt, closeMqtt
        }
    },
    // unit8ArrayToString(array) {
    //     let str = '';
    //     for (let i = 0; i < array.length; i++) {
    //         str += String.fromCharCode(array[i]);
    //     }
    //     return str;
    // },
    unit8ArrayToString(array) {
        // 创建一个新的 TextDecoder 实例，指定编码为 UTF-8
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(array);
    },
    unit8ArrayToJson(array) {
        return JSON.parse(this.unit8ArrayToString(array))
    },
    transformTopic(productId, service, deviceId = "+") {
        return `${productId}/${service}/${deviceId}`
    }
}
