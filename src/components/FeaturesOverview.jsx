"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, ShieldCheck, CreditCard, Search, UserCheck, Star } from "lucide-react";

export default function FeaturesOverview() {
    const features = [
        {
            icon: <Search className="w-6 h-6 transition-colors duration-300" />,
            title: "Smart Discovery",
            description: "Advanced filters to find your perfect rental property tailored to your budget and location preferences."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 transition-colors duration-300" />,
            title: "Secure Marketplace",
            description: "Verified listings and secure user authentication to ensure absolute peace of mind for both sides."
        },
        {
            icon: <CreditCard className="w-6 h-6 transition-colors duration-300" />,
            title: "Instant Booking",
            description: "Pay reservation fees securely online to lock in your desired property instantly without any hassle."
        },
        {
            icon: <UserCheck className="w-6 h-6 transition-colors duration-300" />,
            title: "Role-Based Control",
            description: "Dedicated, intuitive dashboards designed specifically for both tenants and property owners."
        },
        {
            icon: <Home className="w-6 h-6 transition-colors duration-300" />,
            title: "Easy Management",
            description: "Property owners can list, update, and track bookings seamlessly through a robust control panel."
        },
        {
            icon: <Star className="w-6 h-6 transition-colors duration-300" />,
            title: "Transparent Reviews",
            description: "A reliable review and rating system helping you make informed decisions based on real experiences."
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section className="w-full bg-white dark:bg-[#1B3C53] border-b border-[#E2E8F0] dark:border-[#64748B] text-[#1B3C53] dark:text-[#EEEEEE] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-black tracking-tight text-[#1B3C53] dark:text-white"
                    >
                        A Transparent & Secure Rental Experience
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-sm md:text-base font-normal text-[#1B3C53]/70 dark:text-[#EEEEEE]/70 leading-relaxed"
                    >
                        Discover how our platform simplifies the rental journey, connecting property owners and tenants through an automated and reliable ecosystem.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="p-8 rounded-2xl bg-white dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] hover:border-[#76ABAE] dark:hover:border-[#76ABAE] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start space-y-4 group"
                        >
                            {/* Icon Container */}
                            <div className="p-3 rounded-xl bg-[#76ABAE]/10 dark:bg-[#76ABAE]/5 text-[#76ABAE] group-hover:bg-[#76ABAE] group-hover:text-white transition-colors duration-300">
                                {feature.icon}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold tracking-tight text-[#1B3C53] dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-sm font-normal text-[#1B3C53]/80 dark:text-[#EEEEEE]/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}