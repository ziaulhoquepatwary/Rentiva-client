import { fetchTenantDashboardStats } from "@/lib/actions/dashobard";
import DashboardCard from "../component/DashboardCard";
import TenantWelcome from "./TenantWelcome";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

async function TenantDashboardPage() {
    const tenantStats = await fetchTenantDashboardStats();

    const totalBookings = tenantStats?.totalBookings || 0;
    const totalFavorites = tenantStats?.totalFavorites || 0;
    const activeRentals = tenantStats?.activeRentals || 0;
    const totalSpend = tenantStats?.totalSpend || 0;

    const stats = [
        {
            iconId: "bookings",
            title: "Total Bookings",
            value: totalBookings.toLocaleString()
        },
        {
            iconId: "favorites",
            title: "Favorites",
            value: totalFavorites.toLocaleString()
        },
        {
            iconId: "properties",
            title: "Active Rentals",
            value: activeRentals.toLocaleString()
        },
        {
            iconId: "spend",
            title: "Total Spend",
            value: `$${totalSpend.toLocaleString()}`
        },
    ];

    return (
        <div className="space-y-8">
            <TenantWelcome />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        iconId={stat.iconId}
                        title={stat.title}
                        value={stat.value}
                    />
                ))}
            </div>
        </div>
    );
}

export default TenantDashboardPage;