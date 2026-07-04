"use client";

import { useEffect, useState } from "react";
import AdminWelcome from "./AdminWelcome";
import DashboardCard from "../component/DashboardCard";
import Loading from "@/app/loading";
import { fetchAdminDashboardStats } from "@/lib/actions/dashobard";

function AdminDashboard() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const res = await fetchAdminDashboardStats();

                if (res.success) {
                    setStats([
                        {
                            id: "users",
                            title: "Total Users",
                            value: res.data.totalUsers,
                        },
                        {
                            id: "owners",
                            title: "Total Owners",
                            value: res.data.totalOwners,
                        },
                        {
                            id: "tenants",
                            title: "Total Tenants",
                            value: res.data.totalTenants,
                        },
                        {
                            id: "properties",
                            title: "Total Properties",
                            value: res.data.totalProperties,
                        },
                        {
                            id: "bookings",
                            title: "Total Bookings",
                            value: res.data.totalBookings,
                        },
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return <Loading />
    }

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

export default AdminDashboard;