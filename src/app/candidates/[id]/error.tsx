"use client";

import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CandidateDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Candidate detail page error:", error);
  }, [error]);

  return (
    <div className="h-dvh w-full flex flex-col overflow-hidden">
      <PageHeader title="장소 상세" />
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
        <p className="text-sm text-red-500 mb-4">
          페이지를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm bg-primary text-white rounded-lg"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
