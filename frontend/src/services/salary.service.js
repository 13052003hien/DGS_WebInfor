import { apiClient } from './auth.service';
import { ENDPOINTS } from '../config/api.config';

export const getSalaries = async (filters = {}) => {
    try {
        const response = await apiClient.get(ENDPOINTS.SALARY.GET_ALL, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch salaries:', error);
        throw error;
    }
};

export const getMySalary = async (filters = {}) => {
    try {
        const response = await apiClient.get(ENDPOINTS.SALARY.GET_MY_SALARY, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch my salary:', error);
        throw error;
    }
};

export const getSalaryStats = async (filters = {}) => {
    try {
        const response = await apiClient.get(ENDPOINTS.SALARY.STATS, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch salary stats:', error);
        throw error;
    }
};