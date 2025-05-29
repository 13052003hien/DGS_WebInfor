// Base URL for API calls
export const API_URL = 'http://localhost:3000/api';

// API endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
    },
    USERS: {
        BASE: '/users',
        CREATE: '/users/create-admin', 
        CREATE_USER: '/users/create', 
        GET_ALL: '/users',
        GET_BY_ID: (id) => `/users/${id}`,
        UPDATE: (id) => `/users/${id}`,
        DELETE: (id) => `/users/${id}`,
    }
};
