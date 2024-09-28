import request from '@/utils/request'

// 用户密码重置
export function resetUserPwd(userId, password) {
    const data = {
        userId,
        password
    }
    return request({
        url: '/resetPassword',
        method: 'put',
        data: data
    })
}


// 查询用户个人信息
// 个人信息 {
//     userId: '',
//     phoneNumber: '',
//     sex: '',
//     age:'',
//     location:'',
// }
export function getUserProfile() {
    return request({
        url: '/getUserProfile',
        method: 'get'
    })
}

// 修改用户个人信息
export function updateUserProfile(data) {
    return request({
        url: '/updateUserProfile',
        method: 'post',
        data: data
    })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return request({
        url: '/updateUserPwd',
        method: 'post',
        params: data
    })
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/uploadAvatar',
        method: 'post',
        data: data
    })
}
