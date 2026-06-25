"use client";

import { authClient } from "@/lib/auth-client";
import { Briefcase, Heart, Building2, User } from "lucide-react";
import Loading from "@/app/loading";
import DashboardCard from "../component/DashboardCard";

function TenantDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return <Loading />;
    }

    const stats = [
        { title: "Total Bookings", value: "12", icon: Briefcase },
        { title: "Favorites", value: "8", icon: Heart },
        { title: "Active Rentals", value: "1", icon: Building2 },
        { title: "Profile Status", value: "Verified", icon: User },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                    Welcome back, {user?.name || "Tenant"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Here is what's happening with your rentals today.
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

export default TenantDashboard;