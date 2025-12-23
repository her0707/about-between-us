import {
  KAKAO_API_CACHE_SECONDS,
  MAX_SUBWAY_CANDIDATES,
} from "@/constants/candidate";
import {
  calculateAccessibilityScore,
  calculateGeometricMiddle,
  calculateSearchRadius,
  getDistanceKm,
  isValidCoordinate,
} from "@/utils/candidateUtils";
import type { CandidateArea } from "@/types/candidate";

interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface KakaoResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
  };
}

interface FetchCandidatesParams {
  aLat: number;
  aLng: number;
  bLat: number;
  bLng: number;
}

interface FetchCandidatesResult {
  candidates: CandidateArea[];
  error?: string;
}

export async function fetchCandidates(
  params: FetchCandidatesParams
): Promise<FetchCandidatesResult> {
  const { aLat, aLng, bLat, bLng } = params;

  if (!aLat || !aLng || !bLat || !bLng) {
    return { candidates: [], error: "출발지 좌표가 필요합니다." };
  }

  if (!isValidCoordinate(aLat, aLng) || !isValidCoordinate(bLat, bLng)) {
    return { candidates: [], error: "유효하지 않은 좌표입니다." };
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    return { candidates: [], error: "API 키가 설정되지 않았습니다." };
  }

  const originA = { lat: aLat, lng: aLng };
  const originB = { lat: bLat, lng: bLng };

  try {
    const candidates: CandidateArea[] = [];

    // 1. 기하학적 중간점 추가
    const geometricMiddle = calculateGeometricMiddle(originA, originB);
    candidates.push({
      id: "geometric-middle",
      name: "중간 지점",
      type: "geometric",
      lat: geometricMiddle.lat,
      lng: geometricMiddle.lng,
      distanceFromA: getDistanceKm(geometricMiddle, originA),
      distanceFromB: getDistanceKm(geometricMiddle, originB),
      accessibilityScore: calculateAccessibilityScore(
        geometricMiddle,
        originA,
        originB
      ),
    });

    // 2. 주변 지하철역 검색
    const searchRadius = calculateSearchRadius(originA, originB);
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=SW8&x=${geometricMiddle.lng}&y=${geometricMiddle.lat}&radius=${searchRadius}&sort=distance&size=10`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
        next: { revalidate: KAKAO_API_CACHE_SECONDS },
      }
    );

    if (!response.ok) {
      throw new Error("Kakao API 호출 실패");
    }

    const data: KakaoResponse = await response.json();

    // 3. 지하철역들을 후보지로 추가
    for (const station of data.documents) {
      const stationPoint = {
        lat: parseFloat(station.y),
        lng: parseFloat(station.x),
      };

      candidates.push({
        id: station.id,
        name: station.place_name,
        type: "subway",
        lat: stationPoint.lat,
        lng: stationPoint.lng,
        distanceFromA: getDistanceKm(stationPoint, originA),
        distanceFromB: getDistanceKm(stationPoint, originB),
        accessibilityScore: calculateAccessibilityScore(
          stationPoint,
          originA,
          originB
        ),
        address: station.road_address_name || station.address_name,
      });
    }

    // 4. 접근성 점수 기준 정렬 (기하학적 중간점은 항상 첫 번째)
    const geometricCandidate = candidates[0];
    const sortedSubways = candidates
      .slice(1)
      .sort((a, b) => b.accessibilityScore - a.accessibilityScore)
      .slice(0, MAX_SUBWAY_CANDIDATES);

    return { candidates: [geometricCandidate, ...sortedSubways] };
  } catch (error) {
    console.error("Candidates service error:", error);
    return { candidates: [], error: "후보지 검색 중 오류가 발생했습니다." };
  }
}
