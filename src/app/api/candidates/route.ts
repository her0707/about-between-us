import { NextResponse } from 'next/server';
import {
  calculateAccessibilityScore,
  calculateGeometricMiddle,
  calculateSearchRadius,
  getDistanceKm,
} from '@/lib/utils/candidateUtils';
import type { CandidateArea } from '@/types/candidate';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const aLat = parseFloat(searchParams.get('aLat') || '0');
  const aLng = parseFloat(searchParams.get('aLng') || '0');
  const bLat = parseFloat(searchParams.get('bLat') || '0');
  const bLng = parseFloat(searchParams.get('bLng') || '0');

  if (!aLat || !aLng || !bLat || !bLng) {
    return NextResponse.json(
      { error: '출발지 좌표가 필요합니다.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API 키가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  const originA = { lat: aLat, lng: aLng };
  const originB = { lat: bLat, lng: bLng };

  try {
    const candidates: CandidateArea[] = [];

    // 1. 기하학적 중간점 추가
    const geometricMiddle = calculateGeometricMiddle(originA, originB);
    candidates.push({
      id: 'geometric-middle',
      name: '중간 지점',
      type: 'geometric',
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
      }
    );

    if (!response.ok) {
      throw new Error('Kakao API 호출 실패');
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
        type: 'subway',
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
      .slice(0, 4); // 상위 4개 지하철역

    const result = [geometricCandidate, ...sortedSubways];

    return NextResponse.json({ candidates: result });
  } catch (error) {
    console.error('Candidates API error:', error);
    return NextResponse.json(
      { error: '후보지 검색 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
