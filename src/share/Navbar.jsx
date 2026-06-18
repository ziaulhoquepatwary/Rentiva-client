'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme, mounted } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isDarkMode = mounted ? theme === 'dark' : true;

    return (
        <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md bg-opacity-95
            ${isDarkMode
                ? 'bg-[#1B3C53] text-white border-slate-700/50'
                : 'bg-[#FFFFFF] text-slate-800 border-slate-200 shadow-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    <Link href="/" className="flex items-center gap-0.5 tracking-wider font-black text-2xl">
                        <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>
                            RENT
                        </span>
                        <span className="text-[#76ABAE]">
                            IVA
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Home
                        </Link>
                        <Link
                            href="/properties"
                            className="font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            All Properties
                        </Link>
                        {isLoggedIn && (
                            <Link
                                href="/dashboard"
                                className="font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-xl transition-colors duration-200 
                                ${isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'}`}
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
                        </button>

                        {!isLoggedIn ? (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className={`px-5 py-2.5 rounded-xl font-medium border transition-colors duration-200
                                        ${isDarkMode
                                            ? 'border-slate-600 hover:bg-slate-800/60'
                                            : 'border-slate-300 hover:bg-slate-100'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 rounded-xl font-medium bg-[#76ABAE] text-white transition-all duration-200 shadow-md hover:bg-[#659699] hover:shadow-lg active:scale-95"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer bg-[#76ABAE] border-2 border-white/20 shadow-sm hover:opacity-90 transition-opacity">
                                JD
                            </div>
                        )}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`md:hidden p-2 rounded-xl transition-colors duration-200
                                ${isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100'}`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t
                    ${isDarkMode ? 'border-slate-700/50 bg-[#1B3C53]' : 'border-slate-200 bg-[#FFFFFF]'}
                    ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
            >
                <div className="px-6 py-6 flex flex-col gap-4 text-base font-medium">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="py-2 px-3 rounded-lg transition-colors duration-200 hover:text-[#76ABAE]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/properties"
                        onClick={() => setIsOpen(false)}
                        className="py-2 px-3 rounded-lg transition-colors duration-200 hover:text-[#76ABAE]"
                    >
                        All Properties
                    </Link>
                    {isLoggedIn && (
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="py-2 px-3 rounded-lg transition-colors duration-200 hover:text-[#76ABAE]"
                        >
                            Dashboard
                        </Link>
                    )}

                    {!isLoggedIn && (
                        <div className={`flex flex-col gap-3 pt-4 border-t ${isDarkMode ? 'border-slate-700/50' : 'border-slate-200'}`}>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className={`py-2.5 text-center rounded-xl border font-medium transition-colors duration-200
                                    ${isDarkMode ? 'border-slate-600 hover:bg-slate-800/60' : 'border-slate-300 hover:bg-slate-100'}`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="py-2.5 text-center rounded-xl font-medium text-white bg-[#76ABAE] hover:bg-[#659699] transition-colors duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;