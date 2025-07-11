'use client';

import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import dynamic from 'next/dynamic';

const TaskCard = dynamic(() => import('@/components/TaskCard'));
const TaskInput = dynamic(() => import('@/components/TaskInput'));
const FilterTabs = dynamic(() => import('@/components/FilterTabs'));
const Header = dynamic(() => import('@/components/Header'));


type TaskStatus = 'pending' | 'in-review' | 'approved' | 'changes-requested';

type Task = {
  id: number;
  text: string;
  completed: boolean;
  status: TaskStatus;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        status: 'in-review', // Default status
      },
    ]);
    setInput('');
    toast.success('Task added!');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.error('Task deleted');
  };

  const updateTaskStatus = (id: number, newStatus: TaskStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
    toast.success(`Status updated to "${newStatus}"`);
  };

  const clearCompleted = () => {
    const remaining = tasks.filter(task => !task.completed);
    if (remaining.length === tasks.length) return;
    setTasks(remaining);
    toast.success('Cleared completed tasks!');
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all'
      ? true
      : filter === 'active'
        ? !task.completed
        : task.completed
  );

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Toaster position="top-right" />
      <Image
        src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1950&q=80"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 w-full max-w-xl backdrop-blur-sm">
        <Header />
        <TaskInput input={input} setInput={setInput} onAdd={addTask} />
        <FilterTabs filter={filter} setFilter={setFilter} />

        {tasks.some(task => task.completed) && (
          <div className="flex justify-center mb-4">
            <button
              onClick={clearCompleted}
              className="text-sm px-4 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200"
            >
              Clear Completed
            </button>
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No {filter} tasks found.
          </p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence>
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onStatusChange={(newStatus) => {
                    const updated = tasks.map(t =>
                      t.id === task.id ? { ...t, status: newStatus } : t
                    );
                    setTasks(updated);
                    localStorage.setItem('tasks', JSON.stringify(updated));
                  }}
                />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </main>
  );
}
