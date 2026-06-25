import React from "react";
import { MapPin, Home, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PropertyCard({ property }) {
    const { _id, title, location, propertyType, rent, images } = property;

    // Handles both single string URL and array of image URLs safely
    const displayImage = Array.isArray(images)
        ? (images[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6")
        : (images || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6");

    return (
        <div className="group bg-white dark:bg-[#224964] border border-[#E2E8F0] dark:border-[#64748B]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img
                    src={displayImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Property Type Badge */}
                <div className="absolute top-4 left-4 bg-[#1B3C53]/90 dark:bg-[#76ABAE] text-white dark:text-[#1B3C53] backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <Home size={12} />
                    {propertyType}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                    {/* Rent / Price */}
                    <div className="flex items-baseline text-[#76ABAE] font-black text-xl">
                        <DollarSign size={18} className="translate-y-[1px]" />
                        <span>{rent.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-[#1B3C53]/60 dark:text-[#EEEEEE]/50 ml-1 uppercase tracking-wider">
                            / Month
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg text-[#1B3C53] dark:text-white line-clamp-1 group-hover:text-[#76ABAE] transition-colors duration-200">
                        {title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#1B3C53]/70 dark:text-[#EEEEEE]/70">
                        <MapPin size={16} className="text-gray-400 dark:text-gray-500 shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                </div>

                {/* View Details Action Button */}
                <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#64748B]/20">
                    <Link
                        href={`/properties/${_id}`}
                        className="w-full py-2.5 rounded-xl border border-[#1B3C53] dark:border-[#76ABAE] text-[#1B3C53] dark:text-[#76ABAE] hover:bg-[#1B3C53] hover:text-white dark:hover:bg-[#76ABAE] dark:hover:text-[#1B3C53] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
                    >
                        <span>View Details</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}