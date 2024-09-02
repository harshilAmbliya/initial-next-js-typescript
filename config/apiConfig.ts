import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_URLS } from './environment';

// Define the base URL for your API


// Create an Axios instance
const apiConfig: AxiosInstance = axios.create({
    baseURL: APP_URLS.SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
apiConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token'); // Or retrieve token from a different source
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle responses globally
apiConfig.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error) => {
        // You can handle errors globally here
        return Promise.reject(error);
    }
);

export default apiConfig;
