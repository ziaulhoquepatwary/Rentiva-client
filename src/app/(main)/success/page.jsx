"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Home, ArrowRight, Building } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const propertyTitle = searchParams.get("title") || "Property";
    const amount = searchParams.get("amount") || "0";
    const propertyId = searchParams.get("id") || "";

    return (
        <main className="py-10 bg-slate-50 dark:bg-[#1B3C53] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 text-center space-y-6 transition-all">

                {/* Success Animation Icon */}
                <div className="flex justify-center">
                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500 dark:text-emerald-400 animate-bounce">
                        <CheckCircle2 size={56} />
                    </div>
                </div>

                {/* Header & Congratulations message */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Congratulations!
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Your payment has been processed successfully. Your booking is officially confirmed and ready for your stay!
                    </p>
                </div>

                {/* Dynamic Summary Card */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800 text-left space-y-3.5">
                    <div className="flex items-start gap-3">
                        <Building size={18} className="text-[#76ABAE] mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Booked Space</p>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-1">
                                {propertyTitle}
                            </p>
                        </div>
                    </div>

                    <div className="h-px bg-slate-200/60 dark:bg-slate-800 w-full" />

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Amount Paid</p>
                            <p className="text-xl font-black text-[#76ABAE] mt-0.5">
                                ${amount}
                            </p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                            Paid
                        </span>
                    </div>
                </div>

                {/* Encouraging Closer Text */}
                <p className="text-xs italic text-slate-500 dark:text-slate-200">
                    We hope you fully enjoy this wonderful space and make unforgettable memories.
                </p>

                {/* Professional Navigation Actions */}
                <div className="pt-2">
                    <Link
                        href="/"
                        className="w-full bg-[#1B3C53] hover:bg-[#254f6d] dark:bg-[#76ABAE] dark:hover:bg-[#629295] text-white dark:text-[#1B3C53] font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                        <Home size={16} />
                        <span>Go Home</span>
                    </Link>
                </div>

            </div>
        </main>
    );
}

// Next.js static rendering protection for useSearchParams
export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
                <p className="text-lg font-semibold text-slate-500">Loading receipt...</p>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}