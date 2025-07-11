'use client';

import { useEffect, useState } from 'react';

export default function Header() {
    const [role, setRole] = useState('guest');

    useEffect(() => {
        const savedRole = localStorage.getItem('role');
        if (savedRole) setRole(savedRole);
    }, []);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value;
        localStorage.setItem('role', selectedRole);
        setRole(selectedRole);
        location.reload(); // Refresh to re-trigger RoleGate
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://avatars.githubusercontent.com/u/147439320?v=4"
                        alt="Tiny Archives Logo"
                        className="h-12 object-contain"
                    />
                    <h1 className="text-2xl font-bold text-gray-800">
                        📝 Tiny Archives Task Manager
                    </h1>
                </div>

                {/* Role Selector */}
                <select
                    onChange={handleRoleChange}
                    value={role}
                    className="ml-4 p-2 border rounded text-sm bg-white"
                >
                    <option value="guest">Guest</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </>
    );
}
