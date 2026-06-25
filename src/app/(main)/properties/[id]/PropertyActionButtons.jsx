"use client";
import React, { useState } from "react";
import { Heart, CalendarCheck, Loader2 } from "lucide-react";

export default function PropertyActionButtons({ propertyId }) {
    const [isSaved, setIsSaved] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    const handleToggleFavorite = async () => {
        // Toggle UI immediately, sync with database later
        setIsSaved((prev) => !prev);
    };

    const handleTriggerBooking = async () => {
        setBookingLoading(true);
        try {
            // Simulated API transaction wait
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Booking intent successfully registered!");
        } catch (error) {
            console.error("Booking submission failure:", error);
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            {/* Booking action button */}
            <button
                onClick={handleTriggerBooking}
                disabled={bookingLoading}
                className="w-full bg-[#1B3C53] hover:bg-[#1B3C53]/90 dark:bg-[#76ABAE] dark:hover:bg-[#76ABAE]/90 text-white dark:text-[#1B3C53] font-bold py-3 px-4 rounded-sm text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60"
            >
                {bookingLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <CalendarCheck size={16} />
                )}
                <span>{bookingLoading ? "Processing..." : "Reserve Property Now"}</span>
            </button>

            {/* Favorite toggle button */}
            <button
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-3 px-4 rounded-sm text-sm transition-all border flex items-center justify-center gap-2 active:scale-[0.99] ${isSaved
                    ? "bg-rose-500/10 border-rose-500 text-rose-500 hover:bg-rose-500/20"
                    : "bg-[#365d77] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
            >
                <Heart size={16} className={isSaved ? "fill-rose-500" : ""} />
                <span>{isSaved ? "Saved to Favorites" : "Add to Favorites"}</span>
            </button>
        </div>
    );
}