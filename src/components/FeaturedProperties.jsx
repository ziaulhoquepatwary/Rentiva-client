import { MoveRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import Link from 'next/link';
import { getAllPropertiesAction } from "@/lib/actions/property";


async function FeaturedProperties() {
    const res = await getAllPropertiesAction({
        limit: 6,
    });

    const properties = res?.data || [];


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
                    <Link href="/properties" className="text-sm font-normal text-[#1B3C53]/70 dark:text-[#EEEEEE]/70 max-w-md flex flex-row items-center gap-2 underline">
                        see more <MoveRight />
                    </Link>
                </div>

                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center text-gray-500">
                        No properties found.
                    </div>
                )}

            </div>
        </section>
    );
}

export default FeaturedProperties;