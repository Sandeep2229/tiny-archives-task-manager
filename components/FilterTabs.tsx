'use client';

import { Dispatch, SetStateAction } from 'react';

type Filter = 'all' | 'active' | 'completed';

type FilterTabsProps = {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function FilterTabs({ filter, setFilter }: FilterTabsProps) {
    return (
        <div className="flex justify-center gap-2 mb-4">
            {['all', 'active', 'completed'].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type as Filter)}
                    className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${filter === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {type}
                </button>
            ))}
        </div>
    );
}
