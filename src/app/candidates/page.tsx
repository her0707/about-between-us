"use client";

import PlaceCard from "@/features/candidates/PlaceCard";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const KakaoMap = dynamic(() => import("@/components/map/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="spinner" />
    </div>
  ),
});

interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  url: string;
  phone: string;
}

type Category = "CE7" | "FD6";

function CandidatesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>("CE7");

  const aLat = parseFloat(searchParams.get("aLat") || "0");
  const aLng = parseFloat(searchParams.get("aLng") || "0");
  const aName = searchParams.get("aName") || "출발지 A";
  const bLat = parseFloat(searchParams.get("bLat") || "0");
  const bLng = parseFloat(searchParams.get("bLng") || "0");
  const bName = searchParams.get("bName") || "출발지 B";

  // 중간 지점 계산
  const middlePoint = {
    lat: (aLat + bLat) / 2,
    lng: (aLng + bLng) / 2,
  };

  const originA = { lat: aLat, lng: aLng, name: aName, address: "" };
  const originB = { lat: bLat, lng: bLng, name: bName, address: "" };

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/places/nearby?lat=${middlePoint.lat}&lng=${middlePoint.lng}&category=${category}&radius=2000`
        );

        if (!response.ok) {
          throw new Error("장소 검색 실패");
        }

        const data = await response.json();
        setPlaces(data.places);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (aLat && aLng && bLat && bLng) {
      fetchPlaces();
    }
  }, [category, middlePoint.lat, middlePoint.lng, aLat, aLng, bLat, bLng]);

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white pt-safe">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-gray-600"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-base font-medium text-gray-900">중간 지점 추천</h1>
      </div>

      {/* Map */}
      <div className="shrink-0">
        <KakaoMap
          originA={originA}
          originB={originB}
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
      <div className="shrink-0 flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setCategory("CE7")}
          className={`flex-1 py-3 text-sm font-medium ${
            category === "CE7"
              ? "text-[var(--naver-green)] border-b-2 border-[var(--naver-green)]"
              : "text-gray-500"
          }`}
        >
          카페
        </button>
        <button
          onClick={() => setCategory("FD6")}
          className={`flex-1 py-3 text-sm font-medium ${
            category === "FD6"
              ? "text-[var(--naver-green)] border-b-2 border-[var(--naver-green)]"
              : "text-gray-500"
          }`}
        >
          음식점
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto bg-white min-h-0">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="spinner" />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-500 py-8">{error}</p>
        )}

        {!isLoading && !error && places.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-8">
            주변에 장소가 없습니다.
          </p>
        )}

        {!isLoading && places.length > 0 && (
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

export default function CandidatesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[100dvh] flex items-center justify-center">
          <div className="spinner" />
        </div>
      }
    >
      <CandidatesContent />
    </Suspense>
  );
}
