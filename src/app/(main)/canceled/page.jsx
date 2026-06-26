"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

function CanceledContent() {
    const searchParams = useSearchParams();
    const propertyId = searchParams.get("id") || "";

    return (
        <main className="py-24 bg-[#1B3C53] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8 text-center space-y-6 transition-all">

                {/* Cancel/Error Icon */}
                <div className="flex justify-center">
                    <div className="p-3 bg-rose-500/20 rounded-full text-rose-400">
                        <XCircle size={56} />
                    </div>
                </div>

                {/* Header & Message */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">
                        Payment Canceled
                    </h1>
                    <p className="text-sm text-slate-300 leading-relaxed">
                        Your booking transaction was not completed. No funds were deducted from your account. If this was a mistake, you can safely try again.
                    </p>
                </div>

                {/* Info Note */}
                <div className="bg-[#0f283a]/40 p-4 rounded-xl border border-white/5 text-xs text-slate-400 italic">
                    Need assistance with your booking? Please contact our support team if you encounter persistent payment difficulties.
                </div>

                {/* Professional Navigation Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Link
                        href="/"
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all border border-white/10 flex items-center justify-center gap-2 active:scale-95"
                    >
                        <ArrowLeft size={16} />
                        <span>Go Home</span>
                    </Link>
                </div>

            </div>
        </main>
    );
}

export default function CanceledPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#1B3C53]">
                <p className="text-lg font-semibold text-slate-300">Loading cancel status...</p>
            </div>
        }>
            <CanceledContent />
        </Suspense>
    );
}