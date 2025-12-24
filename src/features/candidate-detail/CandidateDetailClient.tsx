"use client";

import dynamic from "next/dynamic";
import PageHeader from "@/components/common/PageHeader";
import Spinner from "@/components/common/Spinner";
import CategoryTabs from "@/features/candidates/CategoryTabs";
import PlaceCard from "@/features/candidates/PlaceCard";
import { usePlaces } from "@/hooks/usePlaces";
import type { CategoryCode, Place } from "@/types/candidate";

const KakaoMap = dynamic(() => import("@/components/map/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <Spinner />
    </div>
  ),
});

interface CandidateDetailClientProps {
  places: Place[];
  middlePoint: { lat: number; lng: number };
  name: string;
  category: CategoryCode;
  error?: string;
}

export default function CandidateDetailClient({
  places,
  middlePoint,
  name,
  category,
  error,
}: CandidateDetailClientProps) {
  const { setCategory } = usePlaces(category);

  if (error) {
    return (
      <div className="h-dvh w-full flex flex-col overflow-hidden">
        <PageHeader title={`${name} 주변`} />
        <div className="flex-1 flex items-center justify-center bg-white">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <PageHeader title={`${name} 주변`} />

      {/* Map */}
      <div className="shrink-0">
        <KakaoMap
          middlePoint={middlePoint}
          places={places.map((p) => ({
            id: p.id,
            name: p.name,
            lat: p.lat,
            lng: p.lng,
          }))}
        />
      </div>

      {/* Category Tabs */}
      <div className="shrink-0">
        <CategoryTabs selected={category} onSelect={setCategory} />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto bg-white min-h-0">
        {places.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-8">
            주변에 장소가 없습니다.
          </p>
        )}

        {places.length > 0 && (
          <div>
            {places.map((place, index) => (
              <PlaceCard key={place.id} place={place} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
