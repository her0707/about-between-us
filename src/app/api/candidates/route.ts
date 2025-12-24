import { NextResponse } from "next/server";
import { fetchCandidates } from "@/services/candidateService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const aLat = parseFloat(searchParams.get("aLat") || "0");
  const aLng = parseFloat(searchParams.get("aLng") || "0");
  const bLat = parseFloat(searchParams.get("bLat") || "0");
  const bLng = parseFloat(searchParams.get("bLng") || "0");

  const { candidates, error } = await fetchCandidates({
    aLat,
    aLng,
    bLat,
    bLng,
  });

  if (error) {
    const status = error.includes("API 키") ? 500 : 400;
    return NextResponse.json({ error }, { status });
  }

  return NextResponse.json({ candidates });
}
