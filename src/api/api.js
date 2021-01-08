import Axios from "axios";

const instance = Axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9209cc73-1dd6-4bef-bbf6-e01b3e14b107'
    }
})

export const usersAPI = {
    getUsers (currentPage=1,pageSize=10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(respons=>respons.data);
    },
}

export const followAPI = {
    unFollow (id) {
        return instance.delete(`follow/${id}`)
        .then(respons=>respons.data)
    },
    follow (id) {
        return instance.post(`follow/${id}`)
        .then(respons=>respons.data)
    },
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus (userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status) {
        return instance.put(`profile/status`,{status})
    },
    updateProfile (formData) {
        return instance.put(`profile`, formData)
    },
    sendPhoto (file) {
        let data = new FormData();
        data.append('file', file );
        return instance.put(`profile/photo`, data, {headers: {
            'Content-Type': 'multipart/form-data',
        }})
    },
}

export const authAPI = {
    getMe () {
        return instance.get(`auth/me`)
        .then(respons=>respons.data)
    },
    login (email, password, rememberMe, captcha=null) {
        return instance.post(`auth/login`, {
          email,
          password,
          rememberMe,
          captcha,
        });
    },
    logout () {
        return instance.post(`auth/logout`)
    }
}
export const securityAPI = {
    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
    },
}
