import type { CategoryCode, Place } from "@/types/candidate";

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  distance: string;
  place_url: string;
  phone: string;
}

interface KakaoResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

interface FetchPlacesParams {
  lat: number;
  lng: number;
  category: CategoryCode;
  radius?: number;
}

interface FetchPlacesResult {
  places: Place[];
  error?: string;
}

export async function fetchNearbyPlaces(
  params: FetchPlacesParams
): Promise<FetchPlacesResult> {
  const { lat, lng, category, radius = 1000 } = params;

  if (!lat || !lng) {
    return { places: [], error: "좌표가 필요합니다." };
  }

  const apiKey = process.env.KAKAO_REST_API_KEY;
  if (!apiKey) {
    return { places: [], error: "API 키가 설정되지 않았습니다." };
  }

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category}&x=${lng}&y=${lat}&radius=${radius}&sort=distance&size=15`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Kakao API 호출 실패");
    }

    const data: KakaoResponse = await response.json();

    const places: Place[] = data.documents.map((doc) => ({
      id: doc.id,
      name: doc.place_name,
      category: doc.category_name.split(" > ").pop() || doc.category_name,
      address: doc.road_address_name || doc.address_name,
      lat: parseFloat(doc.y),
      lng: parseFloat(doc.x),
      distance: parseInt(doc.distance),
      url: doc.place_url,
      phone: doc.phone,
    }));

    return { places };
  } catch (error) {
    console.error("Place service error:", error);
    return { places: [], error: "주변 장소 검색 중 오류가 발생했습니다." };
  }
}
