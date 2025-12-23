"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Spinner from "@/components/common/Spinner";
import CandidateBottomSheet from "@/features/candidates/CandidateBottomSheet";
import type { CandidateArea } from "@/types/candidate";

const KakaoMap = dynamic(() => import("@/components/map/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <Spinner />
    </div>
  ),
});

interface CandidatesClientProps {
  candidates: CandidateArea[];
  originA: { lat: number; lng: number; name: string; address: string };
  originB: { lat: number; lng: number; name: string; address: string };
  error?: string;
}

export default function CandidatesClient({
  candidates,
  originA,
  originB,
  error,
}: CandidatesClientProps) {
  const router = useRouter();

  const handleCandidateSelect = useCallback(
    (candidate: CandidateArea) => {
      const params = new URLSearchParams({
        lat: candidate.lat.toString(),
        lng: candidate.lng.toString(),
        name: candidate.name,
        aName: originA.name,
        bName: originB.name,
      });
      router.push(`/candidates/${candidate.id}?${params.toString()}`);
    },
    [router, originA.name, originB.name]
  );

  if (error) {
    return (
      <div className="h-dvh w-full flex flex-col overflow-hidden">
        <PageHeader title="중간 지점 추천" />
        <div className="flex-1 flex items-center justify-center bg-white">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <PageHeader title="중간 지점 추천" />

      {/* Map */}
      <div className="flex-1 relative">
        <KakaoMap
          originA={originA}
          originB={originB}
          candidateAreas={candidates}
          onCandidateClick={handleCandidateSelect}
        />
      </div>

      {/* Bottom Sheet */}
      {candidates.length > 0 && (
        <div className="shrink-0">
          <CandidateBottomSheet
            candidates={candidates}
            onSelect={handleCandidateSelect}
          />
        </div>
      )}

      {/* No Results */}
      {candidates.length === 0 && (
        <div className="shrink-0 p-4 bg-white border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            주변에 추천할 지역이 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
