'use client';

import type { CandidateArea } from '@/types/candidate';

interface CandidateBottomSheetProps {
  candidates: CandidateArea[];
  onSelect: (candidate: CandidateArea) => void;
}

export default function CandidateBottomSheet({
  candidates,
  onSelect,
}: CandidateBottomSheetProps) {
  const formatDistance = (km: number) => {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km.toFixed(1)}km`;
  };

  return (
    <div className="bg-white rounded-t-2xl shadow-lg">
      {/* 드래그 핸들 */}
      <div className="flex justify-center py-3">
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* 헤더 */}
      <div className="px-4 pb-3 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">
          후보 지역 {candidates.length}곳
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          원하는 지역을 선택하세요
        </p>
      </div>

      {/* 후보지 목록 */}
      <div className="max-h-[40vh] overflow-y-auto">
        {candidates.map((candidate, index) => (
          <button
            key={candidate.id}
            onClick={() => onSelect(candidate)}
            className="w-full flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 text-left"
          >
            {/* 번호 */}
            <span
              className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-full text-xs font-semibold ${
                candidate.type === 'geometric'
                  ? 'bg-amber-500 text-white'
                  : 'bg-primary text-white'
              }`}
            >
              {index + 1}
            </span>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {candidate.name}
                </p>
                {candidate.type === 'subway' && (
                  <span className="text-xs text-gray-400">🚇</span>
                )}
              </div>

              {candidate.address && (
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {candidate.address}
                </p>
              )}

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-primary font-medium">
                  접근성 {candidate.accessibilityScore}점
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500">
                  A {formatDistance(candidate.distanceFromA)} / B{' '}
                  {formatDistance(candidate.distanceFromB)}
                </span>
              </div>
            </div>

            {/* 화살표 */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-300 shrink-0 mt-1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
