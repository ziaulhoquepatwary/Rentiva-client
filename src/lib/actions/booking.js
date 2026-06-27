import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getMyBookingsApi = async (page = 1, limit = 10, type = "running") => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/bookings/tenant-booking`, {
            params: { page, limit, type },
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("API error response:", error.response?.data || error.message);
        throw error;
    }
};

export const getOwnerBookedPropertiesApi = async (page = 1, limit = 10, type = "running") => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/bookings/owner-booked`, {
            params: { page, limit, type },
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("API error response:", error.response?.data || error.message);
        throw error;
    }
};