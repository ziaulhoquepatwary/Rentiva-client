"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Tenant",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Finding an apartment as a single mother was daunting until I used Rentiva. The verification process gave me peace of mind, and paying the reservation fee online was incredibly smooth.",
    },
    {
        id: 2,
        name: "David Miller",
        role: "Property Owner",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "Rentiva completely automated my workflow. I can manage listings, filter tenants, and collect payouts securely without any back-and-forth hassle. Highly recommended for landlords!",
    },
    {
        id: 3,
        name: "Elena Rostova",
        role: "Tenant",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        comment: "The UI is exceptionally clean. I love how transparent the pricing is—no hidden booking charges. Found a beautiful studio close to my campus within a day.",
    },
    {
        id: 4,
        name: "Marcus Thompson",
        role: "Property Owner",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        comment: "The role-based dashboard is brilliant. The moderation team approved my villa listing within hours, and the automated booking workflow is flawlessly handled.",
    }
];

function Reviews() {
    const duplicatedReviews = [...reviews, ...reviews];


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
            <div className="flex w-full overflow-hidden relative mask-image-linear">
                {/* Subtle Gradient Overlays for smooth edges */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-[#1B3C53] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-[#1B3C53] to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex gap-6 pr-6 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity,
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {duplicatedReviews.map((review, index) => (
                        <div
                            key={`${review.id}-${index}`}
                            className="w-[350px] md:w-[400px] shrink-0 bg-gray-50 dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B]/30 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:border-[#76ABAE] dark:hover:border-[#76ABAE]"
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
                                <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#1B3C53] dark:text-white">
                                        {review.name}
                                    </h4>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#76ABAE]">
                                        {review.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Reviews