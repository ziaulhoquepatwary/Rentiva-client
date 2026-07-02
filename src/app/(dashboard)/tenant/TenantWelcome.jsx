"use client";

import { authClient } from "@/lib/auth-client";

function TenantWelcome() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1B3C53] dark:text-[#EEEEEE]">
                Welcome back, {isPending ? "..." : (user?.name || "Tenant")}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Here is what's happening with your rentals today.
            </p>
        </div>
    );
}

export default TenantWelcome;