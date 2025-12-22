'use client';

import { useState, useEffect, useRef } from 'react';
import type { Origin } from '@/types/origin';

interface SearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (origin: Origin) => void;
  label: 'A' | 'B';
}

export default function AddressSearchModal({
  isOpen,
  onClose,
  onSelect,
  label,
}: AddressSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/places/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '검색 실패');
      }

      const data = await response.json();
      setResults(data.results);

      if (data.results.length === 0) {
        setError('검색 결과가 없습니다.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = (result: SearchResult) => {
    onSelect({
      name: result.name,
      address: result.address,
      lat: result.lat,
      lng: result.lng,
    });
    onClose();
  };

  const isA = label === 'A';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 pt-safe">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-600"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 className="text-base font-medium text-gray-900">
          {isA ? '출발지' : '도착지'} 검색
        </h2>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="장소, 주소 검색"
              className="w-full h-10 px-3 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="h-10 px-4 bg-primary text-white text-sm font-medium rounded-lg disabled:opacity-50"
          >
            {isLoading ? <div className="spinner" style={{ borderTopColor: 'white' }} /> : '검색'}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {error && (
          <p className="text-center text-sm text-gray-500 py-8">{error}</p>
        )}

        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index} className="border-b border-gray-100">
                <button
                  onClick={() => handleSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 active:bg-gray-100"
                >
                  <p className="text-sm font-medium text-gray-900">{result.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{result.address}</p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {!error && results.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 opacity-50">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <p className="text-sm">장소를 검색해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
