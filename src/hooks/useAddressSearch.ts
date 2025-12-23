"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { searchAddress } from "@/services/searchService";

interface SearchResult {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export function useAddressSearch(isOpen: boolean) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    const { results: searchResults, error: searchError } =
      await searchAddress(query);

    if (searchError) {
      setError(searchError);
    } else {
      setResults(searchResults);
      if (searchResults.length === 0) {
        setError("검색 결과가 없습니다.");
      }
    }

    setIsLoading(false);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    inputRef,
    handleSearch,
  };
}
