import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchLiveWithNoCache(endpoint) {
    const res = await axios.get(`${baseApiUrl}${endpoint}`, {
        withCredentials: true,
        headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        }
    });

    return res.data;
}

export async function fetchTenantDashboardStats() {
    try {
        const data = await fetchLiveWithNoCache("/api/dashboard/tenant/deshboard-overview");
        return data.data;
    } catch (error) {
        console.error("Tenant Fetch Error:", error);
        return null;
    }
}

export async function fetchOwnertDashboardStats() {
    try {
        const data = await fetchLiveWithNoCache("/api/dashboard/owner/deshboard-overview");
        return data.data;
    } catch (error) {
        console.error("Owner Fetch Error:", error);
        return null;
    }
}

export async function fetchAdminDashboardStats() {
    try {
        const data = await fetchLiveWithNoCache("/api/dashboard/admin/deshboard-overview");
        return data.data;
    } catch (error) {
        console.error("Admin Fetch Error:", error);
        return null;
    }
}

export async function fetchOwnerMonthlyEarnings() {
    try {
        const data = await fetchLiveWithNoCache("/api/earning/owner/monthly-earning");
        return data?.data?.monthlyEarnings || data?.monthlyEarnings || [];
    } catch (error) {
        console.error("Owner Monthly Earnings Fetch Error:", error);
        return [];
    }
}

export async function fetchAdminMonthlyEarnings() {
    try {
        const data = await fetchLiveWithNoCache("/api/earning/admin/monthly-earning");
        return data?.data
    } catch (error) {
        console.error("Admin Monthly Earnings Fetch Error:", error);
        return [];
    }
}