"use client";

import { useTheme } from "@/context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi";

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-[#1c4a36] hover:bg-[#e4f5ee] dark:text-[#e4f5ee] dark:hover:bg-[#173f2e] transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <HiSun className="h-5 w-5" />
            ) : (
                <HiMoon className="h-5 w-5" />
            )}
        </button>
    );
}
