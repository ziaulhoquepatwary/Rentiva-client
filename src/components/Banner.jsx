"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const bannerImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
];

function Banner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);


    return (
        <section className="relative w-full h-182.5 flex items-center justify-center overflow-hidden">

            {/* Background Image Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        style={{ backgroundImage: `url(${bannerImages[currentImageIndex]})` }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    />
                </AnimatePresence>

                {/* Dynamic Theme Overlay */}
                <div className="absolute inset-0 bg-[#FFFFFF]/40 dark:bg-[#1B3C53]/85 backdrop-blur-[1px] transition-colors duration-500" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight mb-4 text-[#1B3C53] dark:text-[#EEEEEE] transition-colors duration-500"
                >
                    Discover Your Perfect <span className="text-[#76ABAE]">Rental Space</span> Securely
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-base md:text-lg max-w-2xl mb-10 font-normal text-[#1B3C53]/80 dark:text-[#EEEEEE]/70 transition-colors duration-500"
                >
                    Connect directly with verified property owners. Browse premium listings, schedule virtual viewings, and reserve your next home with transparent online payments.
                </motion.p>

                {/* Reusable Search Bar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full flex justify-center"
                >
                    <SearchBar />
                </motion.div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {bannerImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                ? "w-8 bg-[#76ABAE]"
                                : "w-2 bg-[#1B3C53]/30 dark:bg-[#EEEEEE]/30"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default Banner