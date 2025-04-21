import axios from "axios";
import queryString from "query-string";
import AsyncStorage from '@react-native-async-storage/async-storage';


const axiosClient = axios.create({
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        ...config.headers,
    };
    return config;
});

axiosClient.interceptors.response.use(
    res => {
        if (res.data && res.status === 200) {
            return res;
        }
        throw new Error('Error response from server');
    },
    error => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Unknown Axios error";
        return Promise.reject(message);
    }
);

export default axiosClient;
