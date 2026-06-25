"use client";

import { useState, useEffect } from 'react';
import { Bath, Bed, CheckCircle, MapPin, Maximize2, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPropertyDetail } from '@/lib/actions/property';
import PropertyActionButtons from './PropertyActionButtons';
import PropertyReviews from './PropertyReviews';

function PropertyDetailsContent({ id }) {
    // State to hold the fetched data and loading status
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetching the data based on the ID
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getPropertyDetail(id);
            setResponseData(data);
            setLoading(false);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    // Loading State UI
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
                <p className="text-lg font-semibold text-slate-500">Loading property details...</p>
            </div>
        );
    }

    // Error or Not Found State UI
    if (!responseData || !responseData.success || !responseData.data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a]">
                <p className="text-lg font-semibold text-slate-500">Property not found or server error.</p>
            </div>
        );
    }

    const { property, ownerName } = responseData.data;
    const propertyImages = property?.images || [];

    // Carousel Handlers
    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] py-5 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider bg-[#76ABAE]/10 text-[#76ABAE] px-3 py-1 rounded-full">
                            {property.propertyType}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full">
                            Verified Listing
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {property.title}
                    </h1>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin size={16} className="text-[#76ABAE]" />
                        <span>{property.location}</span>
                    </div>
                </div>

                {/* Single Image Carousel Slider */}
                {propertyImages.length > 0 && (
                    <div className="relative h-[350px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-lg bg-slate-900 group">
                        <img
                            src={propertyImages[currentImageIndex]}
                            alt={`Property Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-all duration-500"
                        />

                        {/* Navigation Buttons */}
                        {propertyImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-md transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-md transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Image Counter Indicator */}
                                <div className="absolute bottom-4 right-4 bg-slate-900/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                    {currentImageIndex + 1} / {propertyImages.length}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Split View Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Side: Property Core Information */}
                    <div className="lg:col-span-2 space-y-8 bg-white dark:bg-[#294f69] p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-700/50">

                        {/* Key Specifications Grid */}
                        <div className="grid grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-700/50 pb-6 text-center">
                            <div className="flex flex-col items-center gap-1">
                                <Bed size={20} className="text-[#76ABAE]" />
                                <span className="text-sm font-bold text-slate-800 dark:text-white">{property.bedrooms} Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Bath size={20} className="text-[#76ABAE]" />
                                <span className="text-sm font-bold text-slate-800 dark:text-white">{property.bathrooms} Bathrooms</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Maximize2 size={18} className="text-[#76ABAE]" />
                                <span className="text-sm font-bold text-slate-800 dark:text-white">{property.propertySize} sqft</span>
                            </div>
                        </div>

                        {/* Main Narrative Description */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">About This Space</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {property.description}
                            </p>
                        </div>

                        {/* Features and Amenities List */}
                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Amenities Offered</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {property.amenities?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                        <CheckCircle size={14} className="text-emerald-500" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Premium Features */}
                        {property.extraFeatures && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/50 space-y-1">
                                <h4 className="text-xs font-bold uppercase tracking-wide text-[#76ABAE]">Special Highlights</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                                    {property.extraFeatures}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Sticky Widget */}
                    <div className="space-y-6 lg:sticky lg:top-6">
                        <div className="bg-white dark:bg-[#294f69] p-6 rounded-sm border border-slate-200 dark:border-slate-700/50 space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Price Structure</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-extrabold text-[#76ABAE]">${property.rent}</span>
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ {property.rentType}</span>
                                </div>
                            </div>

                            {/* Action Buttons Component */}
                            <PropertyActionButtons propertyId={property._id} />

                            <div className="h-px bg-slate-100 dark:bg-slate-700/50 w-full" />

                            {/* Host Identity Card */}
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">Listed Professionally By</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">{ownerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Reviews Component */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700/50">
                    <PropertyReviews propertyId={property._id} />
                </div>

            </div>
        </main>
    );
}

export default PropertyDetailsContent;