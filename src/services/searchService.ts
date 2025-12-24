interface SearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface SearchResponse {
  results: SearchResult[];
  error?: string;
}

export async function searchAddress(query: string): Promise<SearchResponse> {
  if (!query.trim()) {
    return { results: [], error: "검색어를 입력해주세요." };
  }

  try {
    const response = await fetch("/api/places/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { results: [], error: data.error || "검색 실패" };
    }

    const data = await response.json();
    return { results: data.results };
  } catch (error) {
    console.error("Search service error:", error);
    return { results: [], error: "검색 중 오류가 발생했습니다." };
  }
}
