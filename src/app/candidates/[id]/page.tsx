import { Suspense } from "react";
import { fetchNearbyPlaces } from "@/services/placeService";
import { parseDetailParams } from "@/lib/utils/parseSearchParams";
import CandidateDetailClient from "@/features/candidate-detail/CandidateDetailClient";
import Spinner from "@/components/common/Spinner";
import type { CategoryCode } from "@/types/candidate";

interface CandidateDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    lat?: string;
    lng?: string;
    name?: string;
    category?: string;
    aName?: string;
    bName?: string;
  }>;
}

async function CandidateDetailContent({
  searchParams,
}: {
  searchParams: CandidateDetailPageProps["searchParams"];
}) {
  const params = await searchParams;
  const { lat, lng, name, category } = parseDetailParams(params);

  const { places, error } = await fetchNearbyPlaces({
    lat,
    lng,
    category: category as CategoryCode,
    radius: 2000,
  });

  return (
    <CandidateDetailClient
      places={places}
      middlePoint={{ lat, lng }}
      name={name}
      category={category as CategoryCode}
      error={error}
    />
  );
}

export default async function CandidateDetailPage({
  searchParams,
}: CandidateDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-dvh flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <CandidateDetailContent searchParams={searchParams} />
    </Suspense>
  );
}
