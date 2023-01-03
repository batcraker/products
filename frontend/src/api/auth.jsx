import axios from 'axios'
import config from '../config'

const url = config.HOST;

export const signupAxios = async (data) => {
    return await axios({
        url:`${url}/api/auth/signup`,
        method:'post',
        data
    })
}

export const signinAxios = async (data) => {
    return await axios({
        url:`${url}/api/auth/signin`,
        method:'post',
        data
    })
}