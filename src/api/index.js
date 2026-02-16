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


// Login API call
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('https://r2fjv162gj.execute-api.ap-south-1.amazonaws.com/prod/vendor_login', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;

// Product APIs

// Get all products
export const getProducts = async () => {
    try {
        const response = await axios.get('https://r2fjv162gj.execute-api.ap-south-1.amazonaws.com/prod/billing_section_get_product?query=all');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await axios.post('https://r2fjv162gj.execute-api.ap-south-1.amazonaws.com/prod/billing_section_create_product', productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update an existing product
export const updateProduct = async (productData) => {
    try {
        const response = await axios.put('https://r2fjv162gj.execute-api.ap-south-1.amazonaws.com/prod/billing_section_edit_product', productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (productId) => {
    try {
        // Using common pattern for delete with body, or just query usage if backend supports it.
        // User schema implies body: { "productId": "..." }
        const response = await axios.request({
            method: 'DELETE',
            url: 'https://r2fjv162gj.execute-api.ap-south-1.amazonaws.com/prod/billing_section_delete_product',
            data: { productId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
