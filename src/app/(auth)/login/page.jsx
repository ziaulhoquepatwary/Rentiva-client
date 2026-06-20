"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, ArrowRight, X, Send } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { register: registerForgot, handleSubmit: handleForgotSubmit, formState: { errors: forgotErrors }, reset: resetForgotForm } = useForm();

    const getRedirectUrl = () => {
        const redirect =
            searchParams.get("redirect") ||
            searchParams.get("callbackUrl");

        return redirect || "/";
    };

    const onLoginSubmit = async (userData) => {
        const { data, error } =
            await authClient.signIn.email({
                email: userData.email,
                password: userData.password,
            });

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong during Login. Please try again.",
            });

            reset();
        } else {
            router.push(getRedirectUrl());
        }
    };

    const onForgotSubmit = async (data) => {
        const { error } =
            await authClient.requestPasswordReset({
                email: data.forgotEmail,
                redirectTo: `${window.location.origin}/reset-password`
            });

        setIsForgotOpen(false);
        resetForgotForm();

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text:
                    error.message ||
                    "Something went wrong. Please try again.",
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Email Sent!",
                text: `A password reset link has been sent to ${data.forgotEmail}. Please check your inbox.`,
                confirmButtonColor: "#1B3C53",
            });
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL:
                `${window.location.origin}${getRedirectUrl()}`
        });
    };

    return (
        <section className="min-h-screen bg-white dark:bg-[#1B3C53] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">
            {/* Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-500 rounded-full shadow-sm text-[#1B3C53] dark:text-[#EEEEEE] hover:bg-slate-50 dark:hover:bg-[#76ABAE]/20 transition-all text-sm font-medium"
            >
                <FaHome />
                <span>Go Home</span>
            </Link>

            {/* Card */}
            <div className="max-w-md w-full space-y-6 bg-[#f8fcfa]/70 dark:bg-[#1B3C53]/60 border border-slate-200 dark:border-slate-500 p-8 rounded-3xl backdrop-blur-xl shadow-xl relative z-10">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold font-heading tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                        Welcome{" "}
                        <span className="dark:text-[#76ABAE]">
                            Back
                        </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-[#EEEEEE]/70">
                        Sign in to continue sharing and validating your next big ideas.
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onLoginSubmit)} className="mt-4 space-y-4">
                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[#EEEEEE]/70 block">
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
                                    required:
                                        "Email is required",
                                    pattern: {
                                        value:
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message:
                                            "Invalid email address"
                                    }
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-[#EEEEEE]                                 
                                ${errors.email ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-500 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"}`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[#EEEEEE]/70 block">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsForgotOpen(true)}
                                className="text-xs font-semibold text-[#1B3C53] dark:text-[#76ABAE] hover:opacity-80 transition-colors cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register(
                                    "password",
                                    {
                                        required:
                                            "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters"
                                        }
                                    }
                                )}
                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-[#1B3C53] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-[#EEEEEE]
                                ${errors.password ? "border-red-500 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-500 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#76ABAE] dark:hover:text-[#EEEEEE]"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 pl-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-[#76ABAE] hover:opacity-90 dark:bg-[#76ABAE] dark:text-[#1B3C53] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md group text-sm cursor-pointer"
                    >
                        Login
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-slate-200 dark:border-slate-500" />
                    <span className="shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-semibold">
                        Or connect with
                    </span>
                    <div className="grow border-t border-slate-200 dark:border-slate-500" />
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#1B3C53] border border-slate-200 dark:border-slate-500 hover:bg-slate-50 dark:hover:bg-[#76ABAE]/20 text-[#1B3C53] dark:text-[#EEEEEE] font-medium py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer shadow-sm"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                {/* Register Link */}
                <div className="text-center pt-1">
                    <p className="text-sm text-gray-600 dark:text-[#EEEEEE]/70">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-semibold text-[#1B3C53] dark:text-[#76ABAE] hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>

            {/* Forgot Modal */}
            {isForgotOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 dark:bg-black/60 backdrop-blur-md">
                    <div className="bg-white dark:bg-[#1B3C53] max-w-sm w-full p-6 rounded-3xl border border-slate-200 dark:border-slate-500 shadow-2xl space-y-4 relative">
                        <button
                            type="button"
                            onClick={() => {
                                setIsForgotOpen(false);
                                resetForgotForm();
                            }}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-slate-100 dark:hover:bg-[#76ABAE]/20 transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                        <div className="space-y-1 pr-6">
                            <h3 className="text-lg font-bold text-[#1B3C53] dark:text-[#EEEEEE] font-heading">
                                Reset Your Password
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-[#EEEEEE]/70">
                                Enter your registered email below and we’ll send a reset link.
                            </p>
                        </div>

                        <form onSubmit={handleForgotSubmit(onForgotSubmit)} className="space-y-3">
                            <div className="space-y-1">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                                        <Mail size={16} />
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="yourname@email.com"
                                        {...registerForgot(
                                            "forgotEmail",
                                            {
                                                required:
                                                    "Email is required",
                                                pattern: {
                                                    value:
                                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message:
                                                        "Invalid email address"
                                                }
                                            }
                                        )}
                                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#1B3C53] border rounded-xl text-xs focus:outline-none focus:ring-2 transition-all text-gray-900 dark:text-[#EEEEEE]
                                        ${forgotErrors.forgotEmail ? "border-red-500" : "border-slate-200 dark:border-slate-500 focus:border-[#76ABAE] focus:ring-[#76ABAE]/20"}`}
                                    />
                                </div>
                                {forgotErrors.forgotEmail && (
                                    <p className="text-[11px] text-red-500 pl-1">
                                        {forgotErrors.forgotEmail.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-[#1B3C53] hover:opacity-90 dark:bg-[#76ABAE] dark:text-[#1B3C53] text-white font-medium py-2.5 rounded-xl transition-all duration-200 text-xs cursor-pointer shadow-sm"
                            >
                                <Send size={12} />
                                Send Reset Link
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Login;