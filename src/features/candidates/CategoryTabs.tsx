'use client';

import { CATEGORIES, type CategoryCode } from '@/types/candidate';

interface CategoryTabsProps {
  selected: CategoryCode;
  onSelect: (category: CategoryCode) => void;
}

const categoryOrder: CategoryCode[] = ['CE7', 'FD6', 'CT1', 'AT4'];

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex border-b border-gray-200 bg-white overflow-x-auto">
      {categoryOrder.map((code) => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          className={`flex-1 min-w-fit py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${
            selected === code
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500'
          }`}
        >
          {CATEGORIES[code].name}
        </button>
      ))}
    </div>
  );
}
