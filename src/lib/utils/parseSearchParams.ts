interface OriginParams {
  aLat?: string;
  aLng?: string;
  aName?: string;
  aAddr?: string;
  bLat?: string;
  bLng?: string;
  bName?: string;
  bAddr?: string;
}

export function parseOriginParams(params: OriginParams) {
  return {
    originA: {
      lat: parseFloat(params.aLat || "0"),
      lng: parseFloat(params.aLng || "0"),
      name: params.aName || "출발지 A",
      address: params.aAddr || "",
    },
    originB: {
      lat: parseFloat(params.bLat || "0"),
      lng: parseFloat(params.bLng || "0"),
      name: params.bName || "출발지 B",
      address: params.bAddr || "",
    },
  };
}

interface DetailParams {
  lat?: string;
  lng?: string;
  name?: string;
  category?: string;
  aName?: string;
  bName?: string;
}

export function parseDetailParams(params: DetailParams) {
  return {
    lat: parseFloat(params.lat || "0"),
    lng: parseFloat(params.lng || "0"),
    name: params.name || "선택한 지역",
    category: params.category || "CE7",
    aName: params.aName || "출발지 A",
    bName: params.bName || "출발지 B",
  };
}
