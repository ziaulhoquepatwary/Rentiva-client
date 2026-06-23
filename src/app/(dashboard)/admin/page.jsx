"use client";

import { authClient } from "@/lib/auth-client";
import { Users, UserCheck, Building2, Briefcase } from "lucide-react";
import DashboardCard from "../../../component/dashboard/DashboardCard";
import Loading from "@/app/loading";

function AdminDashboard() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return <Loading />;
    }

    const stats = [
        { title: "Total Users", value: "1,284", icon: Users },
        { title: "Total Owners", value: "142", icon: UserCheck },
        { title: "Total Properties", value: "538", icon: Building2 },
        { title: "Total Bookings", value: "3,120", icon: Briefcase },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                    Welcome back, {user?.name || "Admin"}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Here is the platform's overall activity overview.
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

export default AdminDashboard;