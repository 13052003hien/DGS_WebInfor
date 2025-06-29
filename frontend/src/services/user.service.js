import { apiClient } from './auth.service';
import { ENDPOINTS } from '../config/api.config';

// Add request/response logging
apiClient.interceptors.request.use(request => {
  console.log('Starting Request:', {
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString()
  });
  return request;
});

apiClient.interceptors.response.use(
  response => {
    console.log('Response:', {
      url: response.config.url,
      status: response.status,
      timestamp: new Date().toISOString()
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      timestamp: new Date().toISOString()
    });
    return Promise.reject(error);
  }
);

const getUsers = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.USERS.GET_ALL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  const response = await apiClient.get(ENDPOINTS.USERS.GET_BY_ID(id));
  return response.data;
};

const createUser = async (userData) => {
  const response = await apiClient.post(ENDPOINTS.USERS.CREATE, userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await apiClient.put(ENDPOINTS.USERS.UPDATE(id), userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await apiClient.delete(ENDPOINTS.USERS.DELETE(id));
  return response.data;
};

const uploadAvatar = async (formData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.USERS.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to upload avatar:', error);
    throw error.response?.data || error.message;
  }
};

const getUserSalary = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.SALARY.GET_MY_SALARY);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch salary:', error);
    throw error;
  }
};

const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar,
  getUserSalary,
};

export { userService, getUserSalary };
