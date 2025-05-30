import axios from 'axios';
import { API_URL, ENDPOINTS } from '../config/api.config';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If the error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Try to refresh the token
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.token) {
                    const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN);
                    if (response.data.token) {
                        // Update the token in localStorage
                        localStorage.setItem('user', JSON.stringify({
                            ...user,
                            token: response.data.token
                        }));
                        
                        // Update the Authorization header
                        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                        originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
                        
                        // Retry the original request
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                // If refresh token fails, logout user
                logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const register = async (username, email, password, fullName) => {
    try {
        const response = await api.post(ENDPOINTS.AUTH.REGISTER, {
            username,
            email,
            password,
            fullName
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
            username,
            password
        });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
};

export const updateProfile = async (userData) => {
    try {
        const response = await api.put(ENDPOINTS.AUTH.PROFILE, userData);
        const currentUser = getCurrentUser();
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const isAuthenticated = () => {
    const user = getCurrentUser();
    return user && user.token ? true : false;
};

export const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.role === 'admin';
};

// Export the axios instance for other services to use
export const apiClient = api;