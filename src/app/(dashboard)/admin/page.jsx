"use client";

import { useState, useEffect } from "react";
import AdminWelcome from "./AdminWelcome";
import DashboardCard from "../component/DashboardCard";
import { fetchAdminDashboardStats, fetchAdminMonthlyEarnings } from "@/lib/actions/dashobard";
import OwnerEarningsChart from "../component/OwnerEarningsChart";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
    const [res, setRes] = useState(null);
    const [monthlyEarningsData, setMonthlyEarningsData] = useState([]);
    const [totalEarning, setTotalEarnings] = useState(0);
    const [loading, setLoading] = useState(true);

    console.log(res, monthlyEarningsData);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const [stats, earnings] = await Promise.all([
                    fetchAdminDashboardStats(),
                    fetchAdminMonthlyEarnings()
                ]);
                setRes(stats);
                setTotalEarnings(earnings.totalEarnings);
                setMonthlyEarningsData(earnings.monthlyEarnings);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <Loader2 className="animate-spin mr-2 text-[#76ABAE]" size={24} />
                <span className="text-sm text-slate-400">Aggregating schedule logs...</span>
            </div>
        )
    }

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

            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Total Earnings: ${totalEarning}</h1>
                <div className="w-full">
                    <OwnerEarningsChart chartData={monthlyEarningsData} />
                </div>
            </div>
        </div>
    );
}