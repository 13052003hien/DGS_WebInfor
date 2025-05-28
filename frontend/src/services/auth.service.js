import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const register = async (username, email, password, fullName) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        fullName
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password
    });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const updateProfile = async (userData) => {
    const user = getCurrentUser();
    const response = await axios.put(`${API_URL}/profile`, userData, {
        headers: { Authorization: `Bearer ${user.token}` }
    });
    return response.data;
};