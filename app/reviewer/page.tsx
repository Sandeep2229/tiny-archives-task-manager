'use client';

import { useEffect, useState } from 'react';
import RoleGate from '@/components/RoleGate';
import { toast } from 'react-hot-toast';

type TaskStatus = 'pending' | 'in-review' | 'approved' | 'changes-requested';

type Task = {
    id: number;
    text: string;
    completed: boolean;
    status: TaskStatus;
};

export default function ReviewerDashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

    useEffect(() => {
        const stored = localStorage.getItem('tasks');
        if (stored) setTasks(JSON.parse(stored));
    }, []);

    const updateStatus = (id: number, status: TaskStatus) => {
        const updated = tasks.map(task =>
            task.id === id ? { ...task, status } : task
        );
        setTasks(updated);
        localStorage.setItem('tasks', JSON.stringify(updated));
        toast.success(`Task marked as ${status}`);
    };

    const filteredTasks = tasks
        .filter(task => filter === 'all' || task.status === filter)
        .sort((a, b) => b.id - a.id); // most recent first

    return (
        <RoleGate role="reviewer">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">🔍 Reviewer Dashboard</h2>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-4">
                    {['all', 'pending', 'in-review', 'approved', 'changes-requested'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as TaskStatus | 'all')}
                            className={`px-3 py-1 rounded text-sm border ${filter === status
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-100 text-gray-800'
                                }`}
                        >
                            {status === 'all' ? 'All' : status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </button>
                    ))}
                </div>

                {filteredTasks.length === 0 ? (
                    <p className="text-gray-500">No tasks in this status.</p>
                ) : (
                    <ul className="space-y-4">
                        {filteredTasks.map(task => (
                            <li key={task.id} className="p-4 border rounded bg-white shadow">
                                <p className="font-medium">{task.text}</p>
                                <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>

                                <div className="space-x-2">
                                    {['approved', 'changes-requested', 'in-review'].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(task.id, s as TaskStatus)}
                                            className={`px-3 py-1 rounded text-sm border ${task.status === s
                                                    ? 'bg-blue-100 border-blue-400'
                                                    : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {s.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </RoleGate>
    );
}
