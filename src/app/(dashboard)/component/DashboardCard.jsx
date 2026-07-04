"use client";

import { Users, UserCheck, Building2, Briefcase, Heart, DollarSign } from "lucide-react";

const iconMap = {
    users: Users,
    owners: UserCheck,
    tenants: UserCheck,
    properties: Building2,
    bookings: Briefcase,
    favorites: Heart,
    spend: DollarSign,
    earnings: DollarSign,
};

function DashboardCard({ iconId, title, value }) {
    const IconComponent = iconMap[iconId] || Briefcase;

    return (
        <div className="p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE]/80 shadow-sm hover:shadow-md">
            <div className="flex flex-col gap-4">
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-center text-[#1B3C53] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE]">
                    <IconComponent size={20} />
                </div>

                {/* Content */}
                <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-[#EEEEEE]/50">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                        {value}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard;