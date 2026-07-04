import AdminWelcome from "./AdminWelcome";
import DashboardCard from "../component/DashboardCard";
import { fetchAdminDashboardStats } from "@/lib/actions/dashobard";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const res = await fetchAdminDashboardStats();

    const stats = [
        {
            id: "users",
            title: "Total Users",
            value: res?.totalUsers || 0,
        },
        {
            id: "owners",
            title: "Total Owners",
            value: res?.totalOwners || 0,
        },
        {
            id: "tenants",
            title: "Total Tenants",
            value: res?.totalTenants || 0,
        },
        {
            id: "properties",
            title: "Total Properties",
            value: res?.totalProperties || 0,
        },
        {
            id: "bookings",
            title: "Total Bookings",
            value: res?.totalBookings || 0,
        },
    ];

    return (
        <div className="space-y-8">
            <AdminWelcome />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {stats.map((stat) => (
                    <DashboardCard
                        key={stat.id}
                        iconId={stat.id}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>
        </div>
    );
}