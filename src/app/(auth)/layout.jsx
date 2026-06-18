"use client";

import ThemeToggle from "@/components/ThemeToggle";


function AuthLayout({ children }) {
    return (
        <div className="auth-container min-h-screen bg-white dark:bg-[#0f291e] transition-colors duration-300">
            {/* Theme Toggle - Top Right */}
            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
            </div>
            {children}
        </div>
    )
}

export default AuthLayout