import {
  KOREA_LAT_MAX,
  KOREA_LAT_MIN,
  KOREA_LNG_MAX,
  KOREA_LNG_MIN,
  MAX_REFERENCE_DISTANCE_KM,
  MAX_SEARCH_RADIUS_M,
  MIN_SEARCH_RADIUS_M,
  SEARCH_RADIUS_RATIO,
} from "@/constants/candidate";

interface Point {
  lat: number;
  lng: number;
}

/**
 * 좌표가 유효한 범위 내에 있는지 검증
 */
export function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    lat >= KOREA_LAT_MIN &&
    lat <= KOREA_LAT_MAX &&
    lng >= KOREA_LNG_MIN &&
    lng <= KOREA_LNG_MAX
  );
}

/**
 * Haversine 공식을 사용하여 두 지점 사이의 거리를 km로 계산
 */
export function getDistanceKm(point1: Point, point2: Point): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * 접근성 점수 계산 (0-100)
 * - 균형도 (60%): 두 출발지에서의 거리가 비슷할수록 높음
 * - 총 이동거리 (40%): 짧을수록 높음
 */
export function calculateAccessibilityScore(
  candidate: Point,
  originA: Point,
  originB: Point
): number {
  const distA = getDistanceKm(candidate, originA);
  const distB = getDistanceKm(candidate, originB);

  // 균형도: 두 거리가 비슷할수록 높은 점수
  const maxDist = Math.max(distA, distB);
  const balance = maxDist > 0 ? 1 - Math.abs(distA - distB) / maxDist : 1;

  // 총 이동거리: 짧을수록 높은 점수
  const totalDistance = distA + distB;
  const distanceScore = Math.max(0, 1 - totalDistance / MAX_REFERENCE_DISTANCE_KM);

  return Math.round(balance * 60 + distanceScore * 40);
}

/**
 * A-B 거리 기반 검색 반경 계산 (미터)
 * - 최소 2km, 최대 10km
 * - A-B 거리의 40%
 */
export function calculateSearchRadius(originA: Point, originB: Point): number {
  const distanceAB = getDistanceKm(originA, originB);
  const radius = distanceAB * SEARCH_RADIUS_RATIO * 1000; // km -> m
  return Math.min(Math.max(radius, MIN_SEARCH_RADIUS_M), MAX_SEARCH_RADIUS_M);
}

/**
 * 기하학적 중간점 계산
 */
export function calculateGeometricMiddle(originA: Point, originB: Point): Point {
  return {
    lat: (originA.lat + originB.lat) / 2,
    lng: (originA.lng + originB.lng) / 2,
  };
}
