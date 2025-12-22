'use client';

import type { Origin } from '@/types/origin';

interface OriginCardProps {
  label: 'A' | 'B';
  origin: Origin | null;
  onSearchClick: () => void;
  onCurrentLocationClick: () => void;
  isLoadingLocation?: boolean;
}

export default function OriginCard({
  label,
  origin,
  onSearchClick,
  onCurrentLocationClick,
  isLoadingLocation = false,
}: OriginCardProps) {
  const isA = label === 'A';
  const dotColor = isA ? 'bg-[var(--color-origin-a)]' : 'bg-[var(--color-origin-b)]';

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className={`w-3 h-3 rounded-full ${dotColor} shrink-0`} />

      {origin ? (
        <div className="flex-1 min-w-0" onClick={onSearchClick}>
          <p className="text-sm font-medium text-gray-900 truncate">{origin.name}</p>
          <p className="text-xs text-gray-500 truncate">{origin.address}</p>
        </div>
      ) : (
        <button
          onClick={onSearchClick}
          className="flex-1 text-left text-sm text-gray-400"
        >
          {isA ? '출발지 입력' : '도착지 입력'}
        </button>
      )}

      <button
        onClick={onCurrentLocationClick}
        disabled={isLoadingLocation}
        className="p-2 text-gray-500 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
        title="현재 위치"
      >
        {isLoadingLocation ? (
          <div className="spinner" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
          </svg>
        )}
      </button>

      {origin && (
        <button
          onClick={onSearchClick}
          className="text-xs text-[var(--naver-green)] font-medium"
        >
          변경
        </button>
      )}
    </div>
  );
}
