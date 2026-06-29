"use client";

import React, { useState } from "react";
import { X, Check, ChevronLeft, ChevronRight, User } from "lucide-react";

export default function PropertyDetailsModal({ property, onClose, onStatusUpdate }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const propertyImages = property?.images || [];
    const owner = property?.ownerInfo || {};

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1B3C53] rounded-2xl w-full max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 dark:border-slate-700 scrollbar-none">

                <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            {property.propertyType}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{property.title}</h3>
                        <p className="text-xs text-slate-400">{property.location}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {propertyImages.length > 0 && (
                    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full rounded-xl overflow-hidden shadow-md bg-slate-900 group mb-6">
                        <img
                            src={propertyImages[currentImageIndex]}
                            alt={`Property Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-500"
                        />

                        {propertyImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-md transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                <div className="absolute bottom-4 right-4 bg-slate-900/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                    {currentImageIndex + 1} / {propertyImages.length}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-100 dark:border-slate-700/60 pb-6 mb-4 text-left">
                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-slate-400 text-xs mb-3">Specifications</h4>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-[13px]">
                            <li>💰 <strong className="text-slate-700 dark:text-white">Rent Price:</strong> ${property.rent} / {property.rentType}</li>
                            <li>🛏️ <strong className="text-slate-700 dark:text-white">Bedrooms:</strong> {property.bedrooms} Beds</li>
                            <li>🛁 <strong className="text-slate-700 dark:text-white">Bathrooms:</strong> {property.bathrooms} Baths</li>
                            <li>📐 <strong className="text-slate-700 dark:text-white">Property Size:</strong> {property.propertySize} sqft</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-slate-400 text-xs mb-3">Owner Contact Hierarchy</h4>
                        <div className="flex items-center sm:items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 shadow-sm">
                                {owner.image ? (
                                    <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={24} className="text-slate-500" />
                                )}
                            </div>
                            <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[13px] flex-1">
                                <li>👤 <strong className="text-slate-700 dark:text-white">Name:</strong> {owner.name || "N/A"}</li>
                                <li>✉️ <strong className="text-slate-700 dark:text-white">Email:</strong> {owner.email || "N/A"}</li>
                                <li>📞 <strong className="text-slate-700 dark:text-white">Phone:</strong> {owner.phone || "N/A"}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mb-4 text-left">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Description</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {property.amenities?.map((amenity, index) => (
                            <span key={index} className="text-[11px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">{amenity}</span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <button onClick={() => onStatusUpdate(property._id, "Rejected")} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors cursor-pointer">
                        <X size={14} /> Reject Listing
                    </button>
                    <button onClick={() => onStatusUpdate(property._id, "Approved")} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#76ABAE] text-white rounded-xl hover:bg-[#639396] transition-colors cursor-pointer">
                        <Check size={14} /> Approve & Publish
                    </button>
                </div>
            </div>
        </div>
    );
}