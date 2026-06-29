"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, MapPin, User, ChevronLeft, ChevronRight, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { getPropertyDetail } from '@/lib/actions/property';
import PropertyActionButtons from './PropertyActionButtons';
import PropertyReviews from './PropertyReviews';
import Loading from '@/app/loading';

function PropertyDetailsContent({ id }) {
    const router = useRouter();
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    if (loading) {
        return (
            <Loading />
        );
    }

    if (!responseData || !responseData.success || !responseData.data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#1B3C53] gap-4">
                <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">Property details could not be retrieved.</p>
                <button onClick={() => router.back()} className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-800 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    const { property, ownerName, isSaved } = responseData.data;
    const propertyImages = property?.images || [];

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? propertyImages.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === propertyImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <main className="min-h-screen bg-slate-50/50 dark:bg-[#1B3C53] text-slate-800 dark:text-[#EEEEEE] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 self-start px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#294f69] text-slate-600 dark:text-slate-300 rounded-xl shadow-sm hover:shadow border border-slate-200/60 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back to Explore
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest bg-[#76ABAE]/10 text-[#76ABAE] px-3 py-1 rounded-lg border border-[#76ABAE]/20">
                            {property.propertyType}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                            <Sparkles size={12} /> Verified
                        </span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                        {property.title}
                    </h1>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <MapPin size={16} className="text-[#76ABAE]" />
                        <span>{property.location}</span>
                    </div>
                </div>

                {propertyImages.length > 0 && (
                    <div className="relative h-[300px] sm:h-[400px] md:h-[520px] w-full rounded-2xl overflow-hidden shadow-xl bg-slate-900 group border border-slate-200 dark:border-slate-700">
                        <img
                            src={propertyImages[currentImageIndex]}
                            alt={`Property Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                        {propertyImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-800 shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-800 shadow-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer hover:scale-105 active:scale-95"
                                >
                                    <ChevronRight size={22} />
                                </button>

                                <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider backdrop-blur-md border border-white/10 shadow-md">
                                    {currentImageIndex + 1} / {propertyImages.length}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-[#294f69] p-6 sm:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm space-y-8">

                            <div className="grid grid-cols-3 gap-4 border-b border-slate-100 dark:border-slate-700/40 pb-6">
                                <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <span className="text-3xl">🛌</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Beds</span>
                                    <span className="text-base font-black text-slate-800 dark:text-white mt-0.5">{property.bedrooms} Units</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <span className="text-3xl">🛁</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Baths</span>
                                    <span className="text-base font-black text-slate-800 dark:text-white mt-0.5">{property.bathrooms} Units</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <span className="text-3xl">📐</span>
                                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Size</span>
                                    <span className="text-base font-black text-slate-800 dark:text-white mt-0.5">{property.propertySize} ft²</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">About This Space</h3>
                                <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                    {property.description}
                                </p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700/40">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Amenities Offered</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                                    {property.amenities?.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-800/30 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-700/20">
                                            <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                                            <span className="truncate">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {property.extraFeatures && (
                                <div className="p-4 bg-gradient-to-r from-amber-500/5 to-transparent dark:from-amber-500/10 rounded-xl border border-amber-500/10 space-y-1">
                                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Special Highlights</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
                                        {property.extraFeatures}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-8">
                        <div className="bg-white dark:bg-[#294f69] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-md space-y-6">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Price Structure</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-black text-[#76ABAE] tracking-tight">${property.rent}</span>
                                    <span className="text-xs font-semibold text-slate-400">/ {property.rentType}</span>
                                </div>
                            </div>

                            <PropertyActionButtons property={property} isSavedFromBackend={isSaved} />

                            <div className="h-px bg-slate-100 dark:bg-slate-700/40 w-full" />

                            <div className="flex items-center gap-3.5 bg-slate-50/50 dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100 dark:border-slate-700/20">
                                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl text-slate-500 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <User size={20} className="text-[#76ABAE]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Listed Professionally By</p>
                                    <p className="text-sm font-black text-slate-800 dark:text-white truncate">{ownerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <PropertyReviews propertyId={property._id} />
                </div>

            </div>
        </main>
    );
}

export default PropertyDetailsContent;