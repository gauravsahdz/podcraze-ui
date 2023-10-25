import axios from "axios";

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/users`,
});

// Set the common headers for the Axios instance
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export const loginApi = async (data) => {
    try {
        const response = await api.post(`/login`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signupApi = async (data) => {
    try {
        const response = await api.post(`/signup`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.get(`/logout`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get(`/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (data) => {
    try {
        const response = await api.post(`/`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, data) => { 
    try {
        const response = await api.patch(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};