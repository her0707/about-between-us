interface PlaceInfo {
  lat: number;
  lng: number;
  name: string;
  address?: string;
}

/**
 * 네이버 지도 URL 생성
 * 모바일: 네이버 지도 앱 스킴 (없으면 웹으로 fallback)
 * 데스크톱: 네이버 지도 웹
 */
export function getNaverMapUrl(place: PlaceInfo): string {
  const encodedName = encodeURIComponent(place.name);

  // 모바일 체크는 클라이언트에서만 가능
  if (typeof window !== "undefined") {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 네이버 지도 앱 스킴
      return `nmap://place?lat=${place.lat}&lng=${place.lng}&name=${encodedName}&appname=aboutbetweenus`;
    }
  }

  // 웹 URL - 주소 + 장소명으로 검색 (더 정확한 결과)
  const searchQuery = place.address
    ? `${place.address} ${place.name}`
    : place.name;
  const encodedQuery = encodeURIComponent(searchQuery);
  return `https://map.naver.com/v5/search/${encodedQuery}`;
}

/**
 * 네이버 지도 길찾기 URL 생성 (대중교통)
 */
export function getNaverRouteUrl(destination: PlaceInfo): string {
  const encodedName = encodeURIComponent(destination.name);

  if (typeof window !== "undefined") {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 네이버 지도 앱 길찾기 (대중교통)
      return `nmap://route/public?dlat=${destination.lat}&dlng=${destination.lng}&dname=${encodedName}&appname=aboutbetweenus`;
    }
  }

  // 웹 URL - 도착지만 설정 (출발지는 사용자가 직접 입력)
  return `https://map.naver.com/v5/directions/-/-/-/transit?c=${destination.lng},${destination.lat},15,0,0,0,dh`;
}

/**
 * 카카오 지도 URL 생성
 */
export function getKakaoMapUrl(place: PlaceInfo & { url?: string }): string {
  // 카카오 place URL이 있으면 그대로 사용
  if (place.url) {
    return place.url;
  }

  const encodedName = encodeURIComponent(place.name);

  if (typeof window !== "undefined") {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 카카오맵 앱 스킴
      return `kakaomap://look?p=${place.lat},${place.lng}`;
    }
  }

  // 웹 URL
  return `https://map.kakao.com/link/search/${encodedName}`;
}
