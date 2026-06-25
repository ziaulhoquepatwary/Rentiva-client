"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { Loader2, SlidersHorizontal, RotateCcw, Search } from "lucide-react";
import { getAllPropertiesAction } from "@/lib/actions/property";

export default function PropertyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Extracting current URL queries
    const locationQuery = searchParams.get("location") || "";
    const typeQuery = searchParams.get("propertyType") || "";
    const minPriceQuery = searchParams.get("minPrice") || "";
    const maxPriceQuery = searchParams.get("maxPrice") || "";
    const sortByQuery = searchParams.get("sortBy") || "newest";
    const pageQuery = searchParams.get("page") || "1";

    // Local states for inputs (They won't trigger API calls immediately)
    const [localLocation, setLocalLocation] = useState(locationQuery);
    const [localType, setLocalType] = useState(typeQuery);
    const [localMinPrice, setLocalMinPrice] = useState(minPriceQuery);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPriceQuery);

    // API response states
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState(null);

    // Sync local input states if URL changes externally (e.g., from Banner Search)
    useEffect(() => {
        setLocalLocation(locationQuery);
        setLocalType(typeQuery);
        setLocalMinPrice(minPriceQuery);
        setLocalMaxPrice(maxPriceQuery);
    }, [locationQuery, typeQuery, minPriceQuery, maxPriceQuery]);

    // Fetch data only when URL parameters change
    useEffect(() => {
        const fetchFilteredProperties = async () => {
            setLoading(true);
            try {
                const data = await getAllPropertiesAction({
                    location: locationQuery,
                    propertyType: typeQuery,
                    minPrice: minPriceQuery,
                    maxPrice: maxPriceQuery,
                    sortBy: sortByQuery,
                    page: pageQuery,
                    limit: 12,
                });
                if (data?.success) {
                    setProperties(data.data);
                    setMeta(data.meta);
                }
            } catch (error) {
                console.error("Failed to load properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredProperties();
    }, [locationQuery, typeQuery, minPriceQuery, maxPriceQuery, sortByQuery, pageQuery]);

    // Apply all local filters to the URL at once
    const handleApplyFilters = (e) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (localLocation) params.set("location", localLocation); else params.delete("location");
        if (localType) params.set("propertyType", localType); else params.delete("propertyType");
        if (localMinPrice) params.set("minPrice", localMinPrice); else params.delete("minPrice");
        if (localMaxPrice) params.set("maxPrice", localMaxPrice); else params.delete("maxPrice");

        params.set("page", "1"); // Reset to page 1 on new filter application
        router.push(`/properties?${params.toString()}`);
    };

    // Keep sorting real-time as requested
    const handleSortChange = (newSortValue) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newSortValue) {
            params.set("sortBy", newSortValue);
        } else {
            params.delete("sortBy");
        }
        router.push(`/properties?${params.toString()}`);
    };

    // Reset all parameters to initial state
    const handleResetFilters = () => {
        setLocalLocation("");
        setLocalType("");
        setLocalMinPrice("");
        setLocalMaxPrice("");
        router.push("/properties"); // Navigates to clean URL without any queries
    };

    // Helper for pagination clicks
    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`/properties?${params.toString()}`);
    };

    return (
        <section className="min-h-screen bg-slate-50 dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Filter & Search Panel */}
                <div className="bg-white dark:bg-[#264961] rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-md p-6 space-y-6">
                    <form onSubmit={handleApplyFilters} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">

                        {/* Location Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                                Location
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Enter city or area..."
                                    value={localLocation}
                                    onChange={(e) => setLocalLocation(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all"
                                />
                            </div>
                        </div>

                        {/* Extended Property Type Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                                Property Type
                            </label>
                            <select
                                value={localType}
                                onChange={(e) => setLocalType(e.target.value)}
                                className="w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all"
                            >
                                <option value="">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="cottage">Cottage</option>
                                <option value="studio">Studio</option>
                                <option value="duplex">Duplex</option>
                                <option value="penthouse">Penthouse</option>
                                <option value="commercial">Commercial Space</option>
                                <option value="office">Office Room</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Custom Price Range Wrapper */}
                        <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                                Price Range
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={localMinPrice}
                                    onChange={(e) => setLocalMinPrice(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={localMaxPrice}
                                    onChange={(e) => setLocalMaxPrice(e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all"
                                />
                            </div>
                        </div>

                        {/* Action Buttons: Apply & Reset */}
                        <div className="flex items-center gap-3 w-full sm:col-span-2 lg:col-span-1">
                            <button
                                type="submit"
                                className="flex-1 bg-[#1B3C53] hover:bg-[#1B3C53]/90 dark:bg-[#76ABAE] dark:hover:bg-[#76ABAE]/90 text-white dark:text-[#1B3C53] font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                            >
                                Apply Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                title="Reset all filters"
                                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400 active:scale-95"
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>
                    </form>

                    {/* Divider line separating form and sorting */}
                    <div className="h-px bg-slate-100 dark:bg-slate-700/50 w-full" />

                    {/* Real-time Sorting Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                            {meta?.total ? `Showing ${properties.length} of ${meta.total} listings found` : "Searching listings..."}
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <SlidersHorizontal size={14} className="text-[#76ABAE]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mr-1">Sort By:</span>
                            <select
                                value={sortByQuery}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="px-3 py-1.5 text-xs font-semibold rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 cursor-pointer focus:outline-none focus:border-[#76ABAE] text-slate-700 dark:text-slate-200"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Property Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Loader2 className="animate-spin text-[#76ABAE]" size={44} />
                        <p className="text-sm font-medium tracking-widest text-slate-400 uppercase">Fetching Matches...</p>
                    </div>
                ) : properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/20">
                        <p className="text-base font-bold text-slate-400 dark:text-slate-500">No properties found matching your criteria.</p>
                        <button onClick={handleResetFilters} className="mt-3 text-xs font-bold text-[#76ABAE] hover:underline">Clear Filters & View All</button>
                    </div>
                )}

                {/* Pagination Controls */}
                {meta && meta.totalPage > 1 && (
                    <div className="flex justify-center items-center gap-3 pt-8">
                        <button
                            disabled={meta.page === 1}
                            onClick={() => handlePageChange(meta.page - 1)}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all shadow-sm"
                        >
                            Previous
                        </button>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                            Page {meta.page} of {meta.totalPage}
                        </span>
                        <button
                            disabled={meta.page === meta.totalPage}
                            onClick={() => handlePageChange(meta.page + 1)}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}