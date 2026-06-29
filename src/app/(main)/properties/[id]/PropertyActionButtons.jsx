"use client";

import React, { useEffect, useState } from "react";
import { Heart, CalendarCheck, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { toggleFavoriteApi } from "@/lib/actions/favorite";

export default function PropertyActionButtons({ property, isSavedFromBackend }) {
    const [isSaved, setIsSaved] = useState(isSavedFromBackend || false);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [favLoading, setFavLoading] = useState(false);

    useEffect(() => {
        setIsSaved(isSavedFromBackend);
    }, [isSavedFromBackend]);

    const handleToggleFavorite = async () => {
        if (favLoading) return;
        setFavLoading(true);

        const targetPropertyId = property?._id || property?.id;

        try {
            const response = await toggleFavoriteApi(targetPropertyId);
            if (response.success) {
                setIsSaved(response.isSaved);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Authentication Failed",
                text: "Please login to manage your saved properties.",
                confirmButtonColor: "#1B3C53",
            });
        } finally {
            setFavLoading(false);
        }
    };

    const handleTriggerBooking = async () => {
        setBookingLoading(true);
        const targetPropertyId = property?._id || property?.id;
        try {
            const response = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: targetPropertyId,
                    title: property?.title,
                    rent: property?.rent,
                    rentType: property?.rentType,
                    image: property?.images?.[0] || "",
                    durationType: property?.rentType,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setBookingLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Booking Failed",
                    text: data.error || "Unable to initialize checkout session.",
                    confirmButtonColor: "#1B3C53",
                });
            }
        } catch (error) {
            console.error(error);
            setBookingLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to initiate booking process. Please try again later.",
                confirmButtonColor: "#1B3C53",
            });
        }
    };

    return (
        <div className="space-y-3">
            <button
                onClick={handleTriggerBooking}
                disabled={bookingLoading}
                className="w-full bg-[#1B3C53] hover:bg-[#234d6b] dark:bg-[#76ABAE] dark:hover:bg-[#649295] text-white dark:text-[#1B3C53] font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md hover:shadow-lg"
            >
                {bookingLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <CalendarCheck size={16} />
                )}
                <span>{bookingLoading ? "Redirecting..." : "Book Property Now"}</span>
            </button>

            <button
                onClick={handleToggleFavorite}
                disabled={favLoading}
                className={`w-full font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all border flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm cursor-pointer disabled:opacity-70 ${isSaved
                        ? "bg-rose-500/10 border-rose-500 text-rose-500 hover:bg-rose-500/20"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
            >
                {favLoading ? (
                    <Loader2 size={16} className="animate-spin text-rose-500" />
                ) : (
                    <Heart size={16} className={isSaved ? "fill-rose-500 text-rose-500" : ""} />
                )}
                <span>{isSaved ? "Saved" : "Save Listing"}</span>
            </button>
        </div>
    );
}