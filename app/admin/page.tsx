// app/admin/page.tsx

import RoleGate from '@/components/RoleGate';

export default function AdminPage() {
    return (
        <RoleGate role="admin">
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">🔐 Admin Dashboard</h1>
                <p className="text-gray-600 text-lg">
                    Welcome, Admin! You have full access to this protected route.
                </p>
            </div>
        </RoleGate>
    );
}
