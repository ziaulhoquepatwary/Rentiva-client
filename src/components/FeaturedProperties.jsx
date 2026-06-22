import React from "react";
import PropertyCard from "./PropertyCard";

// Demo data simulating both String and Array for images parameter
const demoProperties = [
    {
        id: "prop-1",
        title: "Modern Luxury Apartment",
        location: "Gulshan-2, Dhaka",
        propertyType: "Apartment",
        rent: 45000,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560185127-6a2806647f81?auto=format&fit=crop&w=800&q=80"
        ] // Array Structure
    },
    {
        id: "prop-2",
        title: "Cozy Studio near University",
        location: "Dhanmondi, Dhaka",
        propertyType: "Studio",
        rent: 18000,
        images: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" // String Structure
    },
    {
        id: "prop-3",
        title: "Premium Family Villa",
        location: "Uttara Sector 4, Dhaka",
        propertyType: "Villa",
        rent: 95000,
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: "prop-4",
        title: "Elegant Duplex House",
        location: "Banani, Dhaka",
        propertyType: "House",
        rent: 65000,
        images: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop-5",
        title: "Minimalist Executive Suite",
        location: "Bashundhara R/A, Dhaka",
        propertyType: "Apartment",
        rent: 28000,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
        ]
    },
    {
        id: "prop-6",
        title: "Compact Urban Penthouse",
        location: "Mirpur DOHS, Dhaka",
        propertyType: "Apartment",
        rent: 35000,
        images: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    }
];

export default function FeaturedProperties() {
    return (
        <section className="w-full bg-white dark:bg-[#1B3C53] py-16 md:py-24 text-[#1B3C53] dark:text-[#EEEEEE] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#76ABAE]">
                            Accommodations
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-1 text-[#1B3C53] dark:text-white">
                            Featured Properties
                        </h2>
                    </div>
                    <p className="text-sm font-normal text-[#1B3C53]/70 dark:text-[#EEEEEE]/70 max-w-md">
                        Explore our most popular and highly verified listings available for reservation right now.
                    </p>
                </div>

                {/* 3-Column Responsive Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {demoProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

            </div>
        </section>
    );
}