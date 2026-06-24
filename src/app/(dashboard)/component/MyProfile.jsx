"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { User, Mail, Edit2, ArrowLeft, Camera, Loader2, Save, ShieldCheck, Sparkles, X, Phone, FileText, AlertTriangle, Info, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '@/app/loading';

function MyProfile() {
    const { data: session, isPending } = authClient.useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const user = session?.user;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            image: user?.image || "",
            phone: user?.phone || "",
            address: user?.address || "",
            bio: user?.bio || ""
        }
    });

    if (isPending) {
        return <Loading />;
    }

    const handleUpdateProfile = async (data) => {
        setIsUpdating(true);

        const { error } = await authClient.updateUser({
            name: data.name,
            image: data.image,
            phone: data.phone,
            address: data.address,
            bio: data.bio,
        });

        setIsUpdating(false);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.message,
                customClass: {
                    popup: 'rounded-2xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border border-slate-200 dark:border-[#64748B]'
                }
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Profile Submitted!",
                text: "Your profile details have been sent successfully and are now awaiting admin verification.",
                customClass: {
                    popup: 'rounded-2xl bg-white dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#EEEEEE] border border-slate-200 dark:border-[#64748B]'
                }
            });
            setIsEditing(false);
        }
    };

    const handleEditProfile = () => {
        reset({
            name: user?.name || "",
            image: user?.image || "",
            phone: user?.phone || "",
            address: user?.address || "",
            bio: user?.bio || ""
        });
        setIsEditing(true);
    };

    return (
        <section className="bg-white dark:bg-[#1B3C53] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#1B3C53] dark:text-[#EEEEEE] transition-colors duration-300 relative overflow-hidden">

            {/* Background Glows */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#76ABAE] rounded-full filter blur-[150px]" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">

                {/* Header Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2.5 bg-slate-100 dark:bg-[#1B3C53] border border-slate-200 dark:border-[#64748B] rounded-xl hover:text-[#76ABAE] dark:hover:text-[#76ABAE] transition-all group cursor-pointer">
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-[#1B3C53] dark:text-white">Account Pipeline</h1>
                            <p className="text-xs text-slate-400 dark:text-[#EEEEEE]/60 uppercase tracking-wider font-semibold">{user?.role || "User"} Identity</p>
                        </div>
                    </div>

                    {!isEditing && (
                        <button
                            onClick={handleEditProfile}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B3C53] dark:bg-[#76ABAE] hover:opacity-95 text-white dark:text-[#1B3C53] rounded-xl font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                            <Edit2 size={14} /> Edit Profile
                        </button>
                    )}
                </div>

                {/* Main Profile Card Base */}
                <div className="bg-white dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] rounded-3xl shadow-sm overflow-hidden">

                    {/* Banner Cover */}
                    <div className="relative h-36 bg-gradient-to-br from-[#1B3C53] via-[#2A4E6C] to-[#76ABAE] overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px]" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/20 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg">
                            <Sparkles size={9} /> WorkiFy Engine
                        </div>
                    </div>

                    {/* Profile Meta Frame */}
                    <div className="px-6 pb-8 sm:px-8">

                        {/* Avatar & Verification Status Indicator */}
                        <div className="relative -top-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-[-36px] w-full">
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                                <div className="relative group rounded-2xl overflow-hidden border-4 border-white dark:border-[#1B3C53] shadow-md bg-slate-50 dark:bg-[#1B3C53] shrink-0">
                                    <img
                                        src={user?.image || "/user.png"}
                                        alt="Profile Identity"
                                        className="w-28 h-28 sm:w-32 sm:h-32 object-cover"
                                    />
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white pointer-events-none">
                                            <Camera size={20} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1 pb-2">
                                    <h2 className="text-2xl font-black tracking-tight text-[#1B3C53] dark:text-white">
                                        {user?.name}
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 dark:text-[#EEEEEE]/70 flex items-center gap-1.5">
                                        <Mail size={14} className="text-[#1B3C53] dark:text-[#EEEEEE]" /> {user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="pb-2">
                                {user?.status === "approved" || user?.status === "active" ? (
                                    <span className="px-3 py-1.5 bg-[#76ABAE]/20 dark:bg-[#76ABAE]/10 text-[#1B3C53] dark:text-[#76ABAE] border border-[#76ABAE]/30 rounded-xl text-xs font-bold uppercase tracking-wider">Verified Profile</span>
                                ) : user?.status === "rejected" ? (
                                    <span className="px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-wider">Rejected</span>
                                ) : (
                                    <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-xs font-bold uppercase tracking-wider">Review Pending</span>
                                )}
                            </div>
                        </div>

                        {/* Conditional Rendering (Form Mode vs Read-Only Mode) */}
                        {isEditing ? (
                            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-5 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/50 animate-in fade-in zoom-in-95 duration-200">

                                {/* Warning Notice */}
                                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-amber-700 dark:text-amber-400">
                                    <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                                    <div className="text-xs space-y-1">
                                        <p className="font-bold uppercase tracking-wider">Important Notice:</p>
                                        <p className="leading-relaxed text-slate-600 dark:text-[#EEEEEE]/80">Please provide accurate and authentic credentials. Providing false or misleading parameters may result in a permanent account suspension by the administration, restricting access to deployment systems and job operations.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    {/* 1. Name Input Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80 block">Full Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-[#EEEEEE]/40">
                                                <User size={16} />
                                            </span>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-[#1B3C53] dark:text-[#EEEEEE] ${errors.name ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] dark:border-[#64748B] focus:border-[#76ABAE] dark:focus:border-[#76ABAE] focus:ring-[#76ABAE]/10"}`}
                                                placeholder="Enter your profile name"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-xs font-medium pl-1">{errors.name.message}</p>}
                                    </div>

                                    {/* 2. Phone Number Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80 block">Phone Number</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-[#EEEEEE]/40">
                                                <Phone size={16} />
                                            </span>
                                            <input
                                                {...register("phone", { required: "Phone number is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-[#1B3C53] dark:text-[#EEEEEE] ${errors.phone ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] dark:border-[#64748B] focus:border-[#76ABAE] dark:focus:border-[#76ABAE] focus:ring-[#76ABAE]/10"}`}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        {errors.phone && <p className="text-red-500 text-xs font-medium pl-1">{errors.phone.message}</p>}
                                    </div>

                                    {/* 3. Address Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80 block">Address</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-[#EEEEEE]/40">
                                                <MapPin size={16} />
                                            </span>
                                            <input
                                                {...register("address", { required: "Address is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-[#1B3C53] dark:text-[#EEEEEE] ${errors.address ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] dark:border-[#64748B] focus:border-[#76ABAE] dark:focus:border-[#76ABAE] focus:ring-[#76ABAE]/10"}`}
                                                placeholder="Enter physical address"
                                            />
                                        </div>
                                        {errors.address && <p className="text-red-500 text-xs font-medium pl-1">{errors.address.message}</p>}
                                    </div>

                                    {/* 4. Image URL Input Field + Role Based Instructions */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80 block">Profile Image URL</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 dark:text-[#EEEEEE]/40">
                                                <Camera size={16} />
                                            </span>
                                            <input
                                                {...register("image")}
                                                type="text"
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] rounded-xl text-sm focus:outline-none focus:border-[#76ABAE] dark:focus:border-[#76ABAE] focus:ring-2 focus:ring-[#76ABAE]/10 transition-all text-[#1B3C53] dark:text-[#EEEEEE]"
                                                placeholder="Paste complete image layout URL"
                                            />
                                        </div>
                                        {/* Dynamic Instruction */}
                                        <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-[#1B3C53]/70 dark:text-[#EEEEEE]/60 bg-slate-100 dark:bg-[#1B3C53]/40 p-2 rounded-lg border border-[#E2E8F0] dark:border-[#64748B]/30">
                                            <Info size={12} className="shrink-0 mt-0.5 text-[#1B3C53] dark:text-[#EEEEEE]" />
                                            <p className="text-xs">
                                                {user?.role === 'recruiter'
                                                    ? "Recommended: Please use a clear company logo to ensure high visibility and standard corporate branding."
                                                    : "Recommended: Please provide a formal/professional headshot image to maximize profile authenticity and attraction."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 5. Bio Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-[#1B3C53] dark:text-[#EEEEEE]/80 block">Professional Bio</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pt-3 pointer-events-none text-slate-400 dark:text-[#EEEEEE]/40">
                                                <FileText size={16} />
                                            </span>
                                            <textarea
                                                {...register("bio", { required: "Bio is required" })}
                                                rows={4}
                                                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-[#1B3C53] dark:text-[#EEEEEE] ${errors.bio ? "border-red-500 focus:ring-red-500/10" : "border-[#E2E8F0] dark:border-[#64748B] focus:border-[#76ABAE] dark:focus:border-[#76ABAE] focus:ring-[#76ABAE]/10"}`}
                                                placeholder="Write about your professional background, skills, or operational details..."
                                            />
                                        </div>
                                        {errors.bio && <p className="text-red-500 text-xs font-medium pl-1">{errors.bio.message}</p>}
                                    </div>
                                </div>

                                {/* Form Buttons */}
                                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#E2E8F0] dark:border-[#64748B]/50">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1B3C53] dark:bg-[#76ABAE] hover:opacity-95 text-white dark:text-[#1B3C53] rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm disabled:opacity-70 transition-all active:scale-[0.98] cursor-pointer"
                                    >
                                        {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                        {isUpdating ? "Submitting Request..." : "Submit for Approval"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-[#1B3C53] dark:hover:bg-slate-800 text-slate-600 dark:text-[#EEEEEE]/80 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center gap-1.5"
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* Read-Only Mode View */
                            <div className="space-y-6 pt-4 border-t border-[#E2E8F0] dark:border-[#64748B]/50 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Name Block */}
                                    <div className="p-4 bg-slate-50 dark:bg-[#1B3C53]/50 rounded-2xl border border-[#E2E8F0] dark:border-[#64748B] shadow-sm space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-[#EEEEEE]/50 uppercase tracking-widest">User Name</p>
                                        <div className="flex items-center gap-2 text-[#1B3C53] dark:text-[#EEEEEE]">
                                            <User size={16} className="text-[#1B3C53] dark:text-[#76ABAE]" />
                                            <span className="font-bold text-sm text-[#1B3C53] dark:text-white">{user?.name}</span>
                                        </div>
                                    </div>

                                    {/* Phone Block */}
                                    <div className="p-4 bg-slate-50 dark:bg-[#1B3C53]/50 rounded-2xl border border-[#E2E8F0] dark:border-[#64748B] shadow-sm space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-[#EEEEEE]/50 uppercase tracking-widest">Phone Number</p>
                                        <div className="flex items-center gap-2 text-[#1B3C53] dark:text-[#EEEEEE]">
                                            <Phone size={16} className="text-[#1B3C53] dark:text-[#76ABAE]" />
                                            <span className="font-bold text-sm text-[#1B3C53] dark:text-white">{user?.phone || "Not configured yet"}</span>
                                        </div>
                                    </div>

                                    {/* Address Block */}
                                    <div className="p-4 bg-slate-50 dark:bg-[#1B3C53]/50 rounded-2xl border border-[#E2E8F0] dark:border-[#64748B] shadow-sm space-y-1 md:col-span-2">
                                        <p className="text-[10px] font-bold text-slate-400 dark:text-[#EEEEEE]/50 uppercase tracking-widest">Address</p>
                                        <div className="flex items-center gap-2 text-[#1B3C53] dark:text-[#EEEEEE]">
                                            <MapPin size={16} className="text-[#1B3C53] dark:text-[#76ABAE]" />
                                            <span className="font-bold text-sm text-[#1B3C53] dark:text-white">{user?.address || "Not configured yet"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio Block (Full Width) */}
                                <div className="p-4 bg-slate-50 dark:bg-[#1B3C53]/50 rounded-2xl border border-[#E2E8F0] dark:border-[#64748B] shadow-sm space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-[#EEEEEE]/50 uppercase tracking-widest">Bio / Description</p>
                                    <div className="text-slate-600 dark:text-[#EEEEEE]/80 text-sm leading-relaxed whitespace-pre-line">
                                        {user?.bio || "No description added yet. Please execute 'Edit Profile' to establish data logs."}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Guard Notice */}
                        <div className="mt-6 p-5 bg-slate-50 dark:bg-[#1B3C53]/30 rounded-2xl border border-[#E2E8F0] dark:border-[#64748B] flex items-start gap-3.5">
                            <div className="p-2 bg-slate-200 dark:bg-[#1B3C53] text-[#1B3C53] dark:text-[#76ABAE] rounded-xl shrink-0">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-xs font-bold text-[#1B3C53] dark:text-[#EEEEEE] uppercase tracking-wider">Account Infrastructure</h3>
                                <p className="text-xs text-slate-500 dark:text-[#EEEEEE]/60 leading-relaxed">
                                    Your core parameters are cryptographic-shielded via **Better Auth Framework**. Node parameters and metadata modifications sync securely to the central data schema.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default MyProfile;