'use client';

import type { Origin } from '@/types/origin';
import { useEffect, useRef, useState } from 'react';

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  originA?: Origin | null;
  originB?: Origin | null;
  middlePoint?: { lat: number; lng: number } | null;
  places?: Place[];
  className?: string;
  onMapClick?: (lat: number, lng: number) => void;
}

export default function KakaoMap({
  originA,
  originB,
  middlePoint,
  places,
  className,
  onMapClick,
}: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // SDK 로드 대기 및 지도 초기화
  useEffect(() => {
    const initMap = () => {
      if (!mapContainerRef.current || mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 8,
      };

      const map = new window.kakao.maps.Map(mapContainerRef.current, options);
      mapRef.current = map;
      setIsLoaded(true);

      if (onMapClick) {
        window.kakao.maps.event.addListener<{ latLng: kakao.maps.LatLng }>(
          map,
          'click',
          (mouseEvent) => {
            const lat = mouseEvent.latLng.getLat();
            const lng = mouseEvent.latLng.getLng();
            onMapClick(lat, lng);
          }
        );
      }
    };

    // SDK가 이미 로드되었는지 확인
    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    } else {
      // SDK 로드 대기
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          window.kakao.maps.load(initMap);
        }
      }, 100);

      return () => clearInterval(checkKakao);
    }
  }, [onMapClick]);

  // 마커 업데이트
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    const bounds = new window.kakao.maps.LatLngBounds();
    let hasMarkers = false;

    // 출발지 A 마커
    if (originA) {
      const position = new window.kakao.maps.LatLng(originA.lat, originA.lng);
      const marker = new window.kakao.maps.Marker({ position, map: mapRef.current });
      markersRef.current.push(marker);

      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: `<div style="padding:4px 10px;background:#03C75A;color:white;font-size:12px;font-weight:600;border-radius:4px;">A</div>`,
        yAnchor: 2.5,
        map: mapRef.current,
      });
      overlaysRef.current.push(overlay);

      bounds.extend(position);
      hasMarkers = true;
    }

    // 출발지 B 마커
    if (originB) {
      const position = new window.kakao.maps.LatLng(originB.lat, originB.lng);
      const marker = new window.kakao.maps.Marker({ position, map: mapRef.current });
      markersRef.current.push(marker);

      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: `<div style="padding:4px 10px;background:#FF5A5A;color:white;font-size:12px;font-weight:600;border-radius:4px;">B</div>`,
        yAnchor: 2.5,
        map: mapRef.current,
      });
      overlaysRef.current.push(overlay);

      bounds.extend(position);
      hasMarkers = true;
    }

    // 중간 지점 마커
    if (middlePoint) {
      const position = new window.kakao.maps.LatLng(middlePoint.lat, middlePoint.lng);
      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: `<div style="width:16px;height:16px;background:#FFB800;border:3px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        yAnchor: 0.5,
        map: mapRef.current,
      });
      overlaysRef.current.push(overlay);

      bounds.extend(position);
      hasMarkers = true;
    }

    // 주변 장소 마커
    if (places && places.length > 0) {
      places.forEach((place, index) => {
        const position = new window.kakao.maps.LatLng(place.lat, place.lng);
        const overlay = new window.kakao.maps.CustomOverlay({
          position,
          content: `<div style="width:24px;height:24px;background:#03C75A;color:white;font-size:11px;font-weight:600;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,0.2);">${index + 1}</div>`,
          yAnchor: 0.5,
          map: mapRef.current || undefined,
        });
        overlaysRef.current.push(overlay);
        bounds.extend(position);
      });
      hasMarkers = true;
    }

    if (hasMarkers && mapRef.current) {
      mapRef.current.setBounds(bounds, 60, 60, 60, 60);
    }
  }, [isLoaded, originA, originB, middlePoint, places]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full ${className || ''}`}
      style={{ minHeight: '300px' }}
    />
  );
}
