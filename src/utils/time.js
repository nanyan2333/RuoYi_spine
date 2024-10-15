export function getNowDate() {
    const now = new Date()
    const year = now.getFullYear()
    const month = ("0" + (now.getMonth() + 1)).slice(-2)
    const day = ("0" + now.getDate()).slice(-2)
    const formattedTime = year + "-" + month + "-" + day
    return formattedTime
}
export function getNowTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，因此要加1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

export function getLastMonthDates() {
    const dates = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) { // 生成 30 天的日期
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0]; // 格式化日期为 YYYY-MM-DD
        dates.push(formattedDate);
    }
    return dates.reverse(); // 使日期从早到晚排序
}
export function getRandomData(length, max = 100) {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push(Math.floor(Math.random() * max)); // 生成 0 到 max 之间的随机数
    }
    return data;
}
