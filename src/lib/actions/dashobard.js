import { cookies } from "next/headers";
import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchTenantDashboardStats() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/dashboard/tenant/deshboard-overview`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
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

        const res = await axios.get(`${baseApiUrl}/api/dashboard/owner/deshboard-overview`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
            }
        });

        return res.data.data;
    } catch (error) {
        console.error("Tenant Fetch Error:", error);
        return null;
    }
}

export async function fetchAdminDashboardStats() {
    try {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await axios.get(`${baseApiUrl}/api/dashboard/admin/deshboard-overview`, {
            withCredentials: true,
            headers: {
                Cookie: allCookies,
            }
        });

        return res.data.data;
    } catch (error) {
        console.error("Tenant Fetch Error:", error);
        return null;
    }
}