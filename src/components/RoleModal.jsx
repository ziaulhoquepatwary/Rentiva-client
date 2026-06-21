"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Home, Key, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function RoleModal({ isOpen, onRoleUpdated }) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleRoleSelect = async (selectedRole) => {
        setLoading(true);
        try {
            const { error } = await authClient.updateUser({
                role: selectedRole,
            });

            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Configuration Failed",
                    text: error.message || "Failed to update role",
                    customClass: {
                        popup: 'rounded-2xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border border-[#E2E8F0] dark:border-[#64748B]'
                    }
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Profile Configured!",
                    text: `Your account environment is now set as a ${selectedRole === 'tenant' ? 'Tenant' : 'Property Owner'}.`,
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'rounded-2xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border border-[#E2E8F0] dark:border-[#64748B]'
                    }
                });

                onRoleUpdated();
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "System Error",
                text: "Something went wrong during data sync!",
                customClass: {
                    popup: 'rounded-2xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border border-[#E2E8F0] dark:border-[#64748B]'
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
            {/* Modal Box */}
            <div className="max-w-md w-full bg-white dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] p-8 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 transition-colors duration-300">

                {/* Background Deco Light */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#76ABAE] opacity-10 dark:opacity-20 rounded-full filter blur-2xl pointer-events-none" />

                {/* Typography Header */}
                <div className="space-y-1.5 relative z-10">
                    <h2 className="text-2xl font-black text-[#1B3C53] dark:text-[#EEEEEE] uppercase tracking-tight">
                        Account Setup
                    </h2>
                    <p className="text-[#1B3C53]/60 dark:text-[#EEEEEE]/60 text-xs font-semibold uppercase tracking-wider">
                        Select identity parameters to deploy experience
                    </p>
                </div>

                {/* Grid Choice Layout */}
                <div className="grid grid-cols-2 gap-4 relative z-10">

                    {/* Tenant Choice */}
                    <button
                        onClick={() => handleRoleSelect("tenant")}
                        disabled={loading}
                        className="p-6 bg-gray-50 dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] rounded-2xl hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:bg-[#76ABAE]/5 dark:hover:bg-[#76ABAE]/10 transition-all duration-200 flex flex-col items-center gap-3 text-[#1B3C53] dark:text-[#EEEEEE] group disabled:opacity-50 cursor-pointer active:scale-95"
                    >
                        <div className="p-3 bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] rounded-xl border border-[#E2E8F0] dark:border-[#64748B] group-hover:bg-[#76ABAE] group-hover:text-white dark:group-hover:text-[#1B3C53] transition-colors duration-200">
                            <Home size={28} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest text-[#1B3C53]/90 dark:text-[#EEEEEE]/90 group-hover:text-[#1B3C53] dark:group-hover:text-white">Tenant</span>
                    </button>

                    {/* Owner Choice */}
                    <button
                        onClick={() => handleRoleSelect("owner")}
                        disabled={loading}
                        className="p-6 bg-gray-50 dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] rounded-2xl hover:border-[#76ABAE] dark:hover:border-[#76ABAE] hover:bg-[#76ABAE]/5 dark:hover:bg-[#76ABAE]/10 transition-all duration-200 flex flex-col items-center gap-3 text-[#1B3C53] dark:text-[#EEEEEE] group disabled:opacity-50 cursor-pointer active:scale-95"
                    >
                        <div className="p-3 bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] rounded-xl border border-[#E2E8F0] dark:border-[#64748B] group-hover:bg-[#76ABAE] group-hover:text-white dark:group-hover:text-[#1B3C53] transition-colors duration-200">
                            <Key size={28} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest text-[#1B3C53]/90 dark:text-[#EEEEEE]/90 group-hover:text-[#1B3C53] dark:group-hover:text-white">Owner</span>
                    </button>
                </div>

                {/* Global Sync Loading Indicator */}
                {loading && (
                    <div className="flex items-center justify-center gap-2 text-[#1B3C53] dark:text-[#EEEEEE] bg-gray-50 dark:bg-[#1B3C53] py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#64748B] text-[11px] font-bold uppercase tracking-wider animate-pulse">
                        <Loader2 size={14} className="animate-spin text-[#76ABAE]" />
                        <span>Synchronizing Node Parameters...</span>
                    </div>
                )}
            </div>
        </div>
    );
}