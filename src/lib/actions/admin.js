import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllUsersApi = async (search = "", role = "", page = 1, limit = 12) => {
    try {
        let url = `${baseApiUrl}/api/admin/user?page=${page}&limit=${limit}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (role) url += `&role=${role}`;

        const res = await axios.get(url, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Get all users API error:", error.response?.data || error.message);
        throw error;
    }
};

export const updateUserRoleApi = async (userId, role) => {
    try {
        const res = await axios.patch(
            `${baseApiUrl}/api/admin/users/${userId}/role`,
            { role },
            { withCredentials: true }
        );
        return res.data;
    } catch (error) {
        console.error("Update role API error:", error.response?.data || error.message);
        throw error;
    }
};