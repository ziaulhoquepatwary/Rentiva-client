"use client";

import React, { useState } from "react";
import { Loader2, Eye, Check, X } from "lucide-react";
import Swal from "sweetalert2";
import { updatePendingPropertyApi } from "@/lib/actions/admin";
import PropertyDetailsModal from "./PropertyDetailsModal";

export default function PropertyActions({ property, onPropertyUpdated }) {
    const [actionLoading, setActionLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleStatusUpdate = async (propertyId, status, manualFeedback = "") => {
        let feedback = manualFeedback;

        if (status === "Rejected" && !feedback) {
            const { value: text, isDismissed } = await Swal.fire({
                title: "Reject Property?",
                input: "textarea",
                inputLabel: "Please provide a reason for rejection",
                inputPlaceholder: "Type your feedback here...",
                showCancelButton: true,
                confirmButtonColor: "#EF4444",
                cancelButtonColor: "#64748B",
                confirmButtonText: "Reject",
                inputValidator: (value) => {
                    if (!value || value.trim() === "") {
                        return "You must provide a rejection feedback!";
                    }
                }
            });

            if (isDismissed) return;
            feedback = text;
        } else if (status === "Approved" && !manualFeedback) {
            const result = await Swal.fire({
                title: "Approve Property?",
                text: "Are you sure you want to approve this property and make it live?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#76ABAE",
                cancelButtonColor: "#64748B",
                confirmButtonText: "Yes, Approve"
            });

            if (!result.isConfirmed) return;
        }

        setActionLoading(true);
        try {
            const response = await updatePendingPropertyApi(propertyId, status, feedback);
            if (response.success) {
                setShowModal(false);
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: response.message || `Property successfully ${status}`,
                    showConfirmButton: false,
                    timer: 2500
                });

                if (onPropertyUpdated) {
                    onPropertyUpdated(propertyId);
                }
            }
        } catch (error) {
            Swal.fire("Failed", error.response?.data?.message || "Something went wrong", "error");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center gap-2">
                {actionLoading ? (
                    <Loader2 className="animate-spin text-[#76ABAE]" size={18} />
                ) : (
                    <>
                        <button
                            onClick={() => setShowModal(true)}
                            className="p-1.5 bg-slate-500/10 text-slate-500 hover:bg-slate-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="View Details"
                        >
                            <Eye size={16} />
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(property._id, "Approved")}
                            className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Approve Listing"
                        >
                            <Check size={16} />
                        </button>
                        <button
                            onClick={() => handleStatusUpdate(property._id, "Rejected")}
                            className="p-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-colors cursor-pointer"
                            title="Reject Listing"
                        >
                            <X size={16} />
                        </button>
                    </>
                )}
            </div>

            {showModal && (
                <PropertyDetailsModal
                    property={property}
                    onClose={() => setShowModal(false)}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </>
    );
}