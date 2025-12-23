import { Suspense } from "react";
import { fetchCandidates } from "@/services/candidateService";
import { parseOriginParams } from "@/lib/utils/parseSearchParams";
import CandidatesClient from "@/features/candidates/CandidatesClient";
import Spinner from "@/components/common/Spinner";

interface CandidatesPageProps {
  searchParams: Promise<{
    aLat?: string;
    aLng?: string;
    aName?: string;
    aAddr?: string;
    bLat?: string;
    bLng?: string;
    bName?: string;
    bAddr?: string;
  }>;
}

async function CandidatesContent({
  searchParams,
}: {
  searchParams: CandidatesPageProps["searchParams"];
}) {
  const params = await searchParams;
  const { originA, originB } = parseOriginParams(params);

  const { candidates, error } = await fetchCandidates({
    aLat: originA.lat,
    aLng: originA.lng,
    bLat: originB.lat,
    bLng: originB.lng,
  });

  return (
    <CandidatesClient
      candidates={candidates}
      originA={originA}
      originB={originB}
      error={error}
    />
  );
}

export default async function CandidatesPage({
  searchParams,
}: CandidatesPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-dvh flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <CandidatesContent searchParams={searchParams} />
    </Suspense>
  );
}
