"use client";
import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";

export default function PropertyReviews({ propertyId }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const [dummyReviews, setDummyReviews] = useState([
        { id: 1, author: "Alex Mercer", rating: 5, date: "2 days ago", comment: "Absolutely incredible experience. Beautifully lit room with magnificent view." },
        { id: 2, author: "Sarah Connor", rating: 4, date: "1 week ago", comment: "Very quiet flat despite being directly downtown. Perfect kitchen setup." }
    ]);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newReview = {
            id: Date.now(),
            author: "You",
            rating,
            date: "Just now",
            comment: comment.trim()
        };

        setDummyReviews([newReview, ...dummyReviews]);
        setComment("");
        setRating(5);
    };

    return (
        <div className="bg-white dark:bg-[#294f69] p-6 sm:p-8 rounded-sm border border-slate-200 dark:border-slate-700/50 space-y-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/50">
                <MessageSquare className="text-[#76ABAE]" size={20} />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resident Feedbacks</h3>
            </div>

            {/* Review composition workspace */}
            <form onSubmit={handleSubmitReview} className="space-y-4 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Share Your Experience</p>

                {/* Dynamic Star Interactive system */}
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                            key={starValue}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5 focus:outline-none transition-transform active:scale-90"
                        >
                            <Star
                                size={20}
                                className={`transition-colors ${starValue <= (hoverRating || rating)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-slate-300 dark:text-slate-600"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Input Textarea box */}
                <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a constructive message about this listing..."
                    className="w-full px-4 py-3 text-sm rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#76ABAE]/30 focus:border-[#76ABAE] transition-all text-slate-800 dark:text-white"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#1B3C53] dark:bg-[#76ABAE] text-white dark:text-[#1B3C53] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm"
                    >
                        Submit Review
                    </button>
                </div>
            </form>

            {/* Rendered Reviews Pipeline */}
            <div className="space-y-5">
                {dummyReviews.map((rev) => (
                    <div key={rev.id} className="text-sm space-y-1.5 pb-5 border-b border-slate-100 dark:border-slate-700/50 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 dark:text-white">{rev.author}</span>
                            <span className="text-xs text-slate-400">{rev.date}</span>
                        </div>
                        {/* Rating Display */}
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={12}
                                    className={star <= rev.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}
                                />
                            ))}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                            {rev.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}