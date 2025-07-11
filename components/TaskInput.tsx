'use client';

import { Dispatch, SetStateAction } from 'react';

type TaskInputProps = {
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    onAdd: () => void;
};

export default function TaskInput({ input, setInput, onAdd }: TaskInputProps) {
    return (
        <div className="flex gap-3 mb-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={onAdd}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition"
            >
                Add
            </button>
        </div>
    );
}
