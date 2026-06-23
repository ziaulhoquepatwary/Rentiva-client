"use client";
import { useState } from "react";
import DashboardSidebar from "./component/DashboardSidebar";
import DashboardHeader from "./component/DashboardHeader";

function Dashboard({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#1B3C53] transition-colors duration-300">
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <DashboardSidebar
                    isOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
            </div>

            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-[#1B3C53]/40 z-40 md:hidden"
                />
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 p-4 md:p-6 overflow-y-auto text-[#1B3C53] dark:text-[#EEEEEE]">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;