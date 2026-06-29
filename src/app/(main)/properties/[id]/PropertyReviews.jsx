"use client";

import React, { useEffect, useState } from "react";
import { Star, MessageSquare, Loader2, Trash2 } from "lucide-react";
import { getPropertyReviewsApi, createReviewApi, deleteReviewApi } from "@/lib/actions/review";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

export default function PropertyReviews({ propertyId }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const fetchReviews = async () => {
        try {
            const response = await getPropertyReviewsApi(propertyId);
            if (response.success) {
                setReviews(response.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (propertyId) {
            fetchReviews();
        }
    }, [propertyId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Authentication Required",
                text: "Please login to write a review.",
            });
            return;
        }

        if (!comment.trim()) return;

        setSubmitting(true);
        try {
            const response = await createReviewApi({
                propertyId,
                rating,
                comment: comment.trim(),
            });

            if (response.success) {
                setReviews((prev) => [response.data, ...prev]);
                setComment("");
                setRating(5);

                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Review submitted successfully",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.message || "Something went wrong!",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This process cannot be reverted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#76ABAE",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, remove it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteReviewApi(reviewId);
                if (response.success) {
                    setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
                    Swal.fire("Deleted!", "The review has been removed.", "success");
                }
            } catch (error) {
                Swal.fire("Error", error.response?.data?.message || "Unauthorized action", "error");
            }
        }
    };

    return (
        <div className="bg-white dark:bg-[#294f69] p-6 sm:p-8 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 space-y-8 shadow-sm text-slate-800 dark:text-[#EEEEEE]">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-700/40">
                <MessageSquare className="text-[#76ABAE]" size={20} />
                <h3 className="text-lg font-bold tracking-tight">Resident Feedbacks</h3>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 bg-slate-50/50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/30">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Share Your Experience</p>

                <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                            key={starValue}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5 focus:outline-none transition-transform active:scale-90 cursor-pointer"
                        >
                            <Star
                                size={24}
                                className={`transition-colors ${starValue <= (hoverRating || rating)
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-slate-200 dark:text-slate-600"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a constructive message about this listing..."
                    className="w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-4 focus:ring-[#76ABAE]/10 focus:border-[#76ABAE] transition-all text-slate-800 dark:text-white placeholder:text-slate-400 font-medium resize-none"
                    required
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-[#1B3C53] dark:bg-[#76ABAE] text-white dark:text-[#1B3C53] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {submitting && <Loader2 className="animate-spin" size={14} />}
                        {submitting ? "Submitting" : "Submit Review"}
                    </button>
                </div>
            </form>

            <div className="space-y-6">
                {loading ? (
                    <div className="flex justify-center items-center py-10 gap-2">
                        <Loader2 className="animate-spin text-[#76ABAE]" size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Loading pipeline...</span>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {reviews.map((rev) => (
                            <div key={rev._id} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors group relative border border-transparent hover:border-slate-100 dark:hover:border-slate-700/20">
                                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/60 dark:border-slate-600 shadow-sm">
                                    <img
                                        src={rev.tenantImage || "/avatar-placeholder.png"}
                                        alt={rev.tenantName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-grow space-y-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <span className="font-bold text-sm text-slate-800 dark:text-white block sm:inline truncate mr-2">{rev.tenantName}</span>
                                            <span className="text-[10px] text-slate-400 font-semibold block sm:inline">
                                                {new Date(rev.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        {user && user.id === rev.tenantId && (
                                            <button
                                                onClick={() => handleDeleteReview(rev._id)}
                                                className="sm:opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer border border-transparent hover:border-rose-500/20 shadow-sm sm:shadow-none"
                                                title="Delete Review"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                className={star <= rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm pt-1 font-normal break-words">
                                        {rev.comment}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {reviews.length === 0 && (
                            <div className="text-center py-10 text-xs font-bold uppercase tracking-wider text-slate-400/80">
                                No feedback submitted yet for this property.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}