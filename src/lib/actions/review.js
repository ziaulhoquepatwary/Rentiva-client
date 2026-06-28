import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getPropertyReviewsApi = async (propertyId) => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/reviews/property/${propertyId}`);
        return res.data;
    } catch (error) {
        console.error("Get reviews API error:", error.response?.data || error.message);
        throw error;
    }
};

export const createReviewApi = async (reviewData) => {
    try {
        const res = await axios.post(`${baseApiUrl}/api/reviews/create`, reviewData, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Create review API error:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteReviewApi = async (reviewId) => {
    try {
        const res = await axios.delete(`${baseApiUrl}/api/reviews/delete/${reviewId}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Delete review API error:", error.response?.data || error.message);
        throw error;
    }
};

export const getHomeTopReviewsApi = async () => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/reviews/home-reviews`);
        return res.data;
    } catch (error) {
        console.error("Get home reviews API error:", error.response?.data || error.message);
        throw error;
    }
};