"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import type { Origin } from "@/types/origin";

interface SearchModalState {
  isOpen: boolean;
  target: "A" | "B";
}

export function useOriginInput() {
  const router = useRouter();
  const [originA, setOriginA] = useState<Origin | null>(null);
  const [originB, setOriginB] = useState<Origin | null>(null);
  const [searchModal, setSearchModal] = useState<SearchModalState>({
    isOpen: false,
    target: "A",
  });
  const [loadingLocation, setLoadingLocation] = useState<"A" | "B" | null>(
    null
  );
  const { getCurrentLocation, error: locationError } = useCurrentLocation();

  const openSearchModal = useCallback((target: "A" | "B") => {
    setSearchModal({ isOpen: true, target });
  }, []);

  const closeSearchModal = useCallback(() => {
    setSearchModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleSearchSelect = useCallback(
    (origin: Origin) => {
      if (searchModal.target === "A") {
        setOriginA(origin);
      } else {
        setOriginB(origin);
      }
    },
    [searchModal.target]
  );

  const handleCurrentLocation = useCallback(
    async (target: "A" | "B") => {
      setLoadingLocation(target);
      const location = await getCurrentLocation();
      if (location) {
        if (target === "A") {
          setOriginA(location);
        } else {
          setOriginB(location);
        }
      }
      setLoadingLocation(null);
    },
    [getCurrentLocation]
  );

  const isComplete = originA !== null && originB !== null;

  const navigateToCandidates = useCallback(() => {
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
  }, [isComplete, originA, originB, router]);

  return {
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
  };
}
