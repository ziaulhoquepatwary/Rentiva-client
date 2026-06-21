"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import RoleModal from "./RoleModal";

export default function AuthProvider({ children }) {
    const { data: session } = authClient.useSession();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (session?.user && session.user.role === "") {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [session]);

    return (
        <>
            {children}
            <RoleModal
                isOpen={showModal}
                onRoleUpdated={() => setShowModal(false)}
            />
        </>
    );
}