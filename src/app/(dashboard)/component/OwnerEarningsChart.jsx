"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const BAR_COLORS = [
    "#F26B3F",
    "#34A853",
    "#FFB03B",
    "#9146FF",
    "#00B4D8",
    "#E05353",
    "#FF6B8B",
    "#2A9D8F",
    "#8338EC",
    "#F77F00",
    "#4EA8DE",
    "#A7C957"
];

export default function OwnerEarningsChart({ chartData = [] }) {
    const isDataEmpty = chartData.length === 0;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-[#1B3C53] border border-[#E2E8F0] dark:border-[#64748B] p-3 rounded-xl shadow-lg transition-all">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {payload[0].payload.name}
                    </p>
                    <p className="text-sm font-bold text-[#76ABAE] mt-0.5">
                        Earnings: ${payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (value) => {
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
        return `$${value}`;
    };

    return (
        <div className="w-full bg-white border border-[#E2E8F0] dark:bg-[#1B3C53]/40 dark:border-[#64748B]/40 rounded-2xl p-6 shadow-sm flex flex-col transition-all duration-300">
            <div className="mb-6">
                <h3 className="text-lg font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                    Monthly Earnings Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                    Visual comparison of income up to $100,000 maximum threshold
                </p>
            </div>

            <div className="w-full h-[360px] flex items-center justify-center">
                {isDataEmpty ? (
                    <div className="text-center flex flex-col items-center justify-center">
                        <p className="text-sm font-medium text-slate-400">
                            No earnings data recorded yet.
                        </p>
                        <p className="text-xs text-slate-500/70 mt-1">
                            Data will populate chronologically once transactions occur.
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="stroke-slate-100 dark:stroke-slate-800"
                            />

                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                style={{ fontSize: "10px", fill: "#94A3B8", fontWeight: "500" }}
                            />

                            <YAxis
                                domain={[0, 100000]}
                                tickFormatter={formatYAxis}
                                tickLine={false}
                                axisLine={false}
                                dx={-5}
                                style={{ fontSize: "10px", fill: "#94A3B8", fontWeight: "500" }}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "rgba(0, 0, 0, 0.03)", radius: 6 }}
                            />

                            <Bar
                                dataKey="earnings"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={45}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={BAR_COLORS[index % BAR_COLORS.length]}
                                        className="outline-none transition-all duration-200 hover:brightness-110 cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}