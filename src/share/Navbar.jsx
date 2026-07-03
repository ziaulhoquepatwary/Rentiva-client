'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { authClient } from '@/lib/auth-client';
import ThemeToggle from '@/components/ThemeToggle';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const { theme, toggleTheme, mounted } = useTheme();
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();

    console.log(session);


    const isDarkMode = mounted ? theme === 'dark' : true;

    const user = session?.user;
    const role = user?.role;

    const showDashboard = !!role;

    const dashboardHref = role === 'admin'
        ? '/admin'
        : role === 'owner'
            ? '/owner'
            : '/tenant';

    const isActive = (path) => pathname === path;

    return (
        <nav className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md bg-opacity-95
            ${isDarkMode
                ? 'bg-[#1B3C53] text-white border-slate-700/50'
                : 'bg-[#FFFFFF] text-slate-800 border-slate-200 shadow-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-0.5 tracking-wider font-black text-2xl">
                        <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>RENT</span>
                        <span className="text-[#76ABAE]">IVA</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE]
                                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300
                                ${isActive('/') ? 'text-[#76ABAE] after:w-full' : 'after:w-0 hover:after:w-full'}`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/properties"
                            className={`font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE]
                                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300
                                ${isActive('/properties') ? 'text-[#76ABAE] after:w-full' : 'after:w-0 hover:after:w-full'}`}
                        >
                            All Properties
                        </Link>

                        {showDashboard && (
                            <Link
                                href={dashboardHref}
                                className={`font-medium relative py-1 transition-colors duration-200 hover:text-[#76ABAE]
                                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#76ABAE] after:transition-all after:duration-300
                                    ${isActive(dashboardHref) ? 'text-[#76ABAE] after:w-full' : 'after:w-0 hover:after:w-full'}`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Auth — Desktop */}
                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-slate-700/40 animate-pulse hidden md:block" />
                        ) : user ? (
                            <div className="relative hidden md:block">
                                {/* Avatar Button */}
                                <button
                                    onClick={() => setAvatarMenuOpen((prev) => !prev)}
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#76ABAE] hover:opacity-90 transition-opacity"
                                >
                                    <img
                                        src={user?.image || '/user.png'}
                                        alt={user?.name || 'User Avatar'}
                                        className="object-cover w-10 h-10"
                                    />
                                </button>

                                {/* Dropdown */}
                                {avatarMenuOpen && (
                                    <div className={`absolute right-0 top-12 w-64 rounded-xl border shadow-2xl z-50 overflow-hidden
                                        ${isDarkMode
                                            ? 'bg-[#0F2438] border-slate-600'
                                            : 'bg-white border-slate-200'
                                        }`}
                                    >
                                        {/* User Info */}
                                        <div className={`flex items-center gap-3 px-4 py-4 border-b
                                            ${isDarkMode ? 'border-slate-600 bg-[#1B3C53]' : 'border-slate-200'}`}
                                        >
                                            <img
                                                src={user?.image || '/user.png'}
                                                alt={user?.name || 'User'}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-[#76ABAE]"
                                            />
                                            <div className="overflow-hidden flex-1">
                                                <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    {user?.name || 'User'}
                                                </p>
                                                <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {user?.email || 'user@email.com'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className={`p-2 ${isDarkMode ? 'bg-[#0F2438]' : ''}`}>
                                            {showDashboard && (
                                                <Link
                                                    href={dashboardHref}
                                                    onClick={() => setAvatarMenuOpen(false)}
                                                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg font-medium transition-colors
                                                        ${isDarkMode
                                                            ? 'text-white hover:bg-slate-700/60'
                                                            : 'text-slate-800 hover:bg-slate-100'
                                                        }`}
                                                >
                                                    <LayoutDashboard size={18} />
                                                    <span>Dashboard</span>
                                                </Link>
                                            )}
                                            <Link
                                                href={`/${user.role}/profile`}
                                                onClick={() => setAvatarMenuOpen(false)}
                                                className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg font-medium transition-colors
                                                    ${isDarkMode
                                                        ? 'text-white hover:bg-slate-700/60'
                                                        : 'text-slate-800 hover:bg-slate-100'
                                                    }`}
                                            >
                                                <User size={18} />
                                                <span>My Profile</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setAvatarMenuOpen(false);
                                                    authClient.signOut({
                                                        fetchOptions: {
                                                            onSuccess: () => { window.location.href = '/'; }
                                                        }
                                                    });
                                                }}
                                                className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg font-medium transition-colors
                                                    ${isDarkMode
                                                        ? 'text-red-400 hover:bg-red-900/30'
                                                        : 'text-red-600 hover:bg-red-50'
                                                    }`}
                                            >
                                                <LogOut size={18} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className={`px-5 py-2.5 rounded-xl font-medium border transition-colors duration-200
                                        ${isDarkMode
                                            ? 'border-slate-600 text-white hover:bg-slate-800/60'
                                            : 'border-slate-300 text-slate-800 hover:bg-slate-100'
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
                        )}

                        {/* Mobile Hamburger */}
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

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t
                    ${isDarkMode ? 'border-slate-700/50 bg-[#1B3C53]' : 'border-slate-200 bg-[#FFFFFF]'}
                    ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
            >
                <div className="px-6 py-6 flex flex-col gap-4 text-base font-medium">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className={`py-2 px-3 rounded-lg transition-colors duration-200
                            ${isActive('/') ? 'text-[#76ABAE]' : 'hover:text-[#76ABAE]'}`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/properties"
                        onClick={() => setIsOpen(false)}
                        className={`py-2 px-3 rounded-lg transition-colors duration-200
                            ${isActive('/properties') ? 'text-[#76ABAE]' : 'hover:text-[#76ABAE]'}`}
                    >
                        All Properties
                    </Link>

                    {showDashboard && (
                        <Link
                            href={dashboardHref}
                            onClick={() => setIsOpen(false)}
                            className={`py-2 px-3 rounded-lg transition-colors duration-200
                                ${isActive(dashboardHref) ? 'text-[#76ABAE]' : 'hover:text-[#76ABAE]'}`}
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className={`border-t pt-4 ${isDarkMode ? 'border-slate-700/50' : 'border-slate-200'}`}>
                        {isPending ? (
                            <div className="w-full h-12 rounded-xl bg-slate-700/40 animate-pulse" />
                        ) : user ? (
                            <div className="flex flex-col gap-3">
                                {/* User Info */}
                                <div className={`flex items-center gap-3 px-3 py-3 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                    <img
                                        src={user?.image || '/user.png'}
                                        alt={user?.name || 'User'}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-[#76ABAE]"
                                    />
                                    <div className="overflow-hidden flex-1">
                                        <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                            {user?.name || 'User'}
                                        </p>
                                        <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {user?.email || 'user@email.com'}
                                        </p>
                                    </div>
                                </div>

                                {showDashboard && (
                                    <Link
                                        href={dashboardHref}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 bg-[#76ABAE] text-white w-full py-3 rounded-lg font-medium hover:bg-[#659699] transition-colors"
                                    >
                                        <LayoutDashboard size={18} /> Dashboard
                                    </Link>
                                )}

                                <Link
                                    href={`/${user.role}/profile`}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium border transition-colors
                                        ${isDarkMode
                                            ? 'border-slate-600 text-white hover:bg-slate-800/60'
                                            : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                                        }`}
                                >
                                    <User size={18} /> My Profile
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => { window.location.href = '/'; }
                                            }
                                        });
                                    }}
                                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium transition-colors
                                        ${isDarkMode
                                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                        }`}
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className={`py-3 text-center rounded-lg border font-medium transition-colors duration-200
                                        ${isDarkMode
                                            ? 'border-slate-600 text-white hover:bg-slate-800/60'
                                            : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                                        }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="py-3 text-center rounded-lg font-medium text-white bg-[#76ABAE] hover:bg-[#659699] transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;