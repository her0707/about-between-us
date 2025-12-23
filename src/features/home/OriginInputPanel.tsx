"use client";

import OriginCard from "@/features/origin-input/OriginCard";
import type { Origin } from "@/types/origin";

interface OriginInputPanelProps {
  originA: Origin | null;
  originB: Origin | null;
  loadingLocation: "A" | "B" | null;
  locationError: string | null;
  onSearchClick: (target: "A" | "B") => void;
  onCurrentLocationClick: (target: "A" | "B") => void;
  onFindMiddle: () => void;
  isComplete: boolean;
}

export default function OriginInputPanel({
  originA,
  originB,
  loadingLocation,
  locationError,
  onSearchClick,
  onCurrentLocationClick,
  onFindMiddle,
  isComplete,
}: OriginInputPanelProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 animate-slide-up">
      <div className="p-4 space-y-3">
        <OriginCard
          label="A"
          origin={originA}
          onSearchClick={() => onSearchClick("A")}
          onCurrentLocationClick={() => onCurrentLocationClick("A")}
          isLoadingLocation={loadingLocation === "A"}
        />

        <OriginCard
          label="B"
          origin={originB}
          onSearchClick={() => onSearchClick("B")}
          onCurrentLocationClick={() => onCurrentLocationClick("B")}
          isLoadingLocation={loadingLocation === "B"}
        />

        {locationError && (
          <p className="text-sm text-red-500 px-1">{locationError}</p>
        )}

        <button
          onClick={onFindMiddle}
          disabled={!isComplete}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
            isComplete
              ? "bg-primary text-white active:bg-primary-dark"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {isComplete ? "중간 지점 찾기" : "출발지를 모두 입력해주세요"}
        </button>
      </div>
      <div className="pb-safe" />
    </div>
  );
}
