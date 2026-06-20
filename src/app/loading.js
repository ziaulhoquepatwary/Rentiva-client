export default function Loading() {
    return (
        <section className="min-h-screen bg-white dark:bg-[#1B3C53] flex items-center justify-center px-4 transition-colors duration-300">
            <div className="flex flex-col items-center">

                {/* Animated Logo Circle */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-24 w-24 rounded-full border-4 border-[#76ABAE]/20"></div>

                    <div className="absolute h-24 w-24 rounded-full border-4 border-transparent border-t-[#76ABAE] animate-spin"></div>

                    <div className="h-16 w-16 rounded-full bg-[#76ABAE]/10 backdrop-blur-md flex items-center justify-center border border-[#76ABAE]/20">
                        <span className="text-[#1B3C53] dark:text-[#EEEEEE] font-bold text-xl">
                            R
                        </span>
                    </div>
                </div>

                {/* Brand Name */}
                <h2 className="mt-6 text-3xl font-bold tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]">
                    RENTIVA
                </h2>

                {/* Loading Text */}
                <div className="flex gap-1 mt-3">
                    <span className="text-[#76ABAE] animate-bounce [animation-delay:-0.3s]">
                        ●
                    </span>
                    <span className="text-[#76ABAE] animate-bounce [animation-delay:-0.15s]">
                        ●
                    </span>
                    <span className="text-[#76ABAE] animate-bounce">
                        ●
                    </span>
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-[#EEEEEE]/70">
                    Loading amazing rentals...
                </p>
            </div>
        </section>
    );
}