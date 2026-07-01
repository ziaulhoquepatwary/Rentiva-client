import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPropertyApi = async (propertyData) => {
    try {
        const res = await axios.post(`${baseApiUrl}/api/properties`, propertyData, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("API error response:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllPropertiesAction = async (filters = {}) => {
    try {
        const params = new URLSearchParams();

        if (filters.location) {
            params.append("location", filters.location);
        }

        if (
            filters.propertyType &&
            filters.propertyType !== "All Properties"
        ) {
            params.append("propertyType", filters.propertyType);
        }

        if (filters.minPrice) {
            params.append("minPrice", filters.minPrice);
        }

        if (filters.maxPrice) {
            params.append("maxPrice", filters.maxPrice);
        }

        if (filters.sortBy) {
            params.append("sortBy", filters.sortBy);
        }

        if (filters.page) {
            params.append("page", filters.page);
        }

        if (filters.limit) {
            params.append("limit", filters.limit);
        }

        const res = await axios.get(
            `${baseApiUrl}/api/properties?${params.toString()}`,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        console.error(
            "Fetch properties API error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const getPropertyDetail = async (id) => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/properties/${id}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching property detail on server:", error.message);
        return null;
    }
}

export const getMyPropertiesApi = async (page = 1, limit = 12, status = "Approved") => {
    try {
        const res = await axios.get(`${baseApiUrl}/api/properties/owner-property`, {
            params: { page, limit, status },
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("API error response:", error.response?.data || error.message);
        throw error;
    }
};

export const deletePropertyApi = async (propertyId) => {
    try {
        const res = await axios.delete(`${baseApiUrl}/api/properties/${propertyId}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Delete property error:", error.response?.data || error.message);
        throw error;
    }
};

export const updatePropertyApi = async (propertyId, updatedData) => {
    try {
        const res = await axios.patch(
            `${baseApiUrl}/api/properties/${propertyId}`,
            updatedData,
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.error("Update property API error:", error.response?.data || error.message);
        throw error;
    }
};