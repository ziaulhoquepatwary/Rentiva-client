"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { checkBookingStatusApi } from "@/lib/actions/booking";

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const sessionId = searchParams.get("session_id");
    const propertyTitle = searchParams.get("title");

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("checking"); // checking, success, refunded, error
    const [message, setMessage] = useState("");

    useEffect(() => {
        let interval;
        let attempts = 0;

        const verifyWithBackend = async () => {
            try {
                const result = await checkBookingStatusApi(sessionId);

                if (result.status === "success") {
                    setStatus("success");
                    setMessage(result.message);
                    setLoading(false);
                    clearInterval(interval);
                } else if (result.status === "refunded") {
                    setStatus("refunded");
                    setMessage(result.message);
                    setLoading(false);
                    clearInterval(interval);
                } else {
                    attempts++;
                    if (attempts >= 6) {
                        setStatus("error");
                        setMessage("Unable to verify booking status. Please check your dashboard or contact support.");
                        setLoading(false);
                        clearInterval(interval);
                    }
                }
            } catch (err) {
                console.error("Verification polling error:", err);
                attempts++;
                if (attempts >= 6) {
                    setStatus("error");
                    setMessage("A network error occurred while verifying your booking. Please check your dashboard.");
                    setLoading(false);
                    clearInterval(interval);
                }
            }
        };

        if (sessionId) {
            interval = setInterval(verifyWithBackend, 2000);
            verifyWithBackend();
        } else {
            setStatus("invalid");
            setLoading(false);
        }

        return () => clearInterval(interval);
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#1B3C53] gap-3">
                <Loader2 className="animate-spin text-[#76ABAE]" size={40} />
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Confirming Booking Status...</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Please do not refresh or close this page.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#1B3C53] p-4">
            <div className="max-w-md w-full bg-white dark:bg-[#294f69] p-8 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/50 text-center space-y-6">

                {status === "success" && (
                    <>
                        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 size={36} />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Payment Confirmed!</h1>
                        <p className="text-sm font-semibold text-[#76ABAE]">{propertyTitle}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{message}</p>
                    </>
                )}

                {status === "refunded" && (
                    <>
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto">
                            <XCircle size={36} />
                        </div>
                        <h1 className="text-2xl font-black text-amber-600 dark:text-amber-400">Property Already Taken!</h1>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Target: {propertyTitle}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                            {message}
                        </p>
                    </>
                )}

                {(status === "error" || status === "invalid") && (
                    <>
                        <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                            <XCircle size={36} />
                        </div>
                        <h1 className="text-2xl font-black text-rose-500">Verification Error</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {message || "The checkout session could not be authenticated."}
                        </p>
                    </>
                )}

                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </button>
                    <button
                        onClick={() => router.push("/tenant/my-bookings")}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-all cursor-pointer"
                    >
                        <ArrowRight size={14} /> Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}