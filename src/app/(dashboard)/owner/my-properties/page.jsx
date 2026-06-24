"use client";

import { getMyPropertiesApi } from "@/lib/actions/property";
import React, { useEffect, useState } from "react";
import PropertyActions from "./PropertyActions";

function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPage: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await getMyPropertiesApi(page, 10);
                if (response.success) {
                    setProperties(response.data);
                    setMeta(response.meta);
                }
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [page]);

    const handleView = (id) => {
        window.location.href = `/properties/${id}`;
    };

    const handleEdit = (id) => {
        window.location.href = `/properties/edit/${id}`;
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this property?")) {
            console.log("Delete property ID:", id);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-[#1B3C53] dark:text-[#EEEEEE]">Loading properties...</div>;
    }

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] shadow-sm">
            <h2 className="text-2xl font-bold mb-6">My Properties</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#E2E8F0] dark:border-[#64748B] text-slate-400 text-sm font-medium">
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Rent</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#64748B] text-sm">
                        {properties.map((property) => (
                            <tr key={property._id} className="hover:bg-[#E2E8F0]/20 dark:hover:bg-[#64748B]/10 transition-colors">
                                <td className="py-3 px-4">
                                    <img
                                        src={property.images?.[0] || "/property-placeholder.png"}
                                        alt={property.title}
                                        className="w-12 h-12 object-cover rounded-xl border border-[#E2E8F0] dark:border-[#64748B]"
                                    />
                                </td>
                                <td className="py-3 px-4 font-semibold">{property.title}</td>
                                <td className="py-3 px-4 text-slate-400 dark:text-[#EEEEEE]/60">{property.location}</td>
                                <td className="py-3 px-4 capitalize">{property.propertyType}</td>
                                <td className="py-3 px-4 font-medium text-[#76ABAE]">${property.rent}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="inline-block">
                                        <PropertyActions
                                            propertyId={property._id}
                                            onView={handleView}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {properties.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-slate-400">
                                    No properties found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {meta.totalPage > 1 && (
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

export default MyProperties;