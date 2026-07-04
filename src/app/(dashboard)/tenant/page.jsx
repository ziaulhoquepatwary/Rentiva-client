"use client";

import { useState, useEffect } from "react";
import { fetchTenantDashboardStats } from "@/lib/actions/dashobard";
import DashboardCard from "../component/DashboardCard";
import TenantWelcome from "./TenantWelcome";

function TenantDashboardPage() {
    const [tenantStats, setTenantStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTenantStats() {
            try {
                const data = await fetchTenantDashboardStats();
                setTenantStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadTenantStats();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

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