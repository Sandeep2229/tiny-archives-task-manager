'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type TaskStatus = 'pending' | 'in-review' | 'approved' | 'changes-requested';

type Task = {
    id: number;
    text: string;
    completed: boolean;
    status: TaskStatus;
};

type Props = {
    task: Task;
    onToggle: () => void;
    onDelete: () => void;
    onStatusChange?: (status: TaskStatus) => void;
};

export default function TaskCard({ task, onToggle, onDelete, onStatusChange }: Props) {
    const [role, setRole] = useState('guest');

    useEffect(() => {
        setRole(localStorage.getItem('role') || 'guest');
    }, []);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as TaskStatus;
        if (onStatusChange) onStatusChange(newStatus);
        toast.success(`Status changed to "${newStatus}"`);
    };

    return (
        <div className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border hover:shadow-md transition">
            <div className="flex-1">
                <span
                    onClick={onToggle}
                    className={`block cursor-pointer select-none mb-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                >
                    {task.text}
                </span>
                <div className="text-sm text-gray-500">
                    {role === 'admin' ? (
                        <select
                            value={task.status}
                            onChange={handleStatusChange}
                            className="border p-1 rounded text-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-review">In Review</option>
                            <option value="approved">Approved</option>
                            <option value="changes-requested">Changes Requested</option>
                        </select>
                    ) : (
                        <>Status: {task.status}</>
                    )}
                </div>
            </div>

            <button
                onClick={onDelete}
                className="text-red-500 font-semibold hover:text-red-700 ml-4"
                title="Delete"
            >
                ✕
            </button>
        </div>
    );
}
