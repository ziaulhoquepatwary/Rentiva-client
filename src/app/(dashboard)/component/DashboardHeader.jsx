"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Menu, User as UserIcon, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Loading from "@/app/loading";
import ThemeToggle from "@/components/ThemeToggle";

function DashboardHeader({ onMenuClick }) {
    const { data: session, isPending } = authClient.useSession();
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

    const user = session?.user;

    if (isPending) {
        return <Loading />;
    }

    return (
        <header className="sticky top-0 z-40 h-16 border-b flex items-center justify-between px-4 lg:px-6 transition-colors duration-300 bg-white border-[#E2E8F0] dark:bg-[#1B3C53] dark:border-[#64748B]">

            {/* Search and Mobile Menu Button */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg md:hidden text-[#1B3C53] hover:bg-[#E2E8F0] dark:text-[#EEEEEE] dark:hover:bg-[#64748B]"
                >
                    <Menu size={20} />
                </button>

                <div className="relative w-full hidden sm:block">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#EEEEEE]/40"
                    />
                    <input
                        type="text"
                        placeholder="Search applications, jobs, or talent..."
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border outline-none transition-all bg-slate-50 border-[#E2E8F0] text-[#1B3C53] placeholder-slate-400 focus:border-[#76ABAE] dark:bg-[#64748B]/30 dark:border-[#64748B] dark:text-[#EEEEEE] dark:placeholder-[#EEEEEE]/30 dark:focus:border-[#76ABAE]"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center ml-1 gap-3 md:gap-4">

                {/* Notifications */}
                <button
                    className="p-2 rounded-xl border relative transition-colors bg-slate-50 border-[#E2E8F0] text-[#1B3C53] hover:bg-[#E2E8F0] dark:bg-[#64748B]/50 dark:border-[#64748B] dark:text-[#EEEEEE] dark:hover:bg-[#1B3C53]"
                >
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <ThemeToggle />

                <div className="h-8 w-[1px] bg-[#E2E8F0] dark:bg-[#64748B]"></div>

                {/* User Profile & Dropdown */}
                <div className="flex items-center gap-3 relative">

                    {/* User Name & Role (Visible on Large Screens) */}
                    <div className="text-right hidden lg:block">
                        <h5 className="text-sm font-semibold text-[#1B3C53] dark:text-[#EEEEEE]">
                            {user?.name}
                        </h5>
                        <p className="text-xs text-gray-400 dark:text-[#EEEEEE]/50 capitalize">
                            {user?.role}
                        </p>
                    </div>

                    {/* Interactive Avatar Button */}
                    <button
                        onClick={() => setAvatarMenuOpen((prev) => !prev)}
                        className="w-9 h-9 rounded-full overflow-hidden border border-[#1B3C53]/20 dark:border-[#EEEEEE]/20 hover:opacity-90 transition-all focus:outline-none cursor-pointer"
                    >
                        <img
                            src={user?.image || "/user.png"}
                            alt={user?.name}
                            className="object-cover w-full h-full"
                        />
                    </button>

                    {/* Avatar Dropdown Menu */}
                    {avatarMenuOpen && (
                        <div className="absolute right-0 top-12 w-56 bg-white dark:bg-[#1B3C53] rounded-xl border border-[#E2E8F0] dark:border-[#64748B] shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                            {/* User Info Section */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2E8F0] dark:border-[#64748B]">
                                <img
                                    src={user?.image || "/user.png"}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-[#1B3C53] dark:text-[#EEEEEE] truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-400 truncate">{user?.email}</p>
                                </div>
                            </div>

                            {/* Actions List */}
                            <div className="p-2">
                                <Link
                                    href={`/${user.role}/profile`}
                                    onClick={() => setAvatarMenuOpen(false)}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#1B3C53] dark:text-[#EEEEEE] rounded-lg hover:bg-[#E2E8F0] dark:hover:bg-[#64748B] transition-colors"
                                >
                                    <UserIcon size={15} /> My Profile
                                </Link>

                                <button
                                    onClick={() => {
                                        setAvatarMenuOpen(false);
                                        authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => { window.location.href = "/"; }
                                            }
                                        });
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                                >
                                    <LogOut size={15} /> Logout
                                </button>
                            </div>

                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}

export default DashboardHeader;