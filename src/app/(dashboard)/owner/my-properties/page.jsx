"use client";

import { getMyPropertiesApi } from "@/lib/actions/property";
import React, { useEffect, useState } from "react";
import PropertyActions from "./PropertyActions";

function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPage: 1 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("Approved");
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await getMyPropertiesApi(page, 10, status);
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
    }, [page, status]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setPage(1);
    };

    const handleView = (id) => {
        window.location.href = `/properties/${id}`;
    };

    const handleEdit = (id) => {
        window.location.href = `/properties/edit/${id}`;
    };

    const handleDeleteSuccess = (deletedId) => {
        setProperties((prevProperties) =>
            prevProperties.filter((property) => property._id !== deletedId)
        );

        if (properties.length === 1 && page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B] dark:text-[#EEEEEE] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">My {status} Properties</h2>

                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                    {["Approved", "Pending", "Rejected"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleStatusChange(tab)}
                            className={`px-4 py-2 text-xs font-semibold capitalize rounded-lg transition-all cursor-pointer ${status === tab
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
                <div className="text-center py-10 text-[#1B3C53] dark:text-[#EEEEEE]">Loading properties...</div>
            ) : (
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
                                                status={property.status}
                                                feedback={property.rejectionFeedback}
                                                onView={handleView}
                                                onEdit={handleEdit}
                                                onDeleteSuccess={handleDeleteSuccess}
                                                onShowFeedback={setSelectedFeedback}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-slate-400">
                                        No {status} properties found.
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

            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-white dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] rounded-2xl shadow-xl max-w-md w-full p-6 relative">
                        <h3 className="text-lg font-bold text-red-500 mb-2">Rejection Reason</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-dashed border-red-200 dark:border-red-500/20 leading-relaxed">
                            {selectedFeedback}
                        </p>
                        <div className="mt-5 flex justify-end">
                            <button
                                onClick={() => setSelectedFeedback(null)}
                                className="px-4 py-2 text-sm font-medium rounded-xl bg-[#1B3C53] text-white dark:bg-white dark:text-[#1B3C53] hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProperties;