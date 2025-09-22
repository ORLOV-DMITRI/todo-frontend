import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!baseURL) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in your environment variables');
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
