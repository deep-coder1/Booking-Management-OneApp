import axios from 'axios';

// Create Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Example URL, change as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for sending token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // or from context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// Interceptor for responses (e.g. 401 logout)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized (e.g., clear token, redirect to login)
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
