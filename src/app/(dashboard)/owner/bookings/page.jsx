"use client";

import { getOwnerBookedPropertiesApi } from "@/lib/actions/booking";
import React, { useEffect, useState } from "react";

function OwnerBookedProperty() {
    const [bookings, setBookings] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPage: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("running");

    useEffect(() => {
        const fetchOwnerBookings = async () => {
            setLoading(true);
            try {
                const response = await getOwnerBookedPropertiesApi(page, 10, type);
                if (response.success) {
                    setBookings(response.data);
                    setMeta(response.meta);
                }
            } catch (error) {
                console.error("Failed to fetch owner bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerBookings();
    }, [page, type]);

    const handleTypeChange = (newType) => {
        setType(newType);
        setPage(1);
    };

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Booked Properties</h2>
                    <p className="text-xs text-slate-400 mt-1">
                        {type === "running" ? "Currently active rentals" : "Past rental history logs"}
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                    {["running", "previous"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTypeChange(tab)}
                            className={`px-4 py-2 text-xs font-semibold capitalize rounded-lg transition-all cursor-pointer ${type === tab
                                    ? "bg-[#76ABAE] text-white shadow-sm"
                                    : "text-slate-500 dark:text-slate-400 hover:text-[#1B3C53] dark:hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-[#1B3C53] dark:text-[#EEEEEE]">Loading booking records...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#E2E8F0] dark:border-[#64748B] text-slate-400 text-sm font-medium">
                                <th className="py-3 px-4">Property Details</th>
                                <th className="py-3 px-4">Tenant</th>
                                <th className="py-3 px-4">Duration</th>
                                <th className="py-3 px-4">Timeline</th>
                                <th className="py-3 px-4">Rent</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#64748B] text-sm">
                            {bookings.map((booking) => {
                                const property = booking.propertyId;
                                return (
                                    <tr key={booking._id} className="hover:bg-[#E2E8F0]/20 dark:hover:bg-[#64748B]/10 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={property?.images?.[0] || "/property-placeholder.png"}
                                                    alt={property?.title || "Property"}
                                                    className="w-12 h-12 object-cover rounded-xl border border-[#E2E8F0] dark:border-[#64748B]"
                                                />
                                                <div>
                                                    <div className="font-semibold text-sm line-clamp-1">{property?.title || "Deleted Property"}</div>
                                                    <div className="text-xs text-slate-400 dark:text-[#EEEEEE]/60">{property?.location || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={booking.tenantImage || "/avatar-placeholder.png"}
                                                    alt={booking.tenantName || "User"}
                                                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                                />
                                                <div>
                                                    <div className="font-medium text-xs">{booking.tenantName || "Unknown Tenant"}</div>
                                                    <div className="text-[11px] text-slate-400">{booking.tenantEmail || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 capitalize">
                                            <span className="px-2 py-0.5 text-[11px] rounded bg-slate-100 dark:bg-slate-800 font-medium">
                                                {booking.durationType}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-xs text-slate-500 dark:text-[#EEEEEE]/80">
                                            <div><span className="text-slate-400">From:</span> {booking.startDate}</div>
                                            <div><span className="text-slate-400">To:</span> {booking.endDate}</div>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-[#76ABAE]">${booking.payableAmount}</td>
                                    </tr>
                                );
                            })}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-slate-400">
                                        No {type} booking records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {meta.totalPage > 1 && !loading && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-4 py-2 text-sm font-medium rounded-xl border border-[#E2E8F0] dark:border-[#64748B] disabled:opacity-50 cursor-pointer"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {meta.page} of {meta.totalPage}
                    </span>
                    <button
                        disabled={page === meta.totalPage}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 text-sm font-medium rounded-xl border border-[#E2E8F0] dark:border-[#64748B] disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default OwnerBookedProperty;