"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import { getHomeTopReviewsApi } from "@/lib/actions/review";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeReviews = async () => {
            try {
                const response = await getHomeTopReviewsApi();
                if (response.success) {
                    setReviews(response.data || []);
                }
            } catch (error) {
                console.error("Failed to load home reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeReviews();
    }, []);

    const duplicatedReviews = [...reviews, ...reviews];

    if (loading) {
        return (
            <div className="w-full bg-white dark:bg-[#1B3C53] py-20 flex justify-center items-center text-slate-400">
                <Loader2 className="animate-spin mr-2 text-[#76ABAE]" size={24} />
                <span>Loading testimonials...</span>
            </div>
        );
    }

    if (reviews.length === 0) return null;

    return (
        <section className="w-full bg-white dark:bg-[#1B3C53] py-16 md:py-24 text-[#1B3C53] dark:text-[#EEEEEE] overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#76ABAE]">
                    Testimonials
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2 text-[#1B3C53] dark:text-white">
                    What Our Community Says
                </h2>
                <p className="text-sm md:text-base text-[#1B3C53]/70 dark:text-[#EEEEEE]/70 mt-3 max-w-xl mx-auto">
                    Real stories from verified tenants and property owners who found their perfect match through Rentiva.
                </p>
            </div>

            {/* Infinite Marquee Container */}
            <div className="flex w-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-[#1B3C53] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-[#1B3C53] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 pr-6 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: reviews.length > 3 ? reviews.length * 5 : 20,
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedReviews.map((review, index) => {
                        if (!review) return null;

                        return (
                            <div
                                key={`${review._id}-${index}`}
                                className="w-[350px] md:w-[400px] shrink-0 bg-gray-50 dark:bg-[#294f69]/30 border border-[#E2E8F0] dark:border-[#64748B]/30 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:border-[#76ABAE] dark:hover:border-[#76ABAE]"
                            >
                                {/* Quote Icon Overlay */}
                                <Quote className="absolute right-6 top-6 text-[#76ABAE]/10 dark:text-[#76ABAE]/5 w-12 h-12 pointer-events-none" />

                                {/* Star Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${i < review.rating
                                                    ? "fill-[#76ABAE] text-[#76ABAE]"
                                                    : "text-gray-300 dark:text-gray-600"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Comment Text */}
                                <p className="text-sm font-normal text-[#1B3C53]/80 dark:text-[#EEEEEE]/85 leading-relaxed flex-grow italic mb-6">
                                    "{review.comment}"
                                </p>

                                {/* User Profile Footer */}
                                <div className="flex items-center gap-4 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/20">
                                    <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 border border-slate-200 dark:border-slate-600">
                                        <img
                                            src={review.tenantImage || "/avatar-placeholder.png"}
                                            alt={review.tenantName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#1B3C53] dark:text-white">
                                            {review.tenantName}
                                        </h4>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#76ABAE]">
                                            Verified Tenant
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default Reviews;