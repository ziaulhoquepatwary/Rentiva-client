"use client";
import React, { useState } from "react";

export default function SearchBar() {
    const [searchData, setSearchData] = useState({
        location: "",
        propertyType: "",
        minPrice: "",
        maxPrice: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchData);
    };

    return (
        <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl rounded-2xl p-6 shadow-xl border bg-gray-200 dark:bg-[#1B3C53] border-[#E2E8F0] dark:border-[#64748B] transition-colors duration-300"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
        {/* Location Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80">
            Location
          </label>
          <input
            type="text"
            placeholder="Where are you looking?"
            value={searchData.location}
            onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border-[#E2E8F0] dark:border-[#64748B] focus:outline-none focus:border-[#76ABAE] transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80">
            Property Type
          </label>
          <select
            value={searchData.propertyType}
            onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border-[#E2E8F0] dark:border-[#64748B] focus:outline-none focus:border-[#76ABAE] transition-colors cursor-pointer"
          >
            <option value="">Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        {/* Price Range Inputs */}
        <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={searchData.minPrice}
              onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border-[#E2E8F0] dark:border-[#64748B] focus:outline-none focus:border-[#76ABAE] transition-colors placeholder:text-gray-400"
            />
            <input
              type="number"
              placeholder="Max"
              value={searchData.maxPrice}
              onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border text-sm bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border-[#E2E8F0] dark:border-[#64748B] focus:outline-none focus:border-[#76ABAE] transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="w-full bg-[#1B3C53] hover:bg-[#1B3C53]/90 dark:bg-[#76ABAE] dark:hover:bg-[#76ABAE]/90 text-[#EEEEEE] dark:text-[#1B3C53] font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:scale-[1.01]"
          >
            Search Properties
          </button>
        </div>

      </div>
    </form>
    );
}