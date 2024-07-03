export function getNowDate() {
    const now = new Date()
    const year = now.getFullYear()
    const month = ("0" + (now.getMonth() + 1)).slice(-2)
    const day = ("0" + now.getDate()).slice(-2)
    const formattedTime = year + "-" + month + "-" + day
    return formattedTime

}