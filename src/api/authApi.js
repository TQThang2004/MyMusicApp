import appInfo from '../constants/appInfo';
import axiosClient from './axiosClient';

class AuthAPI {
    HandleAuthentication = async (url, data = null, method = 'get') => {
        const config = {
            url: `${appInfo.BASE_URL}/auth${url}`,
            method,
        };

        // Chỉ thêm data nếu có truyền vào và method không phải là GET
        if (data && method.toLowerCase() !== 'get') {
            config.data = data;
        }

        // Nếu method là GET và có data, gắn vào params
        if (data && method.toLowerCase() === 'get') {
            config.params = data;
        }

        return await axiosClient(config);
    };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;
