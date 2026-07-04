"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, User } from "lucide-react";
import { getPendingPropertiesApi } from "@/lib/actions/admin";
import PropertyActions from "./PropertyActions";
import AdminPagination from "./AdminPagination";

export default function AdminPendingPropertiesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get("page") ? parseInt(searchParams.get("page"), 10) : 1;

    const [properties, setProperties] = useState([]);
    const [meta, setMeta] = useState({ totalPages: 1, totalProperties: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getPendingPropertiesApi(page, 10);
                if (response?.success) {
                    setProperties(response.data || []);
                    setMeta({
                        totalPages: response.totalPages || 1,
                        totalProperties: response.totalProperties || 0
                    });
                }
            } catch (error) {
                console.error("Error fetching components on client side:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    if (loading) {
        return <div className="text-center py-20 text-slate-400">Loading properties...</div>;
    }

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B]/40 dark:text-[#EEEEEE] shadow-sm">

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Pending Properties</h2>
                    <p className="text-xs text-slate-400 mt-1">Review and verify new property listings before publishing</p>
                </div>
                <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#76ABAE]/10 border border-[#76ABAE]/30">
                    Total Pending: <strong className="text-[#76ABAE]">{meta.totalProperties}</strong>
                </span>
            </div>

            <div className="w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700/60">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60">
                            <th className="p-4 w-16">Image</th>
                            <th className="p-4">Title / Location</th>
                            <th className="p-4">Rent Price</th>
                            <th className="p-4">Owner Identity</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm">
                        {properties.map((property) => {
                            if (!property) return null;
                            const owner = property.ownerInfo || {};

                            return (
                                <tr key={property._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="p-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                                            {property.images && property.images[0] ? (
                                                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <Building2 size={20} className="text-slate-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-semibold text-slate-800 dark:text-white max-w-xs truncate">{property.title}</div>
                                        <div className="text-xs text-slate-400 truncate max-w-xs mt-0.5">{property.location}</div>
                                    </td>
                                    <td className="p-4 font-semibold text-[#76ABAE]">
                                        ${property.rent} <span className="text-xs text-slate-400 font-normal">/{property.rentType || "Mo"}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0">
                                                {owner.image ? (
                                                    <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={14} className="text-slate-500" />
                                                )}
                                            </div>
                                            <div className="leading-tight">
                                                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">{owner.name || "Unknown"}</div>
                                                <div className="text-[10px] text-slate-400 max-w-[150px] truncate">{owner.email || "No email"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <PropertyActions property={property} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {properties.length === 0 && (
                    <div className="text-center py-16 text-slate-400">No pending properties available for verification.</div>
                )}
            </div>

            <AdminPagination currentPage={page} totalPages={meta.totalPages} />
        </div>
    );
}