export default {
    fpsLimit: 60,
    interactivity: {
        detectsOn: "canvas",
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "grab",
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 300,
                duration: 2,
                opacity: 0.8,
                size: 6,
            },
            push: {
                quantity: 4,
            },
            grab: {
                distance: 140,
                duration: 0.4,
            },
            attract: {
                distance: 200,
                duration: 0.4,
                factor: 5,
            },
        },
    },
    particles: {
        color: {
            value: ["#8A2BE2", "#4169E1", "#20B2AA", "#00CED1", "#4682B4"], // 更加优雅沉稳的颜色
        },
        links: {
            color: "#1E90FF", // 线条颜色，更加优雅
            distance: 120, // 线条距离
            enable: true,
            opacity: 0.5, // 不透明度
            width: 1.5, // 线条宽度
        },
        collisions: {
            enable: true,
        },
        move: {
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
            bounce: false,
            direction: "none",
            enable: true,
            out_mode: "out",
            random: false,
            speed: 0.8, // 移动速度，略快一些
            straight: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 800,
            },
            value: 120, // 粒子数量，略少一些以减少视觉噪音
        },
        opacity: {
            value: 0.7, // 粒子透明度
        },
        shape: {
            type: ["circle"], // 粒子形状，使用单一的圆形以保持简洁
        },
        size: {
            random: true,
            value: 3, // 粒子大小，略小一些
        },
    },
    detectRetina: true
}
