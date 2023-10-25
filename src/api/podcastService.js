import axios from 'axios';


const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/podcasts`
});

// Set the common headers for the Axios instance
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.url === '/') {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

export const getAllPodcasts = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPodcastById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTop6Podcasts = async () => {
    try {
        const response = await api.get('/top-6');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createPodcast = async (data) => {
    try {
        console.log(data);
        const response = await api.post('/', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePodcast = async (id, data) => {
    try {
        const response = await api.patch(`/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deletePodcast = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPodcastByCategory = async (category) => {
    try {
        const response = await api.get(`/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPodcastByHost = async (host) => {
    try {
        const response = await api.get(`/host/${host}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const playlistAction = async (id) => {
    try {
        const response = await api.post(`/playlist/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPlaylist = async (id) => {
    try {
        const response = await api.get(`/playlist/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const likedAction = async (id) => {
    try {
        const response = await api.post(`/liked/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getLikedPodcasts = async () => {
    try {
        const response = await api.get(`/liked`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const favouriteAction = async (id) => {
    try {
        const response = await api.post(`/favourite/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFavouritePodcasts = async (id) => {
    try {
        const response = await api.get(`/favourite/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
