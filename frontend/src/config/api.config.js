// Base URL for API calls
export const API_URL = 'http://localhost:3000/api';

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
    },
    LOCATIONS: {
        BASE: '/locations',
        CREATE: '/locations',
        GET_ALL: '/locations',
        GET_BY_ID: (id) => `/locations/${id}`,
        UPDATE: (id) => `/locations/${id}`,
        DELETE: (id) => `/locations/${id}`,
    },
    PROJECTS: {
        BASE: '/projects',
        CREATE: '/projects',
        GET_ALL: '/projects',
        GET_BY_ID: (id) => `/projects/${id}`,
        UPDATE: (id) => `/projects/${id}`,
        DELETE: (id) => `/projects/${id}`,
    },
    CONTACTS: {
        BASE: '/contacts',
        CREATE: '/contacts',
        GET_ALL: '/contacts',
        GET_BY_ID: (id) => `/contacts/${id}`,
        UPDATE: (id) => `/contacts/${id}`,
        DELETE: (id) => `/contacts/${id}`,
    }
};
