import axios from 'axios';

// Base URL for API calls
export const API_URL = 'http://localhost:3000/api';

// Create axios instance
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        REFRESH_TOKEN: '/users/refresh-token',
    },
    USERS: {
        BASE: '/users',
        CREATE: '/users/create-admin',
        CREATE_USER: '/users/create',
        GET_ALL: '/users',
        GET_BY_ID: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
        UPLOAD_AVATAR: '/users/avatar'
    },
    PROJECTS: {
        BASE: '/projects',
        GET_ALL: '/projects',
        GET_BY_ID: (id) => `/projects/${id}`,
        CREATE: '/projects',
        UPDATE: (id) => `/projects/${id}`,
        DELETE: (id) => `/projects/${id}`,
    },
    LOCATIONS: {
        BASE: '/locations',
        GET_ALL: '/locations',
        GET_BY_ID: (id) => `/locations/${id}`,
        CREATE: '/locations',
        UPDATE: (id) => `/locations/${id}`,
        DELETE: (id) => `/locations/${id}`,
    },
    CONTACTS: {
        BASE: '/contacts',
        GET_ALL: '/contacts',
        GET_BY_ID: (id) => `/contacts/${id}`,
        CREATE: '/contacts',
        UPDATE: (id) => `/contacts/${id}`,
        DELETE: (id) => `/contacts/${id}`,
    },
    SALARY: {
        BASE: '/salary',
        GET_ALL: '/salary/all',
        GET_MY_SALARY: '/salary/my-salary',
        UPLOAD: '/salary/upload',
        STATS: '/salary/stats'
    }
};
