"use client";

import React from "react";

function PropertyActions({ propertyId, status, feedback, onView, onEdit, onDelete, onShowFeedback }) {
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
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E2E8F0] text-[#1B3C53] hover:bg-[#76ABAE] hover:text-white transition-colors cursor-pointer"
            >
                View
            </button>
            <button
                onClick={() => onEdit(propertyId)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#76ABAE]/20 text-[#76ABAE] hover:bg-[#76ABAE] hover:text-white transition-colors cursor-pointer"
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(propertyId)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
                Delete
            </button>
        </div>
    );
}

export default PropertyActions;