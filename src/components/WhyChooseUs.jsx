import React from "react";
import Link from "next/link";

export default function WhyChooseUs() {
    return (
        <section className="w-full bg-gray-50 dark:bg-[#1B3C53] py-16 md:py-24 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* Left Content Column */}
                <div className="col-span-1 lg:col-span-6 bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] p-6 md:p-12 h-full flex flex-col justify-center space-y-6 transition-colors duration-300">

                    <span className="text-xs font-bold uppercase tracking-widest text-[#76ABAE]">
                        Why Choose Rentiva
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight max-w-lg">
                        Nature is a haunted house, but art is a house that tries to be haunted.
                    </h2>

                    <p className="text-sm md:text-base font-normal text-[#1B3C53]/80 dark:text-[#EEEEEE]/80 leading-relaxed max-w-xl">
                        It had felt like a never ending journey, before I finally settled down with my family in a place, which we can proudly call "home". As a single mother and a teacher, I was looking for a secure, budget-friendly apartment close to my workplace. After a few months of fruitless search, a colleague recommended Rentiva. Within less than an hour, I found verified listings, transparent pricing, and safely booked our new cozy nest online.
                    </p>

                    <div className="pt-2">
                        <Link
                            href="/properties"
                            className="inline-block bg-[#1B3C53] hover:bg-[#1B3C53]/90 dark:bg-[#76ABAE] dark:hover:bg-[#76ABAE]/90 text-[#EEEEEE] dark:text-[#1B3C53] font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-200 active:scale-95 text-sm uppercase tracking-wider"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>

                {/* Right Images Column (Asymmetric Grid) */}
                <div className="col-span-1 lg:col-span-6 grid grid-cols-2 gap-4 items-center pt-8 lg:pt-0">

                    {/* First Image - Positioned slightly higher */}
                    <div className="transform -translate-y-4 md:-translate-y-6 transition-transform duration-300">
                        <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#64748B]/30 shadow-lg aspect-[3/4]">
                            <img
                                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
                                alt="Modern living room"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Second Image - Positioned slightly lower */}
                    <div className="transform translate-y-4 md:translate-y-6 transition-transform duration-300">
                        <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#64748B]/30 shadow-lg aspect-[3/4]">
                            <img
                                src="https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80"
                                alt="Happy family in new home"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}