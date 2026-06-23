"use client";

import { authClient } from "@/lib/auth-client";
import { DollarSign, Building2, Briefcase, Clock } from "lucide-react";
import Loading from "@/app/loading";
import DashboardCard from "../component/DashboardCard";

function OwnerDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return <Loading />;
    }

    const stats = [
        { title: "Total Earnings", value: "$4,250", icon: DollarSign },
        { title: "Total Properties", value: "6", icon: Building2 },
        { title: "Total Bookings", value: "28", icon: Briefcase },
        { title: "Pending Approvals", value: "2", icon: Clock },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                    Welcome back, {user?.name || "Owner"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Here is what's happening with your properties today.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <DashboardCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default OwnerDashboard;