import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#1B3C53] flex items-center justify-center px-4 transition-colors duration-300">

            {/* Floating Blurs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-[#76ABAE]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#76ABAE]/10 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 text-center max-w-2xl">

                {/* Animated 404 */}
                <h1 className="text-[120px] md:text-[180px] font-black leading-none text-[#76ABAE] animate-bounce">
                    404
                </h1>

                <h2 className="mt-2 text-3xl md:text-5xl font-bold text-[#1B3C53] dark:text-[#EEEEEE]">
                    Oops! Page Not Found
                </h2>

                <p className="mt-5 text-base md:text-lg text-gray-500 dark:text-[#EEEEEE]/70 max-w-xl mx-auto">
                    The page you're looking for doesn't exist, was moved,
                    or is temporarily unavailable.
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-[#76ABAE] text-white dark:text-[#1B3C53] font-semibold shadow-lg hover:scale-105 hover:opacity-90 transition-all duration-300"
                >
                    <Home size={18} />
                    Back Home
                </Link>

                {/* RENTIVA Branding */}
                <div className="mt-12">
                    <p className="text-sm tracking-[0.3em] uppercase text-gray-400 dark:text-[#EEEEEE]/50">
                        RENTIVA
                    </p>
                </div>
            </div>
        </section>
    );
}