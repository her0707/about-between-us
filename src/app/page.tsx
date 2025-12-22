'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Origin } from '@/types/origin';
import OriginCard from '@/features/origin-input/OriginCard';
import AddressSearchModal from '@/features/origin-input/AddressSearchModal';
import { useCurrentLocation } from '@/lib/utils/useCurrentLocation';

const KakaoMap = dynamic(() => import('@/components/map/KakaoMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="spinner" />
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const [originA, setOriginA] = useState<Origin | null>(null);
  const [originB, setOriginB] = useState<Origin | null>(null);
  const [searchModal, setSearchModal] = useState<{ isOpen: boolean; target: 'A' | 'B' }>({
    isOpen: false,
    target: 'A',
  });
  const [loadingLocation, setLoadingLocation] = useState<'A' | 'B' | null>(null);

  const { getCurrentLocation, error: locationError } = useCurrentLocation();

  const handleSearchClick = (target: 'A' | 'B') => {
    setSearchModal({ isOpen: true, target });
  };

  const handleSearchSelect = (origin: Origin) => {
    if (searchModal.target === 'A') {
      setOriginA(origin);
    } else {
      setOriginB(origin);
    }
  };

  const handleCurrentLocation = async (target: 'A' | 'B') => {
    setLoadingLocation(target);
    const location = await getCurrentLocation();
    if (location) {
      if (target === 'A') {
        setOriginA(location);
      } else {
        setOriginB(location);
      }
    }
    setLoadingLocation(null);
  };

  const isComplete = originA !== null && originB !== null;

  const handleFindMiddle = () => {
    if (!isComplete) return;

    const params = new URLSearchParams({
      aLat: originA!.lat.toString(),
      aLng: originA!.lng.toString(),
      aName: originA!.name,
      aAddr: originA!.address,
      bLat: originB!.lat.toString(),
      bLng: originB!.lng.toString(),
      bName: originB!.name,
      bAddr: originB!.address,
    });

    router.push(`/candidates?${params.toString()}`);
  };

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden">
      {/* Map */}
      <div className="absolute inset-0">
        <KakaoMap originA={originA} originB={originB} />
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-safe px-4 pb-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--naver-green)] rounded flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="12" cy="12" r="8"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">우리사이 여기쯤</h1>
            <p className="text-xs text-gray-500">두 출발지의 중간 지점 찾기</p>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 animate-slide-up">
        <div className="p-4 space-y-3">
          <OriginCard
            label="A"
            origin={originA}
            onSearchClick={() => handleSearchClick('A')}
            onCurrentLocationClick={() => handleCurrentLocation('A')}
            isLoadingLocation={loadingLocation === 'A'}
          />

          <OriginCard
            label="B"
            origin={originB}
            onSearchClick={() => handleSearchClick('B')}
            onCurrentLocationClick={() => handleCurrentLocation('B')}
            isLoadingLocation={loadingLocation === 'B'}
          />

          {locationError && (
            <p className="text-sm text-red-500 px-1">{locationError}</p>
          )}

          <button
            onClick={handleFindMiddle}
            disabled={!isComplete}
            className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
              isComplete
                ? 'bg-[var(--naver-green)] text-white active:bg-[var(--naver-green-dark)]'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {isComplete ? '중간 지점 찾기' : '출발지를 모두 입력해주세요'}
          </button>
        </div>
        <div className="pb-safe" />
      </div>

      {/* Search Modal */}
      <AddressSearchModal
        isOpen={searchModal.isOpen}
        onClose={() => setSearchModal({ ...searchModal, isOpen: false })}
        onSelect={handleSearchSelect}
        label={searchModal.target}
      />
    </div>
  );
}
