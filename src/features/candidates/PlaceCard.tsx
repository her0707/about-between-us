'use client';

interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
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

  return (
    <a
      href={place.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100"
    >
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
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 shrink-0 mt-1">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </a>
  );
}
