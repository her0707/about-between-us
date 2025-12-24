"use client";

import dynamic from "next/dynamic";
import { useOriginInput } from "@/hooks/useOriginInput";
import TopSearchBar from "@/features/home/TopSearchBar";
import OriginInputPanel from "@/features/home/OriginInputPanel";
import AddressSearchModal from "@/features/origin-input/AddressSearchModal";

const KakaoMap = dynamic(() => import("@/components/map/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="spinner" />
    </div>
  ),
});

export default function HomeClient() {
  const {
    originA,
    originB,
    searchModal,
    loadingLocation,
    locationError,
    isComplete,
    openSearchModal,
    closeSearchModal,
    handleSearchSelect,
    handleCurrentLocation,
    navigateToCandidates,
  } = useOriginInput();

  return (
    <div className="h-dvh w-full relative overflow-hidden">
      {/* Map */}
      <div className="absolute inset-0">
        <KakaoMap originA={originA} originB={originB} />
      </div>

      {/* Top Search Bar */}
      <TopSearchBar />

      {/* Bottom Panel */}
      <OriginInputPanel
        originA={originA}
        originB={originB}
        loadingLocation={loadingLocation}
        locationError={locationError}
        onSearchClick={openSearchModal}
        onCurrentLocationClick={handleCurrentLocation}
        onFindMiddle={navigateToCandidates}
        isComplete={isComplete}
      />

      {/* Search Modal */}
      <AddressSearchModal
        isOpen={searchModal.isOpen}
        onClose={closeSearchModal}
        onSelect={handleSearchSelect}
        label={searchModal.target}
      />
    </div>
  );
}
