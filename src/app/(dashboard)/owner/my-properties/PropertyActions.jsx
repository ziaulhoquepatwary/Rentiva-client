"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { deletePropertyApi } from "@/lib/actions/property"; // Adjust paths accordingly

function PropertyActions({ propertyId, status, feedback, onView, onShowFeedback, onDeleteSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this property listing!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, delete it!"
        });

        if (!result.isConfirmed) return;

        setIsDeleting(true);
        try {
            const response = await deletePropertyApi(propertyId);
            if (response.success) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: response.message || "Property deleted successfully",
                    showConfirmButton: false,
                    timer: 2000
                });

                if (onDeleteSuccess) {
                    onDeleteSuccess(propertyId);
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Deletion Failed",
                text: error.response?.data?.message || "Failed to delete the property. Try again later."
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {status === "Rejected" && feedback && (
                <button
                    onClick={() => onShowFeedback(feedback)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-600 dark:hover:text-white"
                >
                    Reason
                </button>
            )}

            <button
                onClick={() => onView(propertyId)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E2E8F0] text-[#1B3C53] hover:bg-[#76ABAE] hover:text-white transition-colors cursor-pointer dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-[#76ABAE]"
            >
                View
            </button>
            <Link
                href={`/owner/edit/${propertyId}`} // Change this routing path based on your real edit page path
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#76ABAE]/20 text-[#76ABAE] hover:bg-[#76ABAE] hover:text-white transition-colors cursor-pointer inline-block text-center"
            >
                Edit
            </Link>
            <button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white"
            >
                {isDeleting && <Loader2 size={12} className="animate-spin" />}
                <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
        </div>
    );
}

export default PropertyActions;