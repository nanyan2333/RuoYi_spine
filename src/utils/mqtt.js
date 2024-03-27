import mqtt from 'mqtt'
import { ref, onUnmounted } from 'vue';

class MQTT {
    constructor(topic) {
        this.topic = topic;
        this.url = 'ws://124.71.78.224:8083';
        this.clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
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
        this.client.on('error', (error) => {
            console.log(error);
        });
        this.client.on('reconnect', (error) => {
            console.log(error);
        });
    }

    unsubscribes() {
        this.client.unsubscribe(this.topic, (error) => {
            if (!error) {
                console.log(this.topic, '取消订阅成功');
            } else {
                console.log(this.topic, '取消订阅失败');
            }
        });
    }

    link() {
        this.client.on('connect', () => {
            this.client.subscribe(this.topic, (error) => {
                if (!error) {
                    console.log('订阅成功');
                } else {
                    console.log('订阅失败');
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

export default function useMqtt() {
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

    onUnmounted(() => {
        if (PublicMqtt.value) {
            PublicMqtt.value.unsubscribes();
            PublicMqtt.value.over();
        }
    });

    return {
        startMqtt,
    };
}
