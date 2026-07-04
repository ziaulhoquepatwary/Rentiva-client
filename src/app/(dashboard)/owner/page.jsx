"use client";

import { useState, useEffect } from "react";
import { fetchOwnerMonthlyEarnings, fetchOwnertDashboardStats } from "@/lib/actions/dashobard";
import DashboardCard from "../component/DashboardCard";
import OwnerWelcome from "./OwnerWelcome";
import OwnerEarningsChart from "../component/OwnerEarningsChart";

function OwnerDashboardPage() {
    const [ownerStats, setOwnerStats] = useState(null);
    const [monthlyEarningsData, setMonthlyEarningsData] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(ownerStats)
    console.log(monthlyEarningsData)

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const [stats, earnings] = await Promise.all([
                    fetchOwnertDashboardStats(),
                    fetchOwnerMonthlyEarnings()
                ]);
                setOwnerStats(stats);
                setMonthlyEarningsData(earnings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    const totalProperty = ownerStats?.totalProperties || 0;
    const totalEarnings = ownerStats?.totalEarnings || 0;
    const totalBookings = ownerStats?.totalBookings || 0;
    const totalPendingProperties = ownerStats?.pendingProperties || 0;

    const stats = [
        {
            iconId: "DollarSign",
            title: "Total Earnings",
            value: totalEarnings.toLocaleString(),
        },
        {
            iconId: "properties",
            title: "Total Properties",
            value: totalProperty.toLocaleString(),
        },
        {
            iconId: "bookings",
            title: "Total Bookings",
            value: totalBookings.toLocaleString(),
        },
        {
            iconId: "properties",
            title: "Pending Approvals",
            value: totalPendingProperties.toLocaleString(),
        },
    ];

    return (
        <div className="space-y-8">
            <OwnerWelcome />

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
            <div className="p-6 space-y-6">
                <div className="w-full">
                    <OwnerEarningsChart chartData={monthlyEarningsData} />
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboardPage;