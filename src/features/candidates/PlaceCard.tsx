"use client";

import { getNaverMapUrl } from "@/utils/mapLinks";

interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  url: string;
  phone: string;
}

interface PlaceCardProps {
  place: Place;
  index: number;
}

export default function PlaceCard({ place, index }: PlaceCardProps) {
  const formatDistance = (m: number) => {
    if (m < 1000) return `${m}m`;
    return `${(m / 1000).toFixed(1)}km`;
  };

  const handleNaverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getNaverMapUrl({
      lat: place.lat,
      lng: place.lng,
      name: place.name,
      address: place.address,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-start gap-3 p-3 border-b border-gray-100">
      <span className="w-6 h-6 bg-primary text-white text-xs font-medium rounded flex items-center justify-center shrink-0">
        {index + 1}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
          <span className="text-xs text-gray-400 shrink-0">{formatDistance(place.distance)}</span>
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{place.address}</p>
        <p className="text-xs text-primary mt-0.5">{place.category}</p>

        {/* Map buttons */}
        <div className="flex gap-2 mt-2">
          <a
            href={place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all hover:opacity-90"
            style={{ backgroundColor: '#FEE500', color: '#000000' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            카카오맵
          </a>
          <button
            onClick={handleNaverClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-md transition-all hover:opacity-90"
            style={{ backgroundColor: '#03C75A' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            네이버지도
          </button>
        </div>
      </div>
    </div>
  );
}
