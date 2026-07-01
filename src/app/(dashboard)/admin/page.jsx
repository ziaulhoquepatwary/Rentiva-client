import { Users, UserCheck, Building2, Briefcase } from "lucide-react";
import AdminWelcome from "./AdminWelcome";
import DashboardCard from "../component/DashboardCard";
import { getAdminDashboardStats } from "@/lib/actions/admin";


async function AdminDashboard() {
    const adminDashboardStats = await getAdminDashboardStats();
    console.log("Admin Dashboard Stats:", adminDashboardStats);
    const stats = [
        { id: "users", title: "Total Users", value: adminDashboardStats.data.totalUsers },
        { id: "owners", title: "Total Owners", value: adminDashboardStats.data.totalOwners },
        { id: "tenants", title: "Total Tenants", value: adminDashboardStats.data.totalTenants },
        { id: "properties", title: "Total Properties", value: adminDashboardStats.data.totalProperties },
        { id: "bookings", title: "Total Bookings", value: adminDashboardStats.data.totalBookings },
    ];

    return (
        <div className="space-y-8">
            <AdminWelcome />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        iconId={stat.id}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;