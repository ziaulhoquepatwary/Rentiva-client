"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePlus, Heart, User, Building2, Briefcase, Users, Clock, ChevronRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";

const MENU_CONFIG = {
    tenant: [
        { name: "Overview", href: "/tenant", icon: LayoutDashboard },
        { name: "My Bookings", href: "/tenant/my-bookings", icon: FilePlus },
        { name: "Favorites", href: "/tenant/favorites", icon: Heart },
        { name: "Profile", href: "/tenant/profile", icon: User },
    ],
    owner: [
        { name: "Overview", href: "/owner", icon: LayoutDashboard },
        { name: "My Properties", href: "/owner/my-properties", icon: Building2 },
        { name: "Add Property", href: "/owner/add-property", icon: FilePlus },
        { name: "Bookings", href: "/owner/bookings", icon: Briefcase },
        { name: "Profile", href: "/owner/profile", icon: User },
    ],
    admin: [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Pending Properties", href: "/admin/pending-properties", icon: Clock },
        { name: "Bookings", href: "/admin/bookings", icon: Briefcase },
        { name: "Profile", href: "/admin/profile", icon: User },
    ]
};

function DashboardSidebar({ isOpen, closeSidebar }) {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const role = user?.role;

    if (isPending) return <Loading />;
    if (!user || !role) return null;

    const menuItems = MENU_CONFIG[role] || [];

    return (
        <aside className={`w-64 h-screen flex flex-col justify-between border-r transition-all duration-300 z-50 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] fixed inset-y-0 left-0 md:sticky md:top-0 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="flex flex-col flex-1 overflow-y-auto pt-6">
                <div className="px-6 mb-8">
                    <Link href="/" className="flex items-center gap-0.5 tracking-wider font-black text-2xl">
                        <span className="text-slate-800 dark:text-white">RENT</span>
                        <span className="text-[#76ABAE]">IVA</span>
                    </Link>
                </div>

                <div className="px-4 mb-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0] dark:border-[#64748B]">
                        <img
                            src={user?.image || "/user.png"}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate text-[#1B3C53] dark:text-[#EEEEEE]">
                                {user.name}
                            </h4>
                            <p className="text-xs truncate text-slate-500 dark:text-slate-300">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="px-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => closeSidebar?.()}
                                className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${isActive ? "bg-[#1B3C53] text-white dark:bg-[#76ABAE] dark:text-[#1B3C53]" : "text-[#1B3C53] hover:bg-[#76ABAE]/10 dark:text-[#EEEEEE] dark:hover:bg-[#76ABAE]/20"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon
                                        size={18}
                                        className={`transition-transform group-hover:scale-110 ${isActive ? "" : "opacity-70"}`}
                                    />
                                    <span>{item.name}</span>
                                </div>
                                {isActive && (
                                    <ChevronRight size={14} className="opacity-70" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-[#E2E8F0] dark:border-[#64748B]">
                <div className="text-center py-2 px-3 rounded-lg bg-[#76ABAE]/10 dark:bg-[#76ABAE]/20">
                    <p className="text-[11px] font-medium capitalize text-[#1B3C53] dark:text-[#EEEEEE]">
                        Logged in as {user.role?.replace("_", " ")}
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default DashboardSidebar;