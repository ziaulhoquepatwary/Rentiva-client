"use client";

import React, { useEffect, useState } from "react";
import { Search, Loader2, Shield, User, Home, Users } from "lucide-react";
import { getAllUsersApi, updateUserRoleApi } from "@/lib/actions/admin";
import Swal from "sweetalert2";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ totalPages: 1, totalUsers: 0 });
    const [loading, setLoading] = useState(true);
    const [updatingUserId, setUpdatingUserId] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsersApi(activeSearch, selectedRole, page, 10);
            if (response.success) {
                setUsers(response.data || []);
                setMeta({
                    totalPages: response.totalPages || 1,
                    totalUsers: response.totalUsers || 0
                });
            }
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Triggered only when activeSearch, selectedRole, or page changes
    useEffect(() => {
        fetchUsers();
    }, [activeSearch, selectedRole, page]);

    // Search Trigger Handlers
    const handleSearchSubmit = (e) => {
        if (e) e.preventDefault();
        setPage(1);
        setActiveSearch(searchInput.trim());
    };

    const handleRoleChange = async (userId, currentRole, newRole) => {
        if (currentRole === newRole) return;

        const result = await Swal.fire({
            title: "Change User Role?",
            text: `Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#76ABAE",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, Update"
        });

        if (!result.isConfirmed) return;

        setUpdatingUserId(userId);
        try {
            const response = await updateUserRoleApi(userId, newRole);
            if (response.success) {

                // FIXED: If we are in a specific role tab, remove the user from the current view
                if (selectedRole !== "" && selectedRole !== newRole) {
                    setUsers((prev) => prev.filter((user) => user._id !== userId));
                    setMeta((prev) => ({
                        ...prev,
                        totalUsers: Math.max(0, prev.totalUsers - 1)
                    }));
                } else {
                    // If we are in "All Users" tab or the role matches the current tab, just update the row UI
                    setUsers((prev) =>
                        prev.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
                    );
                }

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: response.message || "Role updated successfully",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            Swal.fire("Failed", error.response?.data?.message || "Something went wrong", "error");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const tabs = [
        { label: "All Users", value: "", icon: <Users size={14} /> },
        { label: "Tenants", value: "tenant", icon: <User size={14} /> },
        { label: "Owners", value: "owner", icon: <Home size={14} /> },
        { label: "Admins", value: "admin", icon: <Shield size={14} /> }
    ];

    return (
        <div className="w-full p-6 rounded-2xl border transition-all duration-300 bg-white border-[#E2E8F0] text-[#1B3C53] dark:bg-[#1B3C53] dark:border-[#64748B]/40 dark:text-[#EEEEEE] shadow-sm">

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                    <p className="text-xs text-slate-400 mt-1">Manage system users, search and update authorization hierarchy</p>
                </div>

                {!loading && (
                    <div className="flex gap-2 self-start sm:self-center">
                        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            Total Match: <strong className="text-[#76ABAE]">{meta.totalUsers}</strong>
                        </span>
                    </div>
                )}
            </div>

            {/* Filter & Search Bar Workspace */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 border-b border-slate-100 dark:border-slate-700/60 pb-4">

                {/* LEFT SIDE: Form submission for Enter/Click handling */}
                <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72 order-2 md:order-1 flex items-center">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-4 pr-10 py-2 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#76ABAE] transition-colors cursor-pointer"
                        title="Search"
                    >
                        <Search size={16} />
                    </button>
                </form>

                {/* RIGHT SIDE: Filter Tabs Controller */}
                <div className="flex flex-wrap items-center gap-2 order-1 md:order-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => { setSelectedRole(tab.value); setPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${selectedRole === tab.value
                                ? "bg-[#1B3C53] text-white dark:bg-[#76ABAE] dark:text-[#1B3C53] shadow-sm"
                                : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:bg-slate-800/80"
                                }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Arena */}
            {loading ? (
                <div className="flex justify-center items-center py-24">
                    <Loader2 className="animate-spin mr-2 text-[#76ABAE]" size={24} />
                    <span className="text-sm text-slate-400">Loading directory data...</span>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700/60">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60">
                                <th className="p-4 w-16">Profile</th>
                                <th className="p-4">Name / Identity</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Current Role</th>
                                <th className="p-4 text-center">Change Permission</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-sm">
                            {users.map((user) => {
                                if (!user) return null;

                                return (
                                    <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4">
                                            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 border border-slate-100 dark:border-slate-700">
                                                <img
                                                    src={user.image || "/avatar-placeholder.png"}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold text-slate-800 dark:text-white">
                                            {user.name || "N/A"}
                                        </td>
                                        <td className="p-4 text-slate-500 dark:text-slate-300">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${user.role === "admin"
                                                ? "bg-rose-500/10 text-rose-500"
                                                : user.role === "owner"
                                                    ? "bg-amber-500/10 text-amber-500"
                                                    : "bg-emerald-500/10 text-emerald-500"
                                                }`}>
                                                {user.role || "tenant"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center items-center">
                                                {updatingUserId === user._id ? (
                                                    <Loader2 className="animate-spin text-[#76ABAE]" size={16} />
                                                ) : (
                                                    <select
                                                        value={user.role || "tenant"}
                                                        onChange={(e) => handleRoleChange(user._id, user.role, e.target.value)}
                                                        className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#76ABAE] text-slate-700 dark:text-white cursor-pointer"
                                                    >
                                                        <option value="tenant">Tenant</option>
                                                        <option value="owner">Owner</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <div className="text-center py-16 text-slate-400">
                            No users found matching the selected criteria.
                        </div>
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            {meta.totalPages > 1 && !loading && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/40">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-xs font-semibold text-slate-400">
                        Page {page} of {meta.totalPages} ({meta.totalUsers} total users)
                    </span>
                    <button
                        disabled={page === meta.totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-[#E2E8F0] dark:border-[#64748B]/50 disabled:opacity-40 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}