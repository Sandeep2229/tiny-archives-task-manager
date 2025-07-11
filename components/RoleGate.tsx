'use client';

import { useEffect, useState } from 'react';

type RoleGateProps = {
    role: string;
    children: React.ReactNode;
};

export default function RoleGate({ role, children }: RoleGateProps) {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setUserRole(storedRole || 'guest');
    }, []);

    if (!userRole) return null;

    if (userRole !== role) {
        return <p className="text-red-600 text-center mt-10">Access Denied: {role} only</p>;
    }

    return <>{children}</>;
}
