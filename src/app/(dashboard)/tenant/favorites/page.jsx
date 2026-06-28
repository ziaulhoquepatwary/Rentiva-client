"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Trash2, Loader2 } from "lucide-react";
import { getTenantFavoritesApi, toggleFavoriteApi } from "@/lib/actions/favorite";
import Swal from "sweetalert2";

export default function TenantFavorites() {
    const [favorites, setFavorites] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPage: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await getTenantFavoritesApi(page, 8); // Showing 8 items per page for table
            if (response.success) {
                setFavorites(response.data || []);
                setMeta(response.meta || { page: 1, totalPage: 1 });
            }
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isMounted) {
            fetchFavorites();
        }
    }, [page, isMounted]);

    const handleRemoveFavorite = async (propertyId) => {
        try {
            const response = await toggleFavoriteApi(propertyId);
            if (response.success && !response.isSaved) {
                setFavorites((prev) => prev.filter((property) => property._id !== propertyId));
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Removed from favorites",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold">My Favorite Properties</h2>
                <p className="text-xs text-slate-400 mt-1">Properties you have saved for later review</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20 text-[#1B3C53] dark:text-[#EEEEEE]">
                    <Loader2 className="animate-spin mr-2" size={20} />
                    <span>Loading your favorites...</span>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700/60">
                                <th className="p-4 w-20">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Rent Type</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm">
                            {favorites.map((property) => {
                                if (!property) return null;

                                return (
                                    <tr key={property._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700">
                                                <img
                                                    src={property.images?.[0] || "/property-placeholder.png"}
                                                    alt={property.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold line-clamp-1">{property.title}</div>
                                            <div className="text-xs text-slate-400 line-clamp-1">{property.location}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#76ABAE]/10 text-[#91c7ca] dark:bg-[#76ABAE]/20">
                                                {property.rentType}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#76ABAE]/10 text-[#91c7ca] dark:bg-[#76ABAE]/20">
                                                {property.propertyType}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-[#91c7ca]">
                                            ${property.rent}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/properties/${property._id}`}
                                                    className="p-2 rounded-lg bg-[#1B3C53]/5 hover:bg-[#1B3C53]/10 dark:bg-[#76ABAE]/10 dark:hover:bg-[#76ABAE]/20 text-[#1B3C53] dark:text-[#76ABAE] transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleRemoveFavorite(property._id)}
                                                    className="p-2 rounded-lg bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer"
                                                    title="Remove from favorites"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {favorites.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            You haven't added any properties to your favorites yet.
                        </div>
                    )}
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