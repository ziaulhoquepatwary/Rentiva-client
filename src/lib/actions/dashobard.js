import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchLiveWithNoCache(endpoint) {

    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const res = await fetch(`${baseApiUrl}${endpoint}?t=${Date.now()}`, {
        method: "GET",
        headers: {
            "Cookie": allCookies,
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Pragma": "no-cache"
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
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