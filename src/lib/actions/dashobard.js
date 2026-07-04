import { cookies } from "next/headers";
import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchTenantDashboardStats() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/dashboard/tenant/deshboard-overview?t=${Date.now()}`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        return res.data.data;
    } catch (error) {
        console.error("Tenant Fetch Error:", error);
        return null;
    }
}

export async function fetchOwnertDashboardStats() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/dashboard/owner/deshboard-overview?t=${Date.now()}`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        return res.data.data;
    } catch (error) {
        console.error("Owner Fetch Error:", error);
        return null;
    }
}

export async function fetchAdminDashboardStats() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/dashboard/admin/deshboard-overview?t=${Date.now()}`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        return res.data.data;
    } catch (error) {
        console.error("Admin Fetch Error:", error);
        return null;
    }
}

export async function fetchOwnerMonthlyEarnings() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/earning/owner/monthly-earning?t=${Date.now()}`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });

        return res.data?.data?.monthlyEarnings || res.data?.monthlyEarnings || [];
    } catch (error) {
        console.error("Owner Monthly Earnings Fetch Error:", error);
        return [];
    }
}