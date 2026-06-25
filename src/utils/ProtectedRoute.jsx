"use client";
import React, { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/app/loading';

export default function ProtectedRoute({ children }) {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isPending && !session) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [session, isPending, router, pathname]);

    if (isPending) {
        return <Loading />;
    }

    return session ? <>{children}</> : null;
}