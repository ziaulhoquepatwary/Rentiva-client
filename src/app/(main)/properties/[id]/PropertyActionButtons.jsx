"use client";
import React, { useState } from "react";
import { Heart, CalendarCheck, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function PropertyActionButtons({ property }) {
    const [isSaved, setIsSaved] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);

    const handleToggleFavorite = async () => {
        setIsSaved((prev) => !prev);
    };

    const handleTriggerBooking = async () => {
        setBookingLoading(true);
        try {
            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: property._id,
                    title: property.title,
                    rent: property.rent,
                    rentType: property.rentType,
                    image: property.images?.[0] || "",
                    durationType: property.rentType,  // rentType go like "Yearly", 'Monthly', 'Weekly', 'Daily'
                }),
            });

            const data = await response.json();

            if (data.url) {
                // Redirecting to Stripe checkout page
                window.location.href = data.url;
            } else {
                setBookingLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Booking Failed",
                    text: data.error || "Something went wrong creating checkout session.",
                    confirmButtonColor: "#1B3C53",
                });
            }
        } catch (error) {
            console.error("Booking submission failure:", error);
            setBookingLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to initiate booking. Please try again later.",
                confirmButtonColor: "#1B3C53",
            });
        }
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handleTriggerBooking}
                disabled={bookingLoading}
                className="w-full bg-[#1B3C53] hover:bg-[#254f6d] dark:bg-[#76ABAE] dark:hover:bg-[#629295] text-white dark:text-[#1B3C53] font-bold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 cursor-pointer shadow-md hover:shadow-lg"
            >
                {bookingLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <CalendarCheck size={18} />
                )}
                <span>{bookingLoading ? "Redirecting to Stripe..." : "Book Property Now"}</span>
            </button>

            <button
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-3.5 px-4 rounded-xl text-sm transition-all border flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm cursor-pointer ${isSaved
                    ? "bg-rose-500/10 border-rose-500 text-rose-500 hover:bg-rose-500/20"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
            >
                <Heart size={18} className={isSaved ? "fill-rose-500 text-rose-500" : ""} />
                <span>{isSaved ? "Saved to Favorites" : "Add to Favorites"}</span>
            </button>
        </div>
    );
}