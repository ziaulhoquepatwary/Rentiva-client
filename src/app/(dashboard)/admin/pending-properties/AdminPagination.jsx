"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminPagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/40">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
                Previous
            </button>
            <span className="text-xs font-semibold text-slate-400">
                Page {currentPage} of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
                Next
            </button>
        </div>
    );
}