import axios from "axios";
import Cookies from 'js-cookie';

const axiosClient=axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    }
);

const UserRegister = (data)=>axiosClient.post('/register', data)
const UserLogin = (data)=>axiosClient.post('/token', data)
const GetUser = ()=>axiosClient.get('/user')
const FetchUsers = ()=>axiosClient.get('/fetch')

export default{
    UserRegister,
    UserLogin,
    GetUser,
    FetchUsers
}