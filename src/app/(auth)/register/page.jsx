"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, ArrowRight, UsersRound } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

function Register() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            role: "tenant"
        }
    });

    const getRedirectUrl = () => {
        const redirect =
            searchParams.get("redirect") ||
            searchParams.get("callbackUrl");

        return redirect || "/";
    };

    const handleRegister = async (userData) => {
        console.log("Register Form Data:", userData);

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.imageUrl,
            role: userData.role,
        });

        console.log(data, error);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong during registration. Please try again.",
            });

            reset();
        } else {
            router.push(getRedirectUrl());
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}${getRedirectUrl()}`,
        });
    };

    return (
        <section className="min-h-screen bg-white dark:bg-[#1B3C53] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">

            {/* Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-700/50 rounded-full shadow-sm text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all text-sm font-medium"
            >
                <FaHome />
                <span>Go Home</span>
            </Link>

            <div className="max-w-md w-full space-y-6 bg-white/70 dark:bg-[#1B3C53]/60 border border-slate-200 dark:border-slate-600 p-8 rounded-3xl backdrop-blur-xl shadow-xl relative z-10">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold font-heading tracking-tight text-slate-800 dark:text-white">
                        Create Your{" "}
                        <span className="text-[#76ABAE]">
                            Account
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-300">
                        Join Rentiva and explore properties.
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="mt-4 space-y-4"
                >
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300 block">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-white
                                ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-600 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"}`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 font-medium pl-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-white
                                ${errors.email
                                        ? "border-red-500 focus:ring-red-500/20"
                                        : "border-slate-200 dark:border-slate-600 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"
                                    }
                                `}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300 block">
                            Register As
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <UsersRound size={18} />
                            </span>
                            <select
                                {...register("role")}
                                defaultValue="tenant"
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:border-[#76ABAE] focus:ring-2 focus:ring-[#76ABAE]/20 transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                            >
                                <option value="tenant">Tenant</option>
                                <option value="owner">Landlord</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                                ▾
                            </span>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300 block">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" },
                                    validate: {
                                        hasUpper: (value) =>
                                            /[A-Z]/.test(value) ||
                                            "Must contain at least one uppercase letter",
                                        hasLower: (value) =>
                                            /[a-z]/.test(value) ||
                                            "Must contain at least one lowercase letter"
                                    }
                                })}
                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-white
                                ${errors.password ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-600 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#76ABAE]"
                            >
                                {showPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Avatar */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-300 block">
                            Avatar Image URL
                            <span className="text-[10px] ml-1 font-normal">
                                (Optional)
                            </span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <ImageIcon size={18} />
                            </span>
                            <input
                                type="url"
                                placeholder="https://example.com/avatar.png"
                                {...register("imageUrl")}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:border-[#76ABAE] focus:ring-2 focus:ring-[#76ABAE]/20 transition-all text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-[#76ABAE] text-white hover:bg-[#659699] font-medium py-3 rounded-xl transition-all duration-200 shadow-md group text-sm cursor-pointer active:scale-95"
                    >
                        Register Account <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-600" />
                    <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Or connect with
                    </span>
                    <div className="flex-grow border-t border-slate-200 dark:border-slate-600" />
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-white font-medium py-3 rounded-xl transition-all text-sm cursor-pointer shadow-sm"
                >
                    <FcGoogle size={20} /> Continue with Google
                </button>

                {/* Sign In */}
                <div className="text-center pt-1">
                    <p className="text-sm text-gray-500 dark:text-slate-300">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#76ABAE] hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
}

export default Register;