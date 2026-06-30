"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, Eye } from "lucide-react";
import { getRunningBookingsApi, getBookingHistoryApi } from "@/lib/actions/admin";

export default function AdminBookings() {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("running"); // "running" or "history"
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ totalPages: 1, totalBookings: 0 });
    const limit = 10; // Items per page

    useEffect(() => {
        const fetchBookingData = async () => {
            setLoading(true);
            try {
                const response = activeTab === "running"
                    ? await getRunningBookingsApi(page, limit)
                    : await getBookingHistoryApi(page, limit);

                if (response.success) {
                    setBookings(response.data || []);
                    setMeta({
                        totalPages: response.totalPages || 1,
                        totalBookings: response.totalBookings || 0
                    });
                }
            } catch (error) {
                console.error("Failed to fetch admin bookings:", error);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [activeTab, page]); // Triggers API when tab or page changes

    // Handle tab change and reset page to 1
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(1);
    };

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B]/40 dark:text-[#EEEEEE] shadow-sm">

            {/* Header Controller Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Booking Overview</h2>
                    <p className="text-xs text-slate-400 mt-1">Monitor all ongoing rental contracts and past booking archives</p>
                </div>

                {/* RIGHT SIDE: Action Tabs Toggle Buttons */}
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/40 p-1.5 rounded-xl self-start sm:self-center">
                    <button
                        onClick={() => handleTabChange("running")}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === "running"
                                ? "bg-[#1B3C53] text-white dark:bg-[#76ABAE] dark:text-[#1B3C53] shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            }`}
                    >
                        Running Bookings
                    </button>
                    <button
                        onClick={() => handleTabChange("history")}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTab === "history"
                                ? "bg-[#1B3C53] text-white dark:bg-[#76ABAE] dark:text-[#1B3C53] shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            }`}
                    >
                        Booking History
                    </button>
                </div>
            </div>

            {/* Main Presentation Screen */}
            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <Loader2 className="animate-spin mr-2 text-[#76ABAE]" size={24} />
                    <span className="text-sm text-slate-400">Aggregating schedule logs...</span>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60">
                                <th className="p-4">Property</th>
                                <th className="p-4">Tenant Identity</th>
                                <th className="p-4">Owner Identity</th>
                                <th className="p-4">Duration Timeline</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4 text-center font-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm">
                            {bookings.map((item) => {
                                if (!item) return null;
                                const { property, tenant, owner, startDate, endDate, payableAmount, paymentStatus } = item;

                                return (
                                    <tr key={item.bookingId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">

                                        {/* 1. Property Meta Column */}
                                        <td className="p-4 max-w-[260px]">
                                            {property ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60 dark:border-slate-700">
                                                        <img
                                                            src={property.image || "/property-placeholder.png"}
                                                            alt={property.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="truncate">
                                                        <h4 className="font-bold text-slate-800 dark:text-white truncate" title={property.title}>
                                                            {property.title}
                                                        </h4>
                                                        <p className="text-xs text-slate-400 truncate mt-0.5">{property.location}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-rose-400 italic">Property Deleted</span>
                                            )}
                                        </td>

                                        {/* 2. Tenant Meta Column */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200">
                                                    <img src={tenant?.image || "/avatar-placeholder.png"} alt={tenant?.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{tenant?.name || "Unknown"}</p>
                                                    <p className="text-[11px] text-slate-400 lowercase">{tenant?.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* 3. Owner Meta Column */}
                                        <td className="p-4">
                                            {owner ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200">
                                                        <img src={owner.image || "/avatar-placeholder.png"} alt={owner.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-700 dark:text-slate-300">{owner.name}</p>
                                                        <p className="text-[11px] text-slate-400 lowercase">{owner.email}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Not available</span>
                                            )}
                                        </td>

                                        {/* 4. Timeline Range */}
                                        <td className="p-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="flex items-center gap-1 text-emerald-500">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> From: {startDate}
                                                </span>
                                                <span className={`flex items-center gap-1 ${activeTab === "running" ? "text-amber-500" : "text-rose-400"}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${activeTab === "running" ? "bg-amber-500" : "bg-rose-400"}`} /> To: {endDate}
                                                </span>
                                            </div>
                                        </td>

                                        {/* 5. Account Payable */}
                                        <td className="p-4">
                                            <div className="font-bold text-slate-800 dark:text-white flex items-center">
                                                ${payableAmount}
                                            </div>
                                            <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${paymentStatus?.toLowerCase() === "paid"
                                                    ? "bg-emerald-500/10 text-emerald-500"
                                                    : "bg-amber-500/10 text-amber-500"
                                                }`}>
                                                {paymentStatus || "Pending"}
                                            </span>
                                        </td>

                                        {/* 6. Action Button / Navigation */}
                                        <td className="p-4 text-center">
                                            <button
                                                disabled={!property?.id}
                                                onClick={() => router.push(`/properties/${property?.id}`)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#1B3C53] dark:bg-[#76ABAE] dark:text-[#1B3C53] hover:opacity-90 rounded-lg transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                title="View Property Detail Page"
                                            >
                                                <Eye size={13} />
                                                <span>View</span>
                                            </button>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {bookings.length === 0 && (
                        <div className="text-center py-20 text-slate-400 flex flex-col items-center justify-center gap-2">
                            <Calendar size={32} className="text-slate-300 dark:text-slate-600" />
                            <span>No {activeTab} bookings registered in the system database.</span>
                        </div>
                    )}
                </div>
            )}

            {/* UPGRADED: Dynamic Pagination UI Controls */}
            {meta.totalPages > 1 && !loading && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/40">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-slate-600 dark:text-slate-300"
                    >
                        Previous
                    </button>
                    <span className="text-xs font-semibold text-slate-400">
                        Page {page} of {meta.totalPages} ({meta.totalBookings} total logs)
                    </span>
                    <button
                        disabled={page === meta.totalPages}
                        onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-slate-600 dark:text-slate-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}