import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const toggleFavoriteApi = async (propertyId) => {
    try {
        const res = await axios.post(`${baseApiUrl}/api/favorites/toggle`, { propertyId }, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Favorite toggle API error:", error.response?.data || error.message);
        throw error;
    }
};

export const checkFavoriteStatusApi = async (propertyId) => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/favorites/check/${propertyId}`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Check favorite status API error:", error.response?.data || error.message);
        throw error;
    }
};

export const getTenantFavoritesApi = async (page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/favorites/my-favorites`, {
            params: { page, limit },
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Get favorites API error:", error.response?.data || error.message);
        throw error;
    }
};